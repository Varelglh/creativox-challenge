// components/portfolio/AboutSection.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PokemonCharacter } from '@/data/pokemon';
import { TrainerMaster } from '@/data/trainers';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  activePokemon: PokemonCharacter;
  activeTrainer?: TrainerMaster;
}

const HOBBY_PHOTOS = [
  {
    src: '/image/my%20hobby/foto-1.jpg',
    title: 'Outdoor & Traveling',
    desc: 'Menjelajahi alam terbuka dan menyegarkan pikiran untuk memicu ide-ide segar.',
    fitClass: 'object-cover object-top',
  },
  {
    src: '/image/my%20hobby/foto-2.png',
    title: 'Urban Fashion & Streetwear',
    desc: 'Mengekspresikan kreativitas visual melalui gaya busana modern dan estetika.',
    fitClass: 'object-contain p-2',
  },
  {
    src: '/image/my%20hobby/foto-3.png',
    title: 'Casual Culture & Community',
    desc: 'Menikmati interaksi santai, musik, dan obrolan inspiratif bersama kawan.',
    fitClass: 'object-contain p-1.5',
  },
];

export default function AboutSection({ activePokemon, activeTrainer }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // 0: About Me, 1: My Hobby
  const [mainSlide, setMainSlide] = useState<0 | 1>(0);

  // Sub-slide untuk kartu foto About Me (0: Real Profile, 1: Maestro Persona)
  const [profileSlide, setProfileSlide] = useState(0);

  // Sub-slide untuk galeri foto My Hobby (0, 1, 2)
  const [hobbySlide, setHobbySlide] = useState(0);

  // Auto-play untuk sub-slide Profile di About Me
  useEffect(() => {
    if (mainSlide === 0) {
      const timer = setInterval(() => {
        setProfileSlide((prev) => (prev === 0 ? 1 : 0));
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [mainSlide]);

  // Auto-play untuk sub-slide Foto Hobby
  useEffect(() => {
    if (mainSlide === 1) {
      const timer = setInterval(() => {
        setHobbySlide((prev) => (prev + 1) % HOBBY_PHOTOS.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [mainSlide]);

  // GSAP Entrance untuk Section Card
  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Fungsi ganti main slide dengan animasi GSAP
  const switchMainSlide = (targetSlide: 0 | 1) => {
    if (targetSlide === mainSlide) return;

    if (slideContainerRef.current) {
      gsap.to(slideContainerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setMainSlide(targetSlide);
          gsap.fromTo(
            slideContainerRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
        },
      });
    } else {
      setMainSlide(targetSlide);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-5xl space-y-8">
        <div
          ref={cardRef}
          className="relative rounded-3xl p-6 md:p-10 bg-zinc-950/85 border border-white/10 shadow-2xl overflow-hidden transition-all duration-500"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${activePokemon.theme.primary}15`,
          }}
        >
          {/* Ambient Glow Top Line */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(to right, transparent, ${activePokemon.theme.primary}, transparent)`,
            }}
          />

          {/* Top Control Bar: Tabs & Carousel Navigasi */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 mb-8">
            {/* Carousel Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                onClick={() => switchMainSlide(0)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  mainSlide === 0
                    ? 'text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  backgroundColor: mainSlide === 0 ? activePokemon.theme.primary : 'transparent',
                }}
              >
                <span>✦</span>
                <span>About Me</span>
              </button>

              <button
                onClick={() => switchMainSlide(1)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  mainSlide === 1
                    ? 'text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  backgroundColor: mainSlide === 1 ? activePokemon.theme.primary : 'transparent',
                }}
              >
                <span>✦</span>
                <span>My Hobby</span>
              </button>
            </div>

            {/* Quick Next / Prev Arrows & Counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">
                Slide: 0{mainSlide + 1} / 02
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => switchMainSlide(mainSlide === 0 ? 1 : 0)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Previous Slide"
                >
                  ←
                </button>
                <button
                  onClick={() => switchMainSlide(mainSlide === 1 ? 0 : 1)}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Next Slide"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Slide Body Container */}
          <div ref={slideContainerRef}>
            {mainSlide === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Visual Box Kiri: 2-Slide Profile Carousel */}
                <div className="md:col-span-5 flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl bg-black/60 border border-white/10 min-h-[420px] text-center relative overflow-hidden group shadow-inner">
                  <div className="absolute top-3 right-3 z-20">
                    <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10 backdrop-blur-sm">
                      {profileSlide === 0 ? 'REAL PROFILE ✦' : 'MAESTRO PERSONA ✦'}
                    </span>
                  </div>

                  {/* Kontainer Sub-Slide */}
                  <div className="flex-1 w-full flex flex-col items-center justify-center transition-all duration-500 my-auto">
                    {profileSlide === 0 ? (
                      <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                        <div
                          className="relative w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-2xl overflow-hidden mb-3.5 border-2 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                          style={{
                            borderColor: activePokemon.theme.primary,
                            boxShadow: `0 0 30px ${activePokemon.theme.primary}55`,
                          }}
                        >
                          <Image
                            src="/image/About-me.jpeg"
                            alt="Varel Galih Partiyano"
                            fill
                            sizes="(max-width: 768px) 192px, 208px"
                            className="object-cover object-top"
                            priority
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          Varel Galih Partiyano
                        </h3>
                        <span className="text-xs font-mono text-zinc-400 mt-0.5">
                          Mobile & Web Developer, Front-End & UI/UX
                        </span>
                        <span
                          className="mt-2.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                          style={{
                            borderColor: activePokemon.theme.primary,
                            color: activePokemon.theme.primary,
                            backgroundColor: `${activePokemon.theme.primary}12`,
                          }}
                        >
                          Fresh Graduate
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                        <div
                          className="relative w-44 h-44 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-2xl overflow-hidden mb-3.5 border-2 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-105"
                          style={{
                            borderColor: activeTrainer?.themeColor || activePokemon.theme.primary,
                            backgroundColor: `${activeTrainer?.themeColor || activePokemon.theme.primary}15`,
                            boxShadow: `0 0 30px ${activeTrainer?.themeColor || activePokemon.theme.primary}55`,
                          }}
                        >
                          {activeTrainer ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={activeTrainer.avatarUrl}
                              alt={activeTrainer.name}
                              className="w-36 h-36 md:w-40 md:h-40 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
                            />
                          ) : (
                            <span className="text-4xl font-black text-white">VG</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          Varel Galih Partiyano
                        </h3>
                        <span className="text-xs font-mono text-zinc-400 mt-0.5">
                          Persona: {activeTrainer?.name || 'Champion'} ({activeTrainer?.title})
                        </span>
                        <span
                          className="mt-2.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                          style={{
                            borderColor: activeTrainer?.themeColor || activePokemon.theme.primary,
                            color: activeTrainer?.themeColor || activePokemon.theme.primary,
                            backgroundColor: `${activeTrainer?.themeColor || activePokemon.theme.primary}12`,
                          }}
                        >
                          Maestro Champion
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 2 Dots Indicator */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => setProfileSlide(0)}
                      className="h-1.5 rounded-full transition-all cursor-pointer"
                      style={{
                        width: profileSlide === 0 ? '28px' : '8px',
                        backgroundColor:
                          profileSlide === 0 ? activePokemon.theme.primary : 'rgba(255,255,255,0.2)',
                      }}
                      aria-label="Slide 1: Foto Varel"
                    />
                    <button
                      onClick={() => setProfileSlide(1)}
                      className="h-1.5 rounded-full transition-all cursor-pointer"
                      style={{
                        width: profileSlide === 1 ? '28px' : '8px',
                        backgroundColor:
                          profileSlide === 1
                            ? activeTrainer?.themeColor || activePokemon.theme.primary
                            : 'rgba(255,255,255,0.2)',
                      }}
                      aria-label="Slide 2: Karakter Trainer"
                    />
                  </div>
                </div>

                {/* Konten Kanan: Deskripsi About Me */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <div className="space-y-1">
                    <span
                      className="text-xs uppercase font-mono tracking-widest font-bold"
                      style={{ color: activePokemon.theme.primary }}
                    >
                      Trainer Profile & Manifesto
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      About Me
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                    Halo! Nama saya Varel. Saya merupakan lulusan program Sistem Informasi (Diploma 3) dari Telkom University dengan IPK 3,6/4,00. Saya memiliki minat yang kuat di berbagai bidang teknologi (TI), seperti pengembangan perangkat lunak khususnya aplikasi seluler serta desain produk digital, termasuk desain situs web (UI/UX), poster digital, mockup , dan lain sebagainya. Terinspirasi dari keteguhan sang Maestro{' '}
                    <strong style={{ color: activeTrainer?.themeColor || '#fff' }}>
                      {activeTrainer?.name}
                    </strong>
                    , Saya memiliki semangat tinggi untuk terus belajar, mudah beradaptasi, mampu bekerja sama dalam tim dengan baik, dan siap untuk memberikan kontribusi yang efektif bagi tim.
                  </p>

                  {activeTrainer && (
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs italic text-zinc-300 leading-relaxed">
                      &ldquo;{activeTrainer.quote}&rdquo; —{' '}
                      <span className="text-white font-bold">{activeTrainer.name}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Based in Indonesia</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: activePokemon.theme.primary }}
                      />
                      <span>Ready for Creativox Challenge</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Visual Box Kiri: 3-Photo Hobby Gallery Carousel */}
                <div className="md:col-span-5 flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl bg-black/60 border border-white/10 min-h-[420px] text-center relative overflow-hidden group shadow-inner">
                  <div className="absolute top-3 right-3 z-20">
                    <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10 backdrop-blur-sm">
                      LIFESTYLE & PASSION ✦
                    </span>
                  </div>

                  {/* Kontainer Foto Hobi */}
                  <div className="flex-1 w-full flex flex-col items-center justify-center my-auto transition-all duration-500">
                    <div
                      className="relative w-44 h-48 sm:w-48 sm:h-52 md:w-52 md:h-56 rounded-2xl overflow-hidden mb-3.5 border-2 shadow-2xl transition-transform duration-300 group-hover:scale-105 bg-black/70 flex items-center justify-center"
                      style={{
                        borderColor: activePokemon.theme.primary,
                        boxShadow: `0 0 30px ${activePokemon.theme.primary}55`,
                      }}
                    >
                      <Image
                        src={HOBBY_PHOTOS[hobbySlide].src}
                        alt={HOBBY_PHOTOS[hobbySlide].title}
                        fill
                        sizes="(max-width: 768px) 192px, 208px"
                        className={`transition-all duration-500 ${HOBBY_PHOTOS[hobbySlide].fitClass}`}
                        priority
                      />

                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/70 to-transparent">
                        <span className="text-[10px] font-mono text-zinc-200">
                          {hobbySlide + 1} / {HOBBY_PHOTOS.length}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {HOBBY_PHOTOS[hobbySlide].title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-[240px] leading-relaxed line-clamp-2">
                      {HOBBY_PHOTOS[hobbySlide].desc}
                    </p>

                    <span
                      className="mt-2.5 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                      style={{
                        borderColor: activePokemon.theme.primary,
                        color: activePokemon.theme.primary,
                        backgroundColor: `${activePokemon.theme.primary}12`,
                      }}
                    >
                      Active Pursuits
                    </span>
                  </div>

                  {/* 3 Dots Indicator untuk Hobi */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    {HOBBY_PHOTOS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHobbySlide(idx)}
                        className="h-1.5 rounded-full transition-all cursor-pointer"
                        style={{
                          width: hobbySlide === idx ? '24px' : '8px',
                          backgroundColor:
                            hobbySlide === idx
                              ? activePokemon.theme.primary
                              : 'rgba(255,255,255,0.2)',
                        }}
                        aria-label={`Lihat Foto Hobi ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Konten Kanan: Deskripsi My Hobby */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <div className="space-y-1">
                    <span
                      className="text-xs uppercase font-mono tracking-widest font-bold"
                      style={{ color: activePokemon.theme.primary }}
                    >
                      Personal Passion & Exploration
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      My Hobby & Life Balance
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                    Di luar dunia coding dan desain, saya juga suka menghabiskan waktu dengan aktivitas outdoor dan traveling untuk melepas penat sekaligus mencari inspirasi baru dari lingkungan sekitar. Saya tertarik dengan streetwear dan fashion, senang mengeksplorasi berbagai genre musik, serta bertukar pikiran tentang perkembangan teknologi dan kreativitas bersama teman-teman. Bagi saya, mencoba hal baru dan menjaga keseimbangan antara hobi dan pekerjaan menjadi salah satu cara untuk tetap produktif, kreatif, dan terus berkembang di bidang front-end development.
                  </p>

                  {/* Hobby Tag Pills */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                      Aktivitas & Minat Favorit:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        '🌲 Outdoor & Traveling',
                        '🎨 Urban Fashion & Streetwear',
                        '🎵 Music & Audio Mood',
                        '💡 Creative Coding & UI Trends',
                        '☕ Community Hangouts',
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Reflektif Quote */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs italic text-zinc-300 leading-relaxed">
                    &ldquo;Balancing logic and creative passion unlocks the most imaginative digital experiences.&rdquo; —{' '}
                    <span className="text-white font-bold">Varel Galih Partiyano</span>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Work-Life Harmony</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: activePokemon.theme.primary }}
                      />
                      <span>Always Curious & Exploring</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Dots Navigasi Utama */}
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              onClick={() => switchMainSlide(0)}
              className="h-2 rounded-full transition-all cursor-pointer"
              style={{
                width: mainSlide === 0 ? '36px' : '10px',
                backgroundColor:
                  mainSlide === 0 ? activePokemon.theme.primary : 'rgba(255,255,255,0.2)',
              }}
              aria-label="Ke Slide About Me"
            />
            <button
              onClick={() => switchMainSlide(1)}
              className="h-2 rounded-full transition-all cursor-pointer"
              style={{
                width: mainSlide === 1 ? '36px' : '10px',
                backgroundColor:
                  mainSlide === 1 ? activePokemon.theme.primary : 'rgba(255,255,255,0.2)',
              }}
              aria-label="Ke Slide My Hobby"
            />
          </div>
        </div>
      </div>
    </section>
  );
}