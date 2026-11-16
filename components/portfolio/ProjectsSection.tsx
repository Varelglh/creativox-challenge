// components/portfolio/ProjectsSection.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PokemonCharacter } from '@/data/pokemon';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  activePokemon: PokemonCharacter;
}

export type ProjectCategory = 'web' | 'mobile' | 'uiux' | 'ai3d';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categories: ProjectCategory[];
  role: string;
  period: string;
  badge: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  images: string[];
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Tumbuh – Smart Food Nutrition Scanning & Healthy Recipes',
    category: 'Mobile Development · UI/UX Design',
    categories: ['mobile', 'uiux'],
    role: 'Mobile Developer & UI/UX Designer',
    period: '2024 - 2025',
    badge: 'Quest #01 • Smart Nutrition & Food AI',
    summary:
      'Aplikasi mobile pintar untuk memindai bahan makanan mentah (seperti tempe, jagung, sayur), mendeteksi kandungan gizi makro secara instan, menyajikan rekomendasi resep sehat, dan marketplace hasil panen lokal.',
    highlights: [
      'Smart Food Scanner: Antarmuka kamera pemindai bahan makanan dengan visualisasi persentase kecocokan deteksi, informasi kalori, lemak, protein, dan saran masakan bergizi.',
      'Manajemen Resep & Edukasi: Katalog resep masakan rumahan sehat dengan panduan bahan bertahap serta video edukasi pola makan seimbang (Isi Piringku).',
      'Marketplace & Digital Signage: Integrasi fitur penjualan hasil panen toko lokal dan desain display digital signage untuk promosi produk UMKM.',
    ],
    techStack: [
      'Mobile UI Design',
      'Figma',
      'Food AI Concept',
      'REST API',
      'Prototyping',
      'Digital Signage',
    ],
    images: [
      '/image/project/project 1/foto-mobile app tumbuh.jpg',
      '/image/project/project 1/foto-digital-signage.jpg',
      '/image/project/project 1/foto-page by page.png',
    ],
  },
  {
    id: 'proj-2',
    title: 'Astra Daihatsu Pangeran Jayakarta – Vehicle Inspection System',
    category: 'Mobile Development · Workshop System',
    categories: ['mobile', 'web'],
    role: 'Mobile & Frontend Developer',
    period: '2024 - 2025',
    badge: 'Quest #02 • Workshop Inspection System',
    summary:
      'Sistem digitalisasi inspeksi kendaraan bengkel resmi Astra Daihatsu yang menghubungkan Service Advisor, Mekanik, dan Kepala Regu (Karu) untuk pemantauan perbaikan dan suku cadang secara real-time.',
    highlights: [
      'Real-time Inspection Workflow: Menyediakan antarmuka terintegrasi bagi Service Advisor, Mekanik, dan Karu untuk memantau status inspeksi mobil dan riwayat tindakan perbaikan.',
      'Part Management & Pricing: Modul detail perbaikan dengan integrasi input suku cadang, kalkulasi biaya otomatis, dan status pengecekan nomor polisi kendaraan.',
      'Responsive Mobile Dark Theme: Didesain dengan antarmuka mobile gelap yang kontras dan ramah pengguna guna memudahkan teknisi bertugas di lingkungan bengkel.',
    ],
    techStack: [
      'React Native / Mobile UI',
      'Figma',
      'REST API',
      'Workflow Automation',
      'Dark Mode UI',
    ],
    images: [
      '/image/project/project 2/foto-page by page.png',
    ],
  },
  {
    id: 'proj-3',
    title: 'Hematrik – AI-Powered Smart Energy Monitoring & Automation',
    category: 'Web Development · AI & IoT System',
    categories: ['web', 'ai3d'],
    role: 'Full Stack Developer · UI/UX Designer',
    period: 'Jun 2026',
    badge: 'Quest #03 • AI & IoT System',
    summary:
      'Sistem pemantauan energi pintar dan otomasi ruangan berbasis kecerdasan buatan (YOLO object detection) untuk mengidentifikasi keberadaan manusia dan memutus arus listrik secara otomatis saat ruangan kosong.',
    highlights: [
      'Real-time Object Detection: Membangun microservice inferensi berbasis FastAPI, OpenCV, dan custom model YOLO untuk mendeteksi keberadaan manusia serta menyiarkan live annotated video stream berlatensi rendah.',
      'Smart Automation Logic: Merancang backend Express.js dengan aturan cerdas konservasi energi, mencakup hitung mundur pemadaman otomatis ruangan kosong, penjadwalan jam kerja, dan kontrol status perangkat IoT.',
      'Real-time Monitoring Dashboard: Merancang dan mengembangkan antarmuka dashboard React.js responsif dengan pemantauan okupansi langsung, toggle jarak jauh (Lampu, AC, Dispenser), dan peringatan pemborosan daya.',
    ],
    techStack: [
      'Python',
      'Ultralytics YOLO',
      'FastAPI',
      'React.js',
      'React Router',
      'Node.js',
      'Express.js',
      'Axios',
      'MySQL',
      'REST API',
    ],
    images: [
      '/image/project/project 3/foto-1.png',
      '/image/project/project 3/foto-2.png',
      '/image/project/project 3/foto-3.png',
    ],
  },
  {
    id: 'proj-4',
    title: 'Portfolio Digital Arena – 3D Interactive Web Portfolio',
    category: '3D Interactive · Web Development',
    categories: ['web', 'ai3d', 'uiux'],
    role: 'Full Stack Developer · UI/UX Designer',
    period: '2026 (Active)',
    badge: 'Quest #04 • 3D & WebGL',
    summary:
      'Portofolio web futuristik bertema cyberpunk dengan rendering 3D interaktif Three.js/WebGL (model mobil balap Mercedes AMG Petronas F1), sound effects, dan arsitektur modern Svelte 5 Runes.',
    highlights: [
      '3D Graphics & WebGL Shaders: Mengimplementasikan grafik 3D interaktif menggunakan Three.js dan WebGL shaders untuk menciptakan dynamic hero section yang imersif.',
      'Svelte 5 Runes Architecture: Dibangun dengan arsitektur reaktif Svelte 5 dan TypeScript demi efisiensi render maksimal dan manajemen state yang responsif.',
      'Futuristic UI Styling & Gamification: Desain cyberpunk glassmorphism dengan micro-interactions, fitur gamifikasi Arcade Arena mini-games, Quest Log modal, dan Cyber CLI terminal simulator.',
      'Responsive & 60 FPS Optimized: Performa rendering dioptimalkan penuh untuk kenyamanan navigasi pada desktop maupun perangkat layar sentuh.',
    ],
    techStack: [
      'Svelte 5',
      'TypeScript',
      'Three.js',
      'WebGL',
      'Tailwind CSS',
      'Web Audio API',
      'Interactive Shaders',
    ],
    images: [
      '/image/project/project 4/foto-1.png',
      '/image/project/project 4/foto-2.png',
      '/image/project/project 4/foto-3.png',
    ],
  },
  {
    id: 'proj-5',
    title: 'CCTV Infrastructure Monitoring Dashboard – NSK',
    category: 'Web Development · Client Project',
    categories: ['web'],
    role: 'Frontend Developer (Client Project)',
    period: 'Sep 2025 - Oct 2025',
    badge: 'Quest #05 • Enterprise Client',
    summary:
      'Dashboard monitoring infrastruktur jaringan CCTV terpusat untuk perusahaan, mencakup manajemen pengguna (User Management), jadwal patroli (Patrol Schedule), dan langganan channel kamera secara real-time.',
    highlights: [
      'Enterprise CCTV Monitoring: Mengembangkan dashboard pemantauan infrastruktur kamera pengawas berbasis web untuk kebutuhan pengawasan terpadu fasilitas korporasi.',
      'State Management Terstruktur: Membangun antarmuka interaktif dan responsif menggunakan React.js dan React Redux untuk penanganan status data kompleks dan sinkronisasi berkala.',
      'Kolaborasi Fitur Klien: Bekerja bersama tim developer untuk menerjemahkan kebutuhan operasional lapangan ke dalam fitur antarmuka yang efisien dan mudah dioperasikan.',
    ],
    techStack: [
      'React.js',
      'React Redux',
      'Figma',
      'Tailwind CSS',
      'REST API',
      'UI/UX Design',
    ],
    images: [
      '/image/project/project 5/Foto-1.png',
    ],
  },
  {
    id: 'proj-6',
    title: 'IDEANATION 2024 – SEF Sexual Education & Prevention App',
    category: 'UI/UX Design · Mobile App',
    categories: ['uiux', 'mobile'],
    role: 'UI/UX Designer',
    period: 'Dec 2024 - Jan 2025',
    badge: 'Quest #06 • Competition Project',
    summary:
      'Desain antarmuka aplikasi mobile edukasi pencegahan pelecehan seksual dalam kompetisi nasional IDEANATION Business Plan 2024, berfokus pada pengalaman yang ramah, aman, dan mendidik.',
    highlights: [
      'Desain Inklusif & Ramah Pengguna: Merancang antarmuka mobile yang aman, mudah dipahami, dan menyenangkan dengan palet warna inklusif serta maskot karakter interaktif.',
      'Fitur Edukasi & Komunitas: Menghadirkan modul kuis interaktif, rekomendasi artikel, saluran pengaduan/konsultasi privat, musik pereda stres, dan leaderboard komunitas.',
      'Transformasi Kebutuhan Sosial ke Solusi Digital: Menjalankan riset kebutuhan pengguna dan menyusun alur user journey yang sensitif terhadap topik perlindungan dan pencegahan kekerasan seksual.',
    ],
    techStack: [
      'Figma',
      'UI/UX Research',
      'Design Systems',
      'Prototyping',
      'User Journey Mapping',
      'Mobile App Design',
    ],
    images: [
      '/image/project/project 6/foto-1.png',
    ],
  },
  {
    id: 'proj-7',
    title: 'Academic Projects – Semester 1–4 (Comental & System Analysis)',
    category: 'Full-Stack Web · System Analysis',
    categories: ['web', 'uiux'],
    role: 'Full-Stack Developer · UI/UX Designer · System Analyst',
    period: '2023 - 2025',
    badge: 'Quest #07 • Academic Journey',
    summary:
      'Rangkaian proyek perkuliahan Sistem Informasi Telkom University, mencakup platform kesehatan mental Comental berbasis Laravel & MySQL, website PHP Native modular, dan analisis pemodelan sistem UML.',
    highlights: [
      'Platform Comental (Laravel): Merancang antarmuka UI/UX dan mengimplementasikan aplikasi web konsultasi psikolog online serta terapi musik dengan framework Laravel.',
      'Website PHP Native & CRUD Praktikum: Mengembangkan aplikasi web berbasis PHP Native dan MySQL dengan operasi CRUD, validasi formulir, dan autentikasi pengguna.',
      'System Analysis & Design (UML): Menyusun dokumentasi spesifikasi kebutuhan sistem secara formal menggunakan Use Case Diagram, Activity Diagram, dan Sequence Diagram dengan Bpmn.io.',
    ],
    techStack: [
      'Laravel',
      'PHP Native',
      'MySQL',
      'JavaScript',
      'HTML5 & CSS3',
      'Figma',
      'Bpmn.io',
      'UML Modeling',
    ],
    images: [
      '/image/project/project 7/foto-UIUX Design.png',
      '/image/project/project 7/foto-website framework laravel.png',
      '/image/project/project 7/foto-website php native.jpg',
      '/image/project/project 7/foto-System Analysis & UML.jpg',
    ],
  },
];

export default function ProjectsSection({ activePokemon }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  type FilterTabType = 'all' | 'web' | 'mobile' | 'uiux' | 'ai3d';

  const [selectedFilter, setSelectedFilter] = useState<FilterTabType>('all');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);

  const filteredProjects =
    selectedFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.categories.includes(selectedFilter as ProjectCategory));

  // GSAP ScrollTrigger Entrance
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [selectedFilter] }
  );

  // GSAP Modal Entrance Animation
  useEffect(() => {
    if (selectedProjectForModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [selectedProjectForModal]);

  // Tutup Modal via ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProjectForModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-5xl space-y-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span
              className="text-xs uppercase font-mono tracking-widest font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 inline-block"
              style={{ color: activePokemon.theme.primary }}
            >
              Selected Works • Project Highlights
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <p className="text-xs font-mono text-zinc-400">
              Battle Deck: 0{filteredProjects.length} / 0{PROJECTS_DATA.length} Projects Available
            </p>
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'web', label: 'Web Development' },
                { id: 'mobile', label: 'Mobile Development' },
                { id: 'uiux', label: 'UI/UX Design' },
                { id: 'ai3d', label: 'AI & 3D Interactive' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as FilterTabType)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'text-black shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: selectedFilter === tab.id ? activePokemon.theme.primary : 'transparent',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid (Responsive 1 - 2 - 3 Kolom) */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProjectForModal(project)}
              className="project-card group relative flex flex-col justify-between rounded-3xl p-5 bg-zinc-950/85 border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              style={{
                boxShadow: `0 15px 35px rgba(0,0,0,0.6)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = activePokemon.theme.primary;
                e.currentTarget.style.boxShadow = `0 15px 40px ${activePokemon.theme.primary}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6)';
              }}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden mb-4 shadow-md group-hover:border-white/25 transition-all">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Overlay */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/80 backdrop-blur-md border border-white/15 text-zinc-300">
                  {project.period}
                </div>

                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[9px] font-mono bg-black/75 backdrop-blur-md text-zinc-300 border border-white/10">
                  📷 {project.images.length} Photos
                </div>
              </div>

              {/* Info Project */}
              <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider font-bold block mb-1"
                    style={{ color: activePokemon.theme.primary }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-100 transition-colors leading-snug line-clamp-2">
                    {project.title}
                  </h3>
                </div>

                {/* Ringkasan Singkat (Bahasa Indonesia) */}
                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                  {project.summary}
                </p>

                {/* Tech Tags & CTA Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex gap-1.5 flex-wrap">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-500">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                    style={{
                      backgroundColor: `${activePokemon.theme.primary}22`,
                      color: activePokemon.theme.primary,
                    }}
                  >
                    ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* POP-UP MODAL DETAIL PROJECT DENGAN GSAP & FOTO LENGKAP */}
      {/* ========================================================= */}
      {selectedProjectForModal && (
        <div
          onClick={() => setSelectedProjectForModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 bg-zinc-950 border border-white/20 shadow-2xl flex flex-col gap-6 custom-scrollbar"
            style={{
              boxShadow: `0 0 60px ${activePokemon.theme.primary}33`,
            }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10"
                    style={{ color: activePokemon.theme.primary }}
                  >
                    {selectedProjectForModal.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    • {selectedProjectForModal.period}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedProjectForModal.title}
                </h3>
                <p className="text-sm font-semibold text-zinc-300 mt-1">
                  Role: <span className="text-white">{selectedProjectForModal.role}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedProjectForModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-all flex-shrink-0"
                aria-label="Close Project Details"
              >
                ✕
              </button>
            </div>

            {/* Galeri Foto Project */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                  <span>📸 Project Screen & Architecture Gallery</span>
                  <span className="text-zinc-500">({selectedProjectForModal.images.length} Photos)</span>
                </span>
              </div>

              <div
                className={`grid gap-3.5 ${
                  selectedProjectForModal.images.length === 1
                    ? 'grid-cols-1'
                    : selectedProjectForModal.images.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {selectedProjectForModal.images.map((imgSrc, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black shadow-lg group"
                  >
                    <Image
                      src={imgSrc}
                      alt={`${selectedProjectForModal.title} View ${imgIdx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ringkasan Eksekutif Proyek (Isi Bahasa Indonesia) */}
            <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Ringkasan Solusi:
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedProjectForModal.summary}
              </p>
            </div>

            {/* Fitur Utama & Arsitektur Sistem (Isi Bahasa Indonesia) */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Key Highlights & System Architecture:
              </h4>
              <ul className="space-y-2.5">
                {selectedProjectForModal.highlights.map((highlight, hIdx) => (
                  <li
                    key={hIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: activePokemon.theme.primary }}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack & Core Technologies */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Tech Stack & Technologies Used:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProjectForModal.techStack.map((tech) => (
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
                onClick={() => setSelectedProjectForModal(null)}
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