# 🎮 PokéFolio: Interactive 3D Developer Portfolio
> **Creativox Front-End Developer Internship Challenge**  
> Candidate: **Varel Galih Partiyano**  
> Live Deployment: [https://varel-about-me.vercel.app](https://varel-about-me.vercel.app)  
> Repository: [https://github.com/Varelglh/creativox-challenge](https://github.com/Varelglh/creativox-challenge)

---

## 🌟 Executive Summary & Concept

**PokéFolio** adalah web portfolio interaktif berbasis **Next.js 16**, **Three.js**, **GSAP**, dan **Tailwind CSS v4** yang menggabungkan elemen eksplorasi game RPG Pokémon legendaris dengan rekam jejak profesional, keahlian teknis, dan portofolio nyata dari **Varel Galih Partiyano** (Lulusan D3 Sistem Informasi, Telkom University - IPK 3.60/4.00).

Pengunjung tidak sekadar membaca CV konvensional, melainkan merasakan pengalaman imersif:
1. **Title & Auth Screen**: Login interaktif terintegrasi dengan DummyJSON User API.
2. **Maestro Trainer Selection**: Memilih persona Trainer legendaris (Ash Ketchum, Red, Cynthia, Leon, Steven Stone).
3. **Pokémon Partner Selection**: Memilih starter Pokémon (Pikachu, Charmander, Squirtle, Bulbasaur, Gengar) yang secara dinamis mengubah seluruh skema warna tema visual, aksen neon, gradient background, dan aura 3D pada website.
4. **Three.js 3D Cyber Arena**: Arena hologram 3D interaktif dengan Pokéball berputar, partikel debu kosmik, ring neon panggung, efek parallax kursor, serta toggle proyeksi hologram (Sprite Trainer vs Foto Asli Transparan).
5. **Interactive Portfolio Journey**: Scroll-spied navigation yang otomatis mendeteksi posisi viewport pada section Hero, About, Skills, Showreel, Projects, Experience, hingga Contact.

---

## 🚀 Live Demo & Deployment

| Platform | URL | Status |
| :--- | :--- | :--- |
| **Vercel Production** | [https://varel-about-me.vercel.app](https://varel-about-me.vercel.app) | 🟢 Active & Deployed |
| **GitHub Repository** | [https://github.com/Varelglh/creativox-challenge](https://github.com/Varelglh/creativox-challenge) | 🟢 Public Repository |

---

## 🛠️ Tech Stack & Architecture

### **Core Frameworks & Runtimes**
- **Next.js 16.4.6** (App Router, Turbopack Bundler, Server & Client Components)
- **React 19.3.0** & **React DOM 19**
- **TypeScript 5.x** (Strict Type Safety across state, data models, & canvas refs)

### **Creative Engineering & Visuals**
- **Three.js (0.187.0)**:
  - Custom procedural 3D Pokéball Mesh (SphereGeometry, RingGeometry, CylinderGeometry with metallic MeshStandardMaterial).
  - Procedural floating particle field (BufferGeometry points dengan rotasi dinamis).
  - Multi-tier Cyber Arena Platform dengan neon ring wireframes & lighting shaders.
  - Interactive Holo Slide Toggle (Sprite Maestro Pokémon vs Foto Transparan Varel Galih).
  - Dynamic responsive canvas resizing & pointer-based mouse parallax.
- **GSAP 3.15.1** & **@gsap/react**:
  - Timeline animations untuk Hero title text warp, badge popups, dan modal entries.
  - Micro-interactions pada hover cards, tabs, and interactive buttons.
- **Tailwind CSS 4.3.3**:
  - Modern utility-first styling dengan full responsive breakpoints (`sm`, `md`, `lg`, `xl`).
  - Dynamic inline color injection (`activePokemon.theme.primary`) untuk adaptive themes.
- **Lucide React Icons**: Vector icon library yang bersih dan modern.

---

## 📂 Project Structure

```bash
creativox-challenge/
├── app/
│   ├── favicon.ico             # Custom Favicon
│   ├── globals.css             # Tailwind 4 directives, custom scrollbar, animations
│   ├── layout.tsx              # Root HTML layout, Geist fonts, & SEO metadata
│   └── page.tsx                # Master state orchestrator & scroll intersection observer
│
├── components/
│   ├── TitleScreen.tsx         # Layar pembuka, DummyJSON Auth, audio/video background
│   ├── TrainersSelect.tsx      # Carousel pemilihan 5 Maestro Trainer
│   ├── CharacterSelect.tsx     # Seleksi 5 Pokémon Starter & theme switcher
│   ├── LoadingScreen.tsx       # Transisi warp futuristic GSAP loader
│   │
│   └── portfolio/
│       ├── Sidebar.tsx         # Sidebar desktop & floating mobile bar + user badges
│       ├── HeroSection.tsx     # Hero intro, punchy headline, level badge & CTA
│       ├── Pokemon3DCanvas.tsx # Three.js canvas 3D Pokéball, Arena & Holo Toggle
│       ├── AboutSection.tsx    # Dual-slide carousel: About Me & My Hobby Lifestyle
│       ├── SkillsSection.tsx   # 6 Deck Skill Categories dengan official devicon SVGs
│       ├── ShowreelSection.tsx # Preview PDF Portofolio 16:9, Modal Popup & Download
│       ├── ProjectsSection.tsx # 7 Quests / Projects, category filter & modal details
│       ├── ExperienceSection.tsx # 4 Career timelines & photo gallery modals
│       └── ContactSection.tsx  # Interactive contact cards, email & photo slideshow
│
├── data/
│   ├── pokemon.ts              # Data 5 Starter Pokémon + skema warna Hex & Tailwind
│   └── trainers.ts             # Data 5 Maestro Trainer + quotes, regions & avatars
│
├── public/
│   ├── image/
│   │   ├── About-me.jpeg       # Foto profil resmi Varel
│   │   ├── foto-saya.png       # Foto transparan untuk Holo 3D Canvas
│   │   ├── my hobby/           # Foto hobi & lifestyle (foto-1, foto-2, foto-3)
│   │   ├── contact/            # Foto dokumentasi contact & activities
│   │   ├── experience/         # Galeri foto tiap pengalaman kerja/organisasi
│   │   └── project/            # Galeri screenshot 7 proyek portofolio
│   ├── showrell/
│   │   └── portfolio-varel.pdf # Dokumen PDF portofolio asli
│   └── videos/
│       └── pokemon-intro.mp4   # Video background intro looping
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🎯 Detailed Component Breakdown

### 1. Game State Flow (`app/page.tsx`)
Aplikasi bekerja menggunakan finite-state machine yang mulus:
```
[title] ➔ [trainer-select] ➔ [pokemon-select] ➔ [loading] ➔ [portfolio]
   ↑                                                           │
   └────────── Switch Trainer / Pokémon Partner ───────────────┘
```
- **IntersectionObserver Engine**: Memantau section aktif (`#hero`, `#about`, `#skills`, `#showreel`, `#projects`, `#experience`, `#contact`) dengan debounce aman agar Sidebar otomatis ter-highlight saat pengguna melakukan scroll.

### 2. Three.js 3D Interactive Canvas (`Pokemon3DCanvas.tsx`)
- **Procedural Pokéball**: Dibangun secara manual menggunakan Three.js primitives tanpa ketergantungan file 3D external yang berat, menghasilkan waktu loading instan (< 100ms).
- **Interactive Hologram Selector**: Slider mini di dalam area 3D yang memungkinkan pengguna memilih antara:
  - **Maestro Persona Sprite**: Pixel-art animasi resmi dari Trainer yang dipilih.
  - **Real Varel Hologram**: Foto transparan resolusi tinggi (`foto-saya.png`) dengan efek floating neon.
- **Lighting Setup**: Multi-point lighting (ambient, directional front keylight, point backlight) yang bereaksi terhadap rotasi mouse.

### 3. Dynamic Pokémon Theme Engine (`data/pokemon.ts`)
Setiap starter yang dipilih akan menyuntikkan palet warna unik ke seluruh elemen UI:
- ⚡ **Pikachu**: Cyber Gold & Amber Electric Glow (`#FBBF24`)
- 🔥 **Charmander**: Blazing Crimson & Molten Orange (`#F97316`)
- 💧 **Squirtle**: Deep Oceanic Azure & Sky Blue (`#0EA5E9`)
- 🌿 **Bulbasaur**: Neon Cyber Jade & Emerald Forest (`#10B981`)
- 👻 **Gengar**: Shadow Nether & Astral Purple (`#A855F7`)

### 4. About & Hobby Carousel (`AboutSection.tsx`)
- **Slide 1 - About Me**: Rangkuman latar belakang akademis Telkom University, aspirasi karier, status ketersediaan kerja, serta komparasi persona Maestro Trainer.
- **Slide 2 - My Hobby & Life Balance**: Ukuran card proporsional dan responsif menampilkan hobi fotografi, lifestyle streetwear, eksplorasi audio/musik, dan aktivitas outdoor dengan navigasi dots & tombol prev/next.

### 5. Verified Projects Showcase (`ProjectsSection.tsx`)
Menampilkan 7 Quest Portofolio riil dengan filter multi-kategori:
- **Quest 01**: Mobile Application Tumbuh (Digital Parenting, Stunting Detection & IoT Monitoring)
- **Quest 02**: Astra Daihatsu Pangeran Jayakarta (Web & Digital Showroom Experience)
- **Quest 03**: Virtual Tour 360 Gedung Pascasarjana Telkom University (Interactive 3D Virtual Tour)
- **Quest 04**: Redesign UI/UX Mobile Banking BRImo (End-to-end Case Study)
- **Quest 05**: Tel-U Career Days 2024 Event System & Portal
- **Quest 06**: Digital Signature & Verification Platform
- **Quest 07**: Enterprise Inventory & Asset Management System (Laravel & PHP)
- **Modal Popup**: Dilengkapi screenshot resolusi tinggi, tech stack badge, peran kerja, dan link demo/GitHub.

### 6. Career Milestones (`ExperienceSection.tsx`)
- **Frontend Developer Intern** - PT Astra International Tbk (Daihatsu)
- **UI/UX Designer Intern** - PT Telkom Indonesia (Persero) Tbk
- **Laboratory Assistant** - Fakultas Ilmu Terapan, Telkom University
- **Teaching Assistant** - Pemrograman Web & Basis Data, Telkom University
- Masing-masing dilengkapi pop-up modal dengan galeri dokumentasi foto kegiatan.

---

## ⚡ Getting Started (Local Development)

### Prasyarat
- **Node.js**: versi 18.18.0 atau lebih baru (direkomendasikan Node.js 20+)
- **npm**, **pnpm**, atau **yarn**

### 1. Clone Repository
```bash
git clone https://github.com/Varelglh/creativox-challenge.git
cd creativox-challenge
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### 4. Validasi Type Checking
```bash
npx tsc --noEmit
```

### 5. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 📱 Responsiveness & Browser Support

Project telah diuji dan dioptimalkan untuk:
- 📱 **Mobile**: iPhone SE, iPhone 12/13/14/15/16 Pro, Samsung Galaxy S21/S23, Google Pixel (320px - 480px)
- 📱 **Tablet**: iPad Mini, iPad Air, Galaxy Tab (768px - 1024px)
- 💻 **Desktop / Ultra-Wide**: MacBook, FHD Monitor, 2K/4K Displays (1280px - 2560px)
- 🌐 **Cross-Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari.

---

## 👨‍💻 Author & Contact

**Varel Galih Partiyano**
- **Role**: Front-End Developer & UI/UX Designer
- **Alma Mater**: D3 Sistem Informasi, Telkom University (IPK: 3.60 / 4.00)
- **Email**: varelgalihp@gmail.com
- **LinkedIn**: [linkedin.com/in/varel-galih](https://www.linkedin.com/in/varel-galih-697b0a24b/)
- **Live Portfolio**: [https://varel-about-me.vercel.app](https://varel-about-me.vercel.app)

---
*Created with passion and dedication for the Creativox Front-End Developer Internship Challenge 2026.*
