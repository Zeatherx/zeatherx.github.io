import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Folder, ExternalLink, GitBranch, X } from 'lucide-react';

const PUBLIC_ASSET_BASE_URL = import.meta.env.BASE_URL;

const CATEGORIES = ['All', 'Cybersecurity', 'Web Development', 'Homelab'];

const PROJECTS = [
  {
    title: 'NuttyShell Challenge Developments',
    description: 'Custom CTF challenge environments built with Docker setup scripts and vulnerable endpoint simulations.',
    category: ['Cybersecurity', 'CTF', 'Docker'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Full-Stack Web Application',
    description: 'Responsive web platform constructed with React, Node.js, and Tailwind CSS for modern user workflows.',
    category: ['Web Development', 'React', 'Node.js'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Home Lab Monitoring Dashboard',
    description: 'A lightweight dashboard for tracking services, system health, and network activity across a personal lab.',
    category: ['Homelab', 'Web Development', 'React'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Secure API Playground',
    description: 'A practice API environment for exploring authentication, input validation, and common web security issues.',
    category: ['Cybersecurity', 'Web Development', 'Node.js'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Linux Services Lab',
    description: 'Containerized Linux services used to practice deployment, hardening, logging, and incident investigation.',
    category: ['Homelab', 'Cybersecurity', 'Docker'],
    githubUrl: '#',
    liveUrl: '#',
  },
];

// Combined Certifications & Awards Data
const CREDENTIALS_AND_AWARDS = [
  {
    id: 'comptia-security-plus',
    type: 'Certification',
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'Jul 2026',
    verifyUrl: 'https://cp.certmetrics.com/CompTIA/en/public/verify/credential/78e37804ad724a109748fa24486c9b89',
    issuerLogo: '',
    details: 'CompTIA Security+ certification covering core cybersecurity skills, threats, vulnerabilities, security operations, and risk management.',
  },
  {
    id: 'polyu-ctf',
    type: 'Award',
    title: 'Outstanding Player (Top 5), PolyU CTF Qualifier Competition',
    issuer: 'The Hong Kong Polytechnic University',
    date: 'October 2025',
    awardImage: `${PUBLIC_ASSET_BASE_URL}Cert/Top5polyuctf.jpg`,
    details: 'Achieved Top 5 ranking in the official PolyU CTF qualifier competition focusing on web security, binary exploitation, and reverse engineering.',
  },
  {
    id: 'google-cyber',
    type: 'Certification',
    title: 'Google Cybersecurity',
    issuer: 'Credential ID VJ0LMGPJM76C',
    date: 'June 2025',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/VJ0LMGPJM76C',
    issuerLogo: '',
    details: 'Completed Google Cybersecurity Certificate covering core cybersecurity concepts, common threats, and practical risk-reduction approaches to help protect organizational systems and data.',
  },
  {
    id: 'dofe-silver',
    type: 'Award',
    title: 'Duke of Edinburgh International Silver Award',
    issuer: 'The Duke of Edinburgh\'s International Award',
    date: 'June 2024',
    awardImage: `${PUBLIC_ASSET_BASE_URL}Cert/doefiasilver.jpg`,
    details: 'Recognized for personal achievement in community service, physical recreation, skill development, and adventurous journeys.',
  },
  {
    id: 'dofe-bronze',
    type: 'Award',
    title: 'Duke of Edinburgh International Bronze Award',
    issuer: 'The Duke of Edinburgh\'s International Award',
    date: 'August 2023',
    awardImage: `${PUBLIC_ASSET_BASE_URL}Cert/doefiabronze.jpg`,
    details: 'Demonstrated commitment to self-development, outdoor exploration, and structured volunteer service.',
  },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItem, setExpandedItem] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedAward, setSelectedAward] = useState(null);
  const [awardImageStatus, setAwardImageStatus] = useState('loading');

  useEffect(() => {
    if (!selectedAward) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedAward(null);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedAward]);

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.includes(selectedCategory));

  const showPreviousProject = () => {
    setActiveProjectIndex((currentIndex) => (currentIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const showNextProject = () => {
    setActiveProjectIndex((currentIndex) => (currentIndex + 1) % filteredProjects.length);
  };

  return (
    <section id="projects" className="w-full bg-slate-950 text-slate-100 py-20 px-6 sm:px-12 flex flex-col items-center font-sans tracking-tight">
      <div className="max-w-4xl w-full space-y-16">
        
        {/* PROJECTS SECTION */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs font-mono text-sky-400 uppercase tracking-widest">02. WORK</p>
            <h2 className="text-3xl font-medium text-white">Featured Projects</h2>
          </div>

          {/* Genre Tag Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveProjectIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm shadow-sky-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="coverflow-shell">
            <button type="button" onClick={showPreviousProject} className="coverflow-arrow" aria-label="Show previous project">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="coverflow-viewport" aria-live="polite">
              <div className="coverflow-track">
                {filteredProjects.map((project, idx) => {
                  const offset = idx - activeProjectIndex;
                  const normalizedOffset = offset > filteredProjects.length / 2
                    ? offset - filteredProjects.length
                    : offset < -filteredProjects.length / 2
                      ? offset + filteredProjects.length
                      : offset;
                  const distance = Math.min(Math.abs(normalizedOffset), 3);

                  return (
                    <article
                      key={project.title}
                      className={`coverflow-card ${normalizedOffset === 0 ? 'is-active' : ''}`}
                      style={{ '--card-offset': normalizedOffset, '--card-distance': distance }}
                      onClick={() => setActiveProjectIndex(idx)}
                    >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-slate-400">
                    <Folder className="w-5 h-5 text-sky-400" />
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="hover:text-white transition-colors" aria-label="GitHub Link">
                          <GitBranch className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="hover:text-white transition-colors" aria-label="Live Demo Link">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2 pt-6">
                  {project.category.map((tag, tagIdx) => (
                    <span key={tagIdx} className="text-[11px] font-mono text-sky-400/90 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <button type="button" onClick={showNextProject} className="coverflow-arrow" aria-label="Show next project">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="coverflow-caption">
            <span>{String(activeProjectIndex + 1).padStart(2, '0')}</span>
            <span className="coverflow-caption-line" />
            <span>{String(filteredProjects.length).padStart(2, '0')}</span>
            <span className="sr-only">{filteredProjects[activeProjectIndex]?.title}</span>
          </p>
        </div>

        {/* COMBINED CERTIFICATIONS & AWARDS SECTION */}
        <div className="space-y-8 pt-8 border-t border-slate-800/60">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-semibold text-white tracking-wider uppercase">Certifications & Awards</h2>
          </div>

          {/* Four-item viewport with overflow for additional credentials */}
          <div className="credential-scroll max-h-[28rem] overflow-y-auto overscroll-contain pr-3 divide-y divide-slate-800/60 max-w-2xl mx-auto">
            {CREDENTIALS_AND_AWARDS.map((item) => (
              <div key={item.id} className="py-5 space-y-2">
                <div
                  onClick={() => toggleItem(item.id)}
                  className="flex items-start justify-between cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base text-slate-200 group-hover:text-sky-400 transition-colors font-sans">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                      {item.issuerLogo && (
                        <img
                          src={item.issuerLogo}
                          alt={`${item.issuer} logo`}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span>{item.issuer}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>

                    {(item.verifyUrl || item.awardImage) && (
                      item.awardImage ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedAward(item);
                            setAwardImageStatus('loading');
                          }}
                          className="inline-block text-xs font-sans italic text-slate-400 hover:text-sky-400 underline pt-1"
                        >
                          View award
                        </button>
                      ) : (
                        <a
                          href={item.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-block text-xs font-sans italic text-slate-400 hover:text-sky-400 underline pt-1"
                        >
                          View credentials
                        </a>
                      )
                    )}
                  </div>

                  <button className="text-slate-400 hover:text-white p-1">
                    {expandedItem === item.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Accordion Details */}
                {expandedItem === item.id && (
                  <p className="text-xs text-slate-400 pt-2 font-mono leading-relaxed">
                    {item.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {selectedAward && createPortal(
        <div
          className="award-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="award-modal-title"
          onClick={() => setSelectedAward(null)}
        >
          <div className="award-modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-sky-400">Award</p>
                <h2 id="award-modal-title" className="mt-1 text-lg font-medium text-white">
                  {selectedAward.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAward(null)}
                className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Close award image"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="award-image-frame" aria-live="polite">
              {awardImageStatus === 'loading' && (
                <p className="text-center text-sm text-slate-400">Loading award image...</p>
              )}
              {awardImageStatus === 'error' ? (
                <p className="text-center text-sm text-red-400">
                  Unable to load this award image.
                </p>
              ) : (
                <img
                  src={selectedAward.awardImage}
                  alt={`${selectedAward.title} award certificate`}
                  onLoad={() => setAwardImageStatus('loaded')}
                  onError={() => setAwardImageStatus('error')}
                  className={`max-h-[70vh] w-full rounded-lg object-contain ${awardImageStatus === 'loading' ? 'opacity-0' : 'opacity-100'}`}
                />
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}