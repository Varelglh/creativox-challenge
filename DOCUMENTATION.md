# 📘 Technical Documentation & Project Report: PokéFolio
**Creativox Front-End Developer Internship Challenge**  
**Author**: Varel Galih Partiyano  
**Repository**: [github.com/Varelglh/creativox-challenge](https://github.com/Varelglh/creativox-challenge)  
**Live URL**: [varel-about-me.vercel.app](https://varel-about-me.vercel.app)  

---

## 1. Project Background & Challenge Objectives

Proyek ini dibangun secara khusus untuk menjawab **Creativox Front-End Developer Internship Challenge**. Sasaran dari tantangan ini adalah mendemonstrasikan keahlian tingkat lanjut dalam rekayasa web modern, mencakup:
1. **Interactive Storytelling & Gamification**: Mengubah format portofolio statis menjadi pengalaman bermain game yang menarik, imersif, dan tetap profesional.
2. **Advanced 3D Web Graphics**: Mengintegrasikan Three.js secara efisien tanpa menurunkan performa browser.
3. **Smooth Animation Orchestration**: Menggunakan GSAP untuk transisi halaman, efek visual, dan micro-interactions yang mulus.
4. **Clean Code & Robust Architecture**: Pemanfaatan Next.js 16 App Router, React 19, TypeScript strict mode, dan Tailwind CSS v4.
5. **Real Data Integrity**: Menampilkan rekam jejak asli Varel Galih Partiyano (pendidikan, 7 proyek riil, 4 pengalaman kerja, skills, showreel PDF, dan kontak).

---

## 2. System Architecture & State Machine

Aplikasi diatur oleh Finite State Machine terpusat di `app/page.tsx`:

```
+---------------------------------------------------------------+
|                       GAME STATE MACHINE                      |
+---------------------------------------------------------------+
|                                                               |
|  [ TitleScreen ]  --(User Auth/Guest)-->  [ TrainerSelect ]   |
|         ^                                         |           |
|         |                                    (Select Maestro) |
|         |                                         v           |
|         +<------------(Back)------------- [ CharacterSelect ] |
|                                                   |           |
|                                            (Select Pokémon)   |
|                                                   v           |
|                                            [ LoadingScreen ]  |
|                                                   |           |
|                                            (GSAP Warp 100%)   |
|                                                   v           |
|                                            [ PortfolioView ]  |
|                                                   |           |
|  [ Switch Partner/Trainer ] <---------------------+           |
+---------------------------------------------------------------+
```

### State Definitions
- `title`: Menampilkan background video, intro musik/suara, dan form login yang terhubung ke DummyJSON Auth API (`https://dummyjson.com/auth/login`). Pengunjung juga bisa langsung masuk secara instan tanpa memasukkan kredensial manual.
- `trainer-select`: Pemilihan 5 Maestro Champion (Ash Ketchum, Red, Cynthia, Leon, Steven Stone). Menyimpan data quote, regional badge, dan sprite karakter.
- `pokemon-select`: Pemilihan partner starter Pokémon (Pikachu, Charmander, Squirtle, Bulbasaur, Gengar). Menentukan warna tema dinamis seluruh web.
- `loading`: Layar transisi futuristik berbasis animasi GSAP dengan progress bar 0–100%.
- `portfolio`: Area utama portofolio interaktif yang mengaktifkan Three.js Canvas, Sidebar scroll-spy, dan 7 section konten.

---

## 3. Dynamic Theming Engine

Sistem tema dirancang secara reaktif melalui objek `PokemonCharacter.theme`:
```typescript
interface PokemonTheme {
  primary: string;      // Aksen warna utama (misal: Amber, Orange, Emerald, Azure, Purple)
  secondary: string;    // Warna penunjang border dan ring
  accent: string;       // Warna highlight dan hover
  bgGradient: string;   // Tailwind class gradient ambient background
  textColor: string;    // Warna teks kontras tinggi
}
```

Setiap perubahan partner Pokémon akan langsung memperbarui:
- Ambient glow dan lighting pada 3D Three.js Cyber Arena.
- Border neon, tag chips, dan button states.
- Background gradient seluruh halaman secara halus (`transition-colors duration-700`).

---

## 4. Three.js 3D Implementation Details (`Pokemon3DCanvas.tsx`)

### Komponen 3D Utama:
1. **Procedural Pokéball**:
   - Dibuat dengan geometri bawaan Three.js (`SphereGeometry` belahan atas merah, belahan bawah putih, `CylinderGeometry` sabuk hitam, dan `RingGeometry` tombol tengah).
   - Menggunakan `MeshStandardMaterial` dengan `roughness: 0.25` dan `metalness: 0.6` untuk efek kilau logam realistis.
   - Mengapung dengan kalkulasi sinus matematis: `position.y = Math.sin(time * 2) * 0.15`.
2. **Cyber Arena Stage**:
   - Panggung melingkar bertingkat dengan aksen grid wireframe emas/neon.
   - Dilengkapi cincin neon berputar searah jarum jam untuk memberikan kesan futuristik.
3. **Ambient Dust Particles**:
   - 200 titik partikel (`BufferGeometry`) dengan posisi acak yang melayang dan berputar lambat di sekitar objek panggung.
4. **Hologram Switcher (Sprite vs Foto Asli)**:
   - Terintegrasi tombol slider mini pada sisi kanan bawah canvas.
   - User dapat beralih antara pixel-art animasi Maestro Trainer Pokémon dan foto transparan Varel Galih Partiyano berresolusi tinggi (`/public/image/foto-saya.png`).
5. **Mouse Parallax**:
   - Event listener mousemove dengan normalisasi koordinat `(-1 s/d +1)`.
   - Menggerakkan rotasi group 3D secara proporsional dengan damping lembut (`lerp`).

---

## 5. Scroll-Spy Navigation Engine (`app/page.tsx` & `Sidebar.tsx`)

Untuk memastikan navigasi selalu akurat ketika pengguna melakukan scroll:
- Diterapkan `IntersectionObserver` native yang memantau elemen-elemen ID: `#hero`, `#about`, `#skills`, `#showreel`, `#projects`, `#experience`, dan `#contact`.
- Observer menggunakan threshold bertingkat `[0.1, 0.2, 0.3, 0.5, 0.7]` dengan margin `-10% 0px -10% 0px`.
- Mengkalkulasi rasio interseksi tertinggi sehingga active section otomatis berpindah ke section yang paling dominan di layar pengguna.
- Memiliki mekanisme pengaman saat navigasi diklik (`isManualScrollRef`), mencegah conflict antara auto-highlight dan smooth scrolling.

---

## 6. Real Content & Asset Mapping

| Section | Konten Utama | Sumber Asset Lokal |
| :--- | :--- | :--- |
| **Hero** | 3D Canvas, Title Headline, Quick CTA, Live Badges | `/public/videos/pokemon-intro.mp4`, `/public/image/foto-saya.png` |
| **About** | Dual Slide (Profil & My Hobby 3 Foto) | `/public/image/About-me.jpeg`, `/public/image/my hobby/` |
| **Skills** | 6 Kategori (Frontend, Mobile, UI/UX, Backend, Tools, Soft Skills) | Official SVG Devicons |
| **Showreel** | PDF Preview Deck 16:9 + Modal + Download | `/public/showrell/portfolio-varel.pdf` |
| **Projects** | 7 Quests (Tumbuh, Astra Daihatsu, 360 Tour, BRImo, Tel-U Career, Digital Sign, Inventory) | `/public/image/project/` (screenshot asli tiap proyek) |
| **Experience** | 4 Riwayat (Astra, Telkom, Lab Assistant, Teaching Assistant) | `/public/image/experience/` (foto dokumentasi kegiatan) |
| **Contact** | Direct Connect, Fast Form, Looping Gallery | `/public/image/contact/` |

---

## 7. Performance & Optimization Highlights

1. **Lightweight 3D Footprint**: Menghindari pemuatan file 3D `.gltf` atau `.glb` berukuran puluhan megabyte. Geometri dibangun secara prosedural sehingga First Contentful Paint (FCP) sangat cepat.
2. **Next.js Image Component**: Pemanfaatan `next/image` dengan properti `sizes`, `priority` untuk LCP images, dan automatic WebP optimization.
3. **Zero Layout Shift (CLS)**: Aspek rasio kontainer dan card telah dikunci dengan standar Tailwind aspect ratio dan min-height dinamis.
4. **Tailwind CSS v4 & Turbopack**: Kompilasi build modern yang menghasilkan bundle CSS sangat kecil dan performa runtime tinggi.

---

## 8. Deployment & CI/CD Pipeline

- **Platform**: Vercel Serverless Edge Network
- **Production URL**: [https://varel-about-me.vercel.app](https://varel-about-me.vercel.app)
- **CI/CD Triggers**: Git push otomatis ke branch `main` pada repository GitHub `Varelglh/creativox-challenge`.
- **Health Check**: Validasi TypeScript (`npx tsc --noEmit`) 100% bebas dari compile errors dan type warnings.
