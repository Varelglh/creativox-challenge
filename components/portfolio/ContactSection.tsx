// components/portfolio/ContactSection.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PokemonCharacter } from '@/data/pokemon';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  activePokemon: PokemonCharacter;
}

export default function ContactSection({ activePokemon }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const email = 'varel.gp@gmail.com';

  const contactSlides = [
    {
      type: 'photo',
      src: '/image/contact/contact-1.jpeg',
      alt: 'Varel Galih Partiyano - Contact 1',
    },
    {
      type: 'photo',
      src: '/image/contact/contact-2.jpg',
      alt: 'Varel Galih Partiyano - Contact 2',
    },
    {
      type: 'photo',
      src: '/image/contact/contact-3.jpeg',
      alt: 'Varel Galih Partiyano - Contact 3',
    },
    {
      type: 'pokemon',
      src: activePokemon.spriteUrl,
      alt: activePokemon.name,
    },
  ];

  // Auto-play Carousel (Berganti slide setiap 3.5 detik)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contactSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [contactSlides.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-14 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-4xl space-y-8">
        {/* Main Contact Card (Compact & Balanced) */}
        <div
          ref={cardRef}
          className="relative rounded-3xl p-6 md:p-8 bg-zinc-950/85 border border-white/10 shadow-2xl overflow-hidden transition-all duration-500"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 35px ${activePokemon.theme.primary}15`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Info Kiri */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="space-y-1.5">
                <span
                  className="text-[11px] uppercase font-mono tracking-widest font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 inline-block"
                  style={{ color: activePokemon.theme.primary }}
                >
                  Final Encounter
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Let&apos;s Connect & Build Together!
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Terima kasih sudah menjelajahi portofolio ini. Saya siap berkontribusi penuh dengan keahlian
                yang dimiliki untuk berkembang di industri. Mari diskusikan peluang kolaborasi!
              </p>

              {/* Contact Information List */}
              <div className="space-y-2 pt-1 text-xs font-mono">
                {/* 1. Email */}
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <span className="w-20 text-[10px] text-zinc-500 uppercase">EMAIL :</span>
                  <span className="text-white select-all">{email}</span>
                </div>

                {/* 2. LinkedIn */}
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <div className="w-6 h-6 rounded-md bg-[#0A66C2]/15 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <span className="w-20 text-[10px] text-zinc-500 uppercase">LINKEDIN :</span>
                  <a
                    href="https://linkedin.com/in/varel-prty"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:underline transition-all truncate"
                  >
                    linkedin.com/in/varel-prty ↗
                  </a>
                </div>

                {/* 3. GitHub */}
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </div>
                  <span className="w-20 text-[10px] text-zinc-500 uppercase">GITHUB :</span>
                  <a
                    href="https://github.com/Varelglh"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:underline transition-all"
                  >
                    github.com/Varelglh ↗
                  </a>
                </div>

                {/* 4. Instagram */}
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <div className="w-6 h-6 rounded-md bg-[#E4405F]/15 border border-[#E4405F]/30 flex items-center justify-center text-[#E4405F] flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  </div>
                  <span className="w-20 text-[10px] text-zinc-500 uppercase">INSTAGRAM :</span>
                  <a
                    href="https://instagram.com/Vrellglhh"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:underline transition-all"
                  >
                    instagram.com/vrellglhh ↗
                  </a>
                </div>

                {/* 5. TikTok */}
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </div>
                  <span className="w-20 text-[10px] text-zinc-500 uppercase">TIKTOK :</span>
                  <a
                    href="https://tiktok.com/@vrellglhh"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:underline transition-all"
                  >
                    tiktok.com/@vrellglhh ↗
                  </a>
                </div>

                {/* 6. Location */}
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="w-20 text-[10px] text-zinc-500 uppercase">LOCATION :</span>
                  <span className="text-white">Indonesia (GMT+7)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: activePokemon.theme.primary,
                    color: '#000',
                    boxShadow: `0 0 20px ${activePokemon.theme.primary}55`,
                  }}
                >
                  <span>{copied ? '✓ Copied!' : 'Copy Email Address'}</span>
                </button>

                <a
                  href={`mailto:${email}`}
                  className="px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 hover:border-white/40 flex items-center gap-2"
                >
                  Send Email ✉
                </a>
              </div>
            </div>

            {/* Visual Kanan: Carousel Otomatis (Contact 1-3 & Pokemon Sprite) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3">
              <div
                className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-3 bg-black/50 border border-white/15 flex items-center justify-center overflow-hidden shadow-2xl group transition-all duration-500"
                style={{
                  boxShadow: `0 0 35px ${activePokemon.theme.primary}25`,
                }}
              >
                {/* Dynamic Background Glow */}
                <div
                  className="absolute inset-0 opacity-20 blur-xl transition-all duration-500"
                  style={{ backgroundColor: activePokemon.theme.primary }}
                />

                {/* Slides Layer Container */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                  {contactSlides.map((slide, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
                        currentSlide === idx
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      {slide.type === 'photo' ? (
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          sizes="(max-width: 768px) 192px, 224px"
                          className="object-cover rounded-2xl"
                        />
                      ) : (
                        <div className="relative w-36 h-36 sm:w-44 sm:h-44 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            sizes="(max-width: 768px) 144px, 176px"
                            className="object-contain drop-shadow-[0_12px_12px_rgba(0,0,0,0.8)]"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Status Badge Overlay */}
                <div
                  className="absolute bottom-2.5 px-3 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase border backdrop-blur-md z-10"
                  style={{
                    borderColor: activePokemon.theme.primary,
                    color: activePokemon.theme.primary,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                  }}
                >
                  Status: Available for Hire
                </div>
              </div>

              {/* Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {contactSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: currentSlide === idx ? '20px' : '6px',
                      backgroundColor:
                        currentSlide === idx ? activePokemon.theme.primary : 'rgba(255,255,255,0.2)',
                    }}
                    aria-label={`Lihat Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <footer className="text-center text-xs font-mono text-zinc-500 space-y-1">
          <p>© 2026 Varel Galih Partiyano. Crafted for Creativox Internship Challenge Season II.</p>
          <p className="text-[10px] text-zinc-600">Built with Next.js 16, Three.js, GSAP & PokeAPI.</p>
        </footer>
      </div>
    </section>
  );
}