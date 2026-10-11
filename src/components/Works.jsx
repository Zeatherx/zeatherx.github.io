import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Folder, ExternalLink, GitBranch, X } from 'lucide-react';
import projectsData from '../data/projects.json';
import credentialsData from '../data/credentials.json';
import categoriesData from '../data/categories.json';

const CATEGORIES = categoriesData.categories;
const PROJECTS = projectsData.items;
const CREDENTIALS_AND_AWARDS = credentialsData.items;
const PUBLIC_ASSET_BASE_URL = import.meta.env.BASE_URL;
const hasProjectUrl = (url) => typeof url === 'string' && url.trim() !== '' && url.trim() !== '#';
const getPublicAssetUrl = (path) => {
  if (!path) return '';
  if (/^(https?:|data:)/.test(path)) return path;
  if (path.startsWith('/')) return `${PUBLIC_ASSET_BASE_URL}${path.slice(1)}`;
  return path;
};
const getCredentialImageLabel = (credential) => (
  credential.type === 'Certification' ? 'View certificate' : 'View award'
);
const getCredentialImageAlt = (credential) => (
  credential.type === 'Certification'
    ? `${credential.title} certificate`
    : `${credential.title} award certificate`
);

function CredentialLogo({ src, issuer }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) return null;

  return (
    <img
      src={getPublicAssetUrl(src)}
      alt={`${issuer} logo`}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className="w-5 h-5 object-contain"
    />
  );
}

export default function Works() {
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
  const hasProjects = filteredProjects.length > 0;
  const activeProject = filteredProjects[activeProjectIndex];

  const showPreviousProject = () => {
    if (!hasProjects) return;
    setActiveProjectIndex((currentIndex) => (currentIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const showNextProject = () => {
    if (!hasProjects) return;
    setActiveProjectIndex((currentIndex) => (currentIndex + 1) % filteredProjects.length);
  };

  const selectProjectFromKeyboard = (event, index) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setActiveProjectIndex(index);
  };

  return (
    <section id="projects" className="w-full bg-slate-950 text-slate-100 py-20 px-6 sm:px-12 flex flex-col items-center font-sans tracking-tight">
      <div className="max-w-4xl w-full space-y-16">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs font-mono text-sky-400 uppercase tracking-widest">02. WORK</p>
            <h2 className="text-3xl font-medium text-white">Featured Projects</h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveProjectIndex(0);
                }}
                aria-pressed={selectedCategory === cat}
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
            <button type="button" onClick={showPreviousProject} disabled={!hasProjects} className="coverflow-arrow" aria-label="Show previous project">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="coverflow-viewport" aria-live="polite">
              <div className="coverflow-track">
                {hasProjects ? filteredProjects.map((project, idx) => {
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
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${project.title}`}
                      className={`coverflow-card group ${normalizedOffset === 0 ? 'is-active' : ''}`}
                      style={{ '--card-offset': normalizedOffset, '--card-distance': distance }}
                      onClick={() => setActiveProjectIndex(idx)}
                      onKeyDown={(event) => selectProjectFromKeyboard(event, idx)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-slate-400">
                          <Folder className="w-5 h-5 text-sky-400" />
                          <div className="flex items-center gap-3">
                            {hasProjectUrl(project.githubUrl) && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label={`${project.title} GitHub repository`}
                              >
                                <GitBranch className="w-4 h-4" />
                              </a>
                            )}
                            {hasProjectUrl(project.liveUrl) && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label={`${project.title} live demo`}
                              >
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

                      <div className="flex flex-wrap gap-2 pt-6">
                        {project.category.map((tag) => (
                          <span key={tag} className="text-[11px] font-mono text-sky-400/90 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                }) : (
                  <p className="grid min-h-80 place-items-center text-sm text-slate-400">
                    No projects found for this category.
                  </p>
                )}
              </div>
            </div>

            <button type="button" onClick={showNextProject} disabled={!hasProjects} className="coverflow-arrow" aria-label="Show next project">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="coverflow-caption">
            <span>{String(hasProjects ? activeProjectIndex + 1 : 0).padStart(2, '0')}</span>
            <span className="coverflow-caption-line" />
            <span>{String(filteredProjects.length).padStart(2, '0')}</span>
            <span className="sr-only">{activeProject?.title}</span>
          </p>
        </div>

        <div className="space-y-8 pt-8 border-t border-slate-800/60">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-semibold text-white tracking-wider uppercase">Certifications & Awards</h2>
          </div>

          <div className="credential-scroll max-h-[28rem] overflow-y-auto overscroll-contain pr-3 divide-y divide-slate-800/60 max-w-2xl mx-auto">
            {CREDENTIALS_AND_AWARDS.map((item) => (
              <div key={item.id} className="py-5 space-y-2">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={expandedItem === item.id}
                  className="group flex w-full cursor-pointer items-start justify-between gap-4 text-left"
                >
                  <span className="block space-y-1">
                    <span className="flex items-center gap-2">
                      <span className="text-base text-slate-200 group-hover:text-sky-400 transition-colors font-sans">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                        {item.type}
                      </span>
                    </span>

                    <span className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                      <CredentialLogo src={item.issuerLogo} issuer={item.issuer} />
                      <span>{item.issuer}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </span>
                  </span>

                  <span className="p-1 text-slate-400 group-hover:text-white" aria-hidden="true">
                    {expandedItem === item.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {(item.verifyUrl || item.awardImage) && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                    {item.awardImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAward(item);
                          setAwardImageStatus('loading');
                        }}
                        className="inline-block text-xs font-sans italic text-slate-400 hover:text-sky-400 underline"
                      >
                        {getCredentialImageLabel(item)}
                      </button>
                    )}
                    {item.verifyUrl && (
                      <a
                        href={item.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-sans italic text-slate-400 hover:text-sky-400 underline"
                      >
                        Verify credential
                      </a>
                    )}
                  </div>
                )}

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
                <p className="text-xs font-mono uppercase tracking-widest text-sky-400">{selectedAward.type}</p>
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
                  Unable to load this image.
                </p>
              ) : (
                <img
                  src={getPublicAssetUrl(selectedAward.awardImage)}
                  alt={getCredentialImageAlt(selectedAward)}
                  loading="lazy"
                  decoding="async"
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
