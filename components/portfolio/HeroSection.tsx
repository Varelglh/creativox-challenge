// components/portfolio/HeroSection.tsx
'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PokemonCharacter } from '@/data/pokemon';
import { TrainerMaster } from '@/data/trainers';
import Pokemon3DCanvas from './Pokemon3DCanvas';

interface HeroSectionProps {
  activePokemon: PokemonCharacter;
  activeTrainer: TrainerMaster;
  onNavigate: (sectionId: string) => void;
}

export default function HeroSection({
  activePokemon,
  activeTrainer,
  onNavigate,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(textContentRef);

      gsap.fromTo(
        q('.gsap-fade-up'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef, dependencies: [activePokemon.id, activeTrainer.id] }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center py-12 px-6 md:px-12"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Kolom Kiri: Teks Profil Varel & Status Maestro */}
        <div ref={textContentRef} className="lg:col-span-7 space-y-6 text-left">
          {/* Maestro Stance Badge */}
          <div className="gsap-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-sm">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeTrainer.themeColor }}
            />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Maestro Champion: <strong style={{ color: activeTrainer.themeColor }}>{activeTrainer.name}</strong> • {activeTrainer.title}
            </span>
          </div>

          {/* Heading Nama Varel */}
          <div className="space-y-2">
            <h1 className="gsap-fade-up text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
              I am <br />
              <span
                className="text-transparent bg-clip-text transition-colors duration-500"
                style={{
                  backgroundImage: `linear-gradient(to right, #ffffff, ${activePokemon.theme.primary})`,
                }}
              >
                Varel Galih Partiyano
              </span>
            </h1>
            <p className="gsap-fade-up text-base sm:text-xl font-medium text-zinc-300 pt-2">
              Mobile & Web Developer <span className="text-zinc-600">|</span> Front-End Developer <span className="text-zinc-600">|</span> UI/UX Designer
            </p>
          </div>

          <p className="gsap-fade-up text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Mengembangkan aplikasi web yang imersif, interaktif, dan berperforma tinggi dengan memanfaatkan teknologi modern seperti Next.js, animasi 3D menggunakan Three.js, serta interaksi dinamis berbasis GSAP, dengan inspirasi visual dan pengalaman interaktif dari dunia Pokémon Masters.
          </p>

          {/* Tombol CTA */}
          <div className="gsap-fade-up flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onNavigate('showreel')}
              className="group px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: activePokemon.theme.primary,
                color: '#000',
                boxShadow: `0 0 20px ${activePokemon.theme.primary}55`,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-black group-hover:scale-125 transition-transform" />
              See Showreel
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 hover:border-white/40 flex items-center gap-2 cursor-pointer"
            >
              View Project ↗
            </button>
          </div>
        </div>

        {/* Kolom Kanan: 3D Duo Arena */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <Pokemon3DCanvas activePokemon={activePokemon} activeTrainer={activeTrainer} />
        </div>
      </div>
    </section>
  );
}