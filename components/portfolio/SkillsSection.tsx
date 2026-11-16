// components/portfolio/SkillsSection.tsx
'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PokemonCharacter } from '@/data/pokemon';

gsap.registerPlugin(ScrollTrigger);

interface SkillsSectionProps {
  activePokemon: PokemonCharacter;
}

interface SkillCategory {
  title: string;
  icons: { name: string; url: string }[];
  subtext: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'MOBILE DEVELOPMENT',
    icons: [
      { name: 'Flutter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
      { name: 'Dart', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg' },
      { name: 'Android', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
      { name: 'Kotlin', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
    ],
    subtext: 'Flutter · Dart · Android · REST API · JSON · FastAPI · Kotlin',
  },
  {
    title: 'WEB DEVELOPMENT',
    icons: [
      { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Three.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg' },
      { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    ],
    subtext: 'Next.js · React.js · Tailwind CSS · TypeScript · JavaScript · Three.js · Node.js · Express.js · HTML/CSS · WebGL · Python',
  },
  {
    title: 'DATABASE',
    icons: [
      { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
    ],
    subtext: 'MySQL · PostgreSQL · MongoDB · Firebase · Supabase',
  },
  {
    title: 'SOFTWARE TOOLS',
    icons: [
      { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Postman', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      { name: 'VS Code', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
      { name: 'Swagger', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg' },
    ],
    subtext: 'Git & GitHub · REST API · Postman · Android Studio · VS Code · Swagger · Railway · Draw.io',
  },
  {
    title: 'UI/UX & GRAPHIC',
    icons: [
      { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
      { name: 'Photoshop', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg' },
      { name: 'Canva', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
    ],
    subtext: 'Figma · Adobe Photoshop · Canva · Wireframing · Prototyping',
  },
  {
    title: 'DOCUMENTATION',
    icons: [
      { name: 'Trello', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain.svg' },
    ],
    subtext: 'Microsoft Office (Word, Excel, PPT) · Trello · Computer Architecture & Networking',
  },
];

export default function SkillsSection({ activePokemon }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.skill-category-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-6xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span
              className="text-xs uppercase font-mono tracking-widest font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
              style={{ color: activePokemon.theme.primary }}
            >
              Battle Arsenal
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Skill Arsenal & Tech Stack
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400">
            6 Specialized Battle Domains
          </p>
        </div>

        {/* 6 Kategori Card Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="skill-category-card group flex flex-col justify-between p-6 rounded-2xl bg-zinc-950/85 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = activePokemon.theme.primary;
                e.currentTarget.style.boxShadow = `0 12px 30px ${activePokemon.theme.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                {/* Judul Kategori */}
                <div className="border-b border-white/10 pb-3 mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-white font-mono uppercase">
                    {category.title}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: activePokemon.theme.primary }}
                  />
                </div>

                {/* Baris Ikon Tech Berwarna */}
                <div className="flex items-center gap-3 flex-wrap mb-4">
                  {category.icons.map((icon) => (
                    <div
                      key={icon.name}
                      title={icon.name}
                      className="w-8 h-8 p-1 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 hover:!scale-125"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.url}
                        alt={icon.name}
                        className={`w-6 h-6 object-contain ${
                          ['GitHub', 'Three.js', 'Next.js'].includes(icon.name)
                            ? 'invert brightness-200'
                            : ''
                        }`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtext Daftar Teknologi */}
              <p className="text-[11px] font-mono text-zinc-400 leading-relaxed pt-3 border-t border-white/5">
                {category.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}