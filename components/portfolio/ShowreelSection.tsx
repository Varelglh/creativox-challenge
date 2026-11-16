// components/portfolio/ShowreelSection.tsx
'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PokemonCharacter } from '@/data/pokemon';

gsap.registerPlugin(ScrollTrigger);

interface ShowreelSectionProps {
  activePokemon: PokemonCharacter;
}

export default function ShowreelSection({ activePokemon }: ShowreelSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pdfUrl = '/showrell/portfolio-varel.pdf';

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
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

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative py-16 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-5xl">
        <div
          ref={cardRef}
          className="relative rounded-3xl p-6 md:p-8 bg-zinc-950/85 border border-white/10 shadow-2xl overflow-hidden transition-all duration-500"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 35px ${activePokemon.theme.primary}15`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Informasi Kiri */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span
                className="text-xs uppercase font-mono tracking-widest font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 inline-block"
                style={{ color: activePokemon.theme.primary }}
              >
                Production Deck • Deliverable
              </span>

              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Showreel Portfolio Deck
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Portfolio ini merupakan dokumentasi profesional yang menampilkan profil, pengalaman, pencapaian, serta berbagai proyek nyata Varel Galih Partiyano di bidang teknologi informasi. Mencakup studi kasus pengembangan aplikasi dan website, perancangan UI/UX, wireframing, implementasi micro-interactions, hingga arsitektur dan pengembangan front-end sebagai representasi kemampuan, kreativitas, dan perjalanan profesional.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-wrap gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
                  style={{
                    backgroundColor: activePokemon.theme.primary,
                    color: '#000',
                    boxShadow: `0 0 20px ${activePokemon.theme.primary}44`,
                  }}
                >
                  <span>Preview Fullscreen ↗</span>
                </button>

                <a
                  href={pdfUrl}
                  download="DREAMON_CRETECH_VarelGalihPartiyano.pdf"
                  className="px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center gap-2"
                >
                  Download PDF 📥
                </a>
              </div>

              <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Format: PDF Presentation (Ready for Submission)</span>
              </div>
            </div>

            {/* Showcase PDF Reader Frame di Kanan */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 shadow-2xl group">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
                  title="Portfolio Varel PDF Preview"
                  className="w-full h-full border-0 block"
                />

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between pointer-events-auto">
                  <span className="text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: activePokemon.theme.primary }}
                    />
                    portfolio-varel.pdf
                  </span>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
                  >
                    Buka Ukuran Penuh ⛶
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* POP-UP MODAL PREVIEW BESAR (FULL VIEWPORT - NO CUTOFF) */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
          <div
            className="relative w-full max-w-5xl rounded-3xl p-4 sm:p-5 bg-zinc-950 border border-white/20 shadow-2xl flex flex-col gap-3"
            style={{
              boxShadow: `0 0 60px ${activePokemon.theme.primary}33`,
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: activePokemon.theme.primary }}
                />
                <h3 className="text-xs sm:text-sm font-bold text-white font-mono">
                  Production Deck Preview • Varel Galih Partiyano
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download="DREAMON_CRETECH_VarelGalihPartiyano.pdf"
                  className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  Download 📥
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body: Full Height Frame Tanpa Terpotong */}
            <div className="w-full h-[78vh] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
                title="Fullscreen Portfolio PDF Viewer"
                className="w-full h-full border-0 block"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}