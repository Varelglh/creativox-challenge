// components/portfolio/ExperienceSection.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PokemonCharacter } from '@/data/pokemon';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSectionProps {
  activePokemon: PokemonCharacter;
}

export interface ExperienceItem {
  id: string;
  role: string;
  subRole?: string;
  company: string;
  period: string;
  badge: string;
  summary: string;
  responsibilities: string[];
  techStack: string[];
  images: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Frontend Developer Intern',
    subRole: 'Frontend Developer · UI/UX Designer',
    company: 'PT Rastek.id',
    period: 'Sep 2025 - Jul 2026',
    badge: 'Gym Badge: Champion',
    summary:
      'Mengembangkan antarmuka web responsif dan interaktif, mengonversi desain UI/UX Figma menjadi kode fungsional, serta berkolaborasi dalam pengujian dan penyempurnaan performa sistem.',
    responsibilities: [
      'Mengembangkan dan mengimplementasikan antarmuka web responsif berdasarkan kebutuhan desain dan spesifikasi proyek.',
      'Menerjemahkan rancangan antarmuka UI/UX dari Figma menjadi komponen web fungsional yang intuitif, estetis, dan ramah pengguna (user-friendly).',
      'Berkolaborasi erat bersama tim pengembang untuk mengimplementasikan fitur-fitur baru dan meningkatkan efisiensi fungsionalitas website.',
      'Melakukan pengujian antarmuka (testing), debugging, serta penyempurnaan UI untuk memastikan usability dan performa aplikasi tetap konsisten.',
    ],
    techStack: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
      'Figma',
      'REST API',
      'Git & GitHub',
      'UI/UX Design',
    ],
    images: [
      '/image/experience/experience-frontend-intern/foto-1.jpg',
      '/image/experience/experience-frontend-intern/foto-2.jpg',
    ],
  },
  {
    id: 'exp-2',
    role: 'Web Programming Teaching Assistant',
    subRole: 'Asisten Praktikum Pemrograman Web',
    company: 'Telkom University',
    period: 'Feb 2025 - Jul 2025',
    badge: 'Gym Badge: Elite',
    summary:
      'Membimbing mahasiswa dalam memahami konsep fundamental web development (HTML, CSS, JS, Native PHP), mendampingi proyek praktikum CRUD, serta membantu evaluasi tugas akhir.',
    responsibilities: [
      'Membimbing puluhan mahasiswa dalam memahami serta mengimplementasikan konsep fundamental pengembangan web menggunakan HTML, CSS, JavaScript, dan Native PHP.',
      'Mendampingi mahasiswa dalam pembangunan proyek praktikum berbasis operasi CRUD, manajemen formulir (form handling), validasi data, serta memberikan asistensi technical troubleshooting.',
      'Mendukung dosen pengampu dalam merancang modul praktikum, studi kasus, instrumen penilaian, serta mengevaluasi tugas dan proyek akhir mahasiswa.',
    ],
    techStack: [
      'PHP Native',
      'JavaScript',
      'HTML5',
      'CSS3',
      'MySQL',
      'Apache',
      'Postman',
      'Git',
    ],
    images: [
      '/image/experience/experience-teaching-assistant/foto-1.jpg',
      '/image/experience/experience-teaching-assistant/foto-2.jpg',
    ],
  },
  {
    id: 'exp-3',
    role: 'Laboratory Assistant Trainee',
    subRole: 'Faculty of Applied Sciences (Fakultas Ilmu Terapan)',
    company: 'Telkom University',
    period: 'Sep 2024 - Mar 2025',
    badge: 'Gym Badge: Boulder',
    summary:
      'Memelihara infrastruktur hardware, software, dan jaringan laboratorium fakultas, serta menyiapkan lingkungan komputasi yang siap pakai untuk seluruh sesi praktikum.',
    responsibilities: [
      'Memonitor dan merawat infrastruktur perangkat keras (hardware), perangkat lunak (software), serta jaringan laboratorium guna menjamin kelancaran operasional.',
      'Mempersiapkan dan mengonfigurasi perangkat komputer, sistem operasi, serta lisensi perangkat lunak praktikum sebelum jadwal akademik berlangsung.',
      'Membantu menangani kendala teknis (troubleshooting) secara cepat dan memastikan fasilitas laboratorium selalu siap mendukung aktivitas pembelajaran harian.',
    ],
    techStack: [
      'Computer Hardware',
      'Computer Networking',
      'OS Configuration',
      'IT Support',
      'Troubleshooting',
      'Laboratory Infrastructure',
    ],
    images: [
      '/image/experience/experience-laboratory-assistant/foto-1.png',
    ],
  },
  {
    id: 'exp-4',
    role: 'Designer Invitation Letter Intern',
    subRole: 'Graphic Designer & Digital Invitation Specialist',
    company: '@MantenStory',
    period: 'Nov 2021 - Feb 2022',
    badge: 'Gym Badge: Cascade',
    summary:
      'Merancang materi undangan digital sesuai identitas brand klien, melakukan finalisasi visual production-ready, serta menyempurnakan tipografi dan layout estetik.',
    responsibilities: [
      'Merancang dan mematangkan materi undangan digital sesuai kebutuhan spesifik klien serta pedoman identitas merek (brand guidelines).',
      'Menangani tahap finalisasi dan finishing process guna memastikan hasil desain berkualitas tinggi, rapi, dan siap dipublikasikan (production-ready).',
      'Berkolaborasi dengan tim kreatif untuk mereview dan menyempurnakan detail tata letak (layout), tipografi, estetika visual, serta aset grafis.',
    ],
    techStack: [
      'Adobe Photoshop',
      'Figma',
      'Canva',
      'Typography & Layout',
      'Color Theory',
      'Digital Asset Design',
    ],
    images: [
      '/image/experience/experience-designer-intern/foto-1.jpeg',
    ],
  },
];

export default function ExperienceSection({ activePokemon }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExpForModal, setSelectedExpForModal] = useState<ExperienceItem | null>(null);

  const currentExp = EXPERIENCES[activeIndex];

  // GSAP ScrollTrigger Entrance
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

  // GSAP Smooth Transition saat Active Index berganti
  const changeExperience = (nextIndex: number) => {
    if (contentInnerRef.current) {
      gsap.to(contentInnerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setActiveIndex(nextIndex);
          gsap.fromTo(
            contentInnerRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
        },
      });
    } else {
      setActiveIndex(nextIndex);
    }
  };

  // GSAP Entrance untuk Pop-up Modal
  useEffect(() => {
    if (selectedExpForModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [selectedExpForModal]);

  // Tutup Modal via ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedExpForModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-5xl space-y-8">
        {/* Header Bagian Experience */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span
              className="text-xs uppercase font-mono tracking-widest font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 inline-block"
              style={{ color: activePokemon.theme.primary }}
            >
              Career Milestones
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Work Experience
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              Adventure Logs: 0{activeIndex + 1} / 0{EXPERIENCES.length}
            </span>
          </div>
        </div>

        {/* Experience Main Card */}
        <div
          ref={cardRef}
          onClick={() => setSelectedExpForModal(currentExp)}
          className="relative rounded-3xl p-6 md:p-8 bg-zinc-950/85 border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer group hover:border-white/25"
          style={{
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 35px ${activePokemon.theme.primary}15`,
          }}
        >
          {/* Subtle Ambient Hover Glow */}
          <div
            className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: activePokemon.theme.primary }}
          />

          <div ref={contentInnerRef}>
            {/* Top Bar Metadata & Navigasi */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 inline-block"
                    style={{ color: activePokemon.theme.primary }}
                  >
                    {currentExp.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    • {currentExp.period}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-100 transition-colors">
                  {currentExp.role}
                </h3>
                <p className="text-sm font-semibold text-zinc-300 mt-0.5">
                  {currentExp.company} {currentExp.subRole && <span className="text-zinc-500 font-normal">({currentExp.subRole})</span>}
                </p>
              </div>

              {/* Action Buttons: Preview Detail & Prev / Next */}
              <div
                className="flex items-center gap-2.5"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedExpForModal(currentExp)}
                  className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  <span>View Details & Photos</span>
                  <span style={{ color: activePokemon.theme.primary }}>↗</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      changeExperience(activeIndex > 0 ? activeIndex - 1 : EXPERIENCES.length - 1)
                    }
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                    aria-label="Previous Experience"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      changeExperience(activeIndex < EXPERIENCES.length - 1 ? activeIndex + 1 : 0)
                    }
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
                    aria-label="Next Experience"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Grid Layout: Ringkasan & Preview Foto Dokumentasi */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Kolom Teks Ringkasan (Isi Bahasa Indonesia) */}
              <div className="lg:col-span-8 space-y-4">
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                  {currentExp.summary}
                </p>

                {/* Tech Stack Pills */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                    Tech Stack & Core Skills:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentExp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-zinc-200 transition-colors group-hover:border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: activePokemon.theme.primary }}
                  />
                  <span>Click this card to view detailed responsibilities & photo gallery</span>
                </div>
              </div>

              {/* Kolom Preview Thumbnail Foto */}
              <div className="lg:col-span-4 flex items-center justify-center">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/15 bg-zinc-900 shadow-lg group-hover:border-white/30 transition-all">
                  <Image
                    src={currentExp.images[0]}
                    alt={currentExp.role}
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[10px] font-mono text-zinc-200 flex items-center gap-1.5">
                      📷 {currentExp.images.length} Photos Attached
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center items-center gap-2 pt-1">
          {EXPERIENCES.map((exp, idx) => (
            <button
              key={exp.id}
              onClick={() => changeExperience(idx)}
              className="h-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: idx === activeIndex ? '32px' : '8px',
                backgroundColor:
                  idx === activeIndex ? activePokemon.theme.primary : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Go to experience ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* POP-UP MODAL DETAIL EXPERIENCE DENGAN GSAP & FOTO LENGKAP */}
      {/* ========================================================= */}
      {selectedExpForModal && (
        <div
          onClick={() => setSelectedExpForModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 bg-zinc-950 border border-white/20 shadow-2xl flex flex-col gap-6 custom-scrollbar"
            style={{
              boxShadow: `0 0 60px ${activePokemon.theme.primary}33`,
            }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10"
                    style={{ color: activePokemon.theme.primary }}
                  >
                    {selectedExpForModal.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    • {selectedExpForModal.period}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedExpForModal.role}
                </h3>
                <p className="text-sm font-semibold text-zinc-300 mt-0.5">
                  {selectedExpForModal.company} {selectedExpForModal.subRole && (
                    <span className="text-zinc-400 font-normal">({selectedExpForModal.subRole})</span>
                  )}
                </p>
              </div>

              <button
                onClick={() => setSelectedExpForModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-all flex-shrink-0"
                aria-label="Close Details"
              >
                ✕
              </button>
            </div>

            {/* Galeri Foto Dokumentasi */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                  <span>📸 Activity Documentation</span>
                  <span className="text-zinc-500">({selectedExpForModal.images.length} Photos)</span>
                </span>
              </div>

              <div
                className={`grid gap-3 ${
                  selectedExpForModal.images.length > 1
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {selectedExpForModal.images.map((imgSrc, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black shadow-lg group"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${selectedExpForModal.role} Foto ${imgIdx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tanggung Jawab & Kontribusi Utama (Isi Bahasa Indonesia) */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Key Responsibilities & Contributions:
              </h4>
              <ul className="space-y-2.5">
                {selectedExpForModal.responsibilities.map((resp, rIdx) => (
                  <li
                    key={rIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: activePokemon.theme.primary }}
                    />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack & Perangkat Kerja */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Tech Stack & Core Technologies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedExpForModal.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/15 text-white shadow-sm flex items-center gap-1.5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: activePokemon.theme.primary }}
                    />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] font-mono text-zinc-500">
              <span>Creativox Portfolio Deliverable • 2026</span>
              <button
                onClick={() => setSelectedExpForModal(null)}
                className="px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                Close Window ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}