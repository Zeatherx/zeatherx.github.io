import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import skillsData from '../data/skills.json';
import heroTitlesData from '../data/hero_titles.json';

const PUBLIC_ASSET_BASE_URL = import.meta.env.BASE_URL;
const TECH_LOGOS = skillsData.items
  .filter((item) => item.icon)
  .map((tech) => ({ ...tech, icon: `${PUBLIC_ASSET_BASE_URL}${tech.icon.slice(1)}` }));
const SKILLS = skillsData.items.filter((item) => !item.icon).map((skill) => skill.name);
const TITLES = heroTitlesData.titles;

export default function Hero() {
  const [title, setTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetTitle = TITLES[titleIndex];
    const isTyped = title === targetTitle;
    const isErased = title.length === 0;
    const delay = isTyped ? 1800 : isDeleting && isErased ? 500 : isDeleting ? 55 : 100;

    const timer = setTimeout(() => {
      if (isTyped && !isDeleting) {
        setIsDeleting(true);
      } else if (isDeleting && isErased) {
        setIsDeleting(false);
        setTitleIndex((currentIndex) => (currentIndex + 1) % TITLES.length);
      } else {
        setTitle((currentTitle) =>
          isDeleting
            ? currentTitle.slice(0, -1)
            : targetTitle.slice(0, currentTitle.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isDeleting, title, titleIndex]);

  return (
    <section id="about" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between items-center text-center px-6 py-12 sm:px-12 sm:py-20 font-sans tracking-tight">
      
      {/* Center Hero Body */}
      <div className="max-w-3xl my-auto py-12 space-y-8 flex flex-col items-center">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
            Yohanes Harto Sampurno
          </h1>
          <p className="text-lg sm:text-xl text-sky-400 font-mono" aria-live="polite">
            {title}
            <span className="text-sky-300 animate-pulse" aria-hidden="true">|</span>
          </p>
        </div>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-light">
          Building fast web applications and exploring offensive security. Top 5 PolyU CTF achiever with a focus on modern frameworks, system administration, and network defense.
        </p>

        {/* Centered Minimal Action Links */}
        <div className="flex items-center justify-center pt-2 text-sm font-medium">
          <a
            href={`${PUBLIC_ASSET_BASE_URL}Resume/YohanesHS_Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-1.5 text-white hover:text-sky-400 transition-colors"
          >
            <span>View Resume</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
          </a>
        </div>
      </div>

      {/* Bottom: Centered Dual Marquee */}
      <div className="w-full max-w-4xl space-y-4 pt-8 border-t border-slate-800/60">
        
        {/* Row 1: Tech PNG Logos (Moving Right) */}
        <div className="carousel-fade overflow-hidden py-1">
          <div className="animate-scroll-right flex gap-10 items-center">
            {[...TECH_LOGOS, ...TECH_LOGOS].map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors whitespace-nowrap grayscale hover:grayscale-0"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-5 h-5 object-contain"
                />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Skills (Moving Left) */}
        <div className="carousel-fade overflow-hidden py-1">
          <div className="animate-scroll-left flex gap-8 items-center text-xs font-mono text-slate-500 justify-center">
            {[...SKILLS, ...SKILLS].map((skill, idx) => (
              <span key={idx} className="hover:text-slate-300 transition-colors whitespace-nowrap">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}