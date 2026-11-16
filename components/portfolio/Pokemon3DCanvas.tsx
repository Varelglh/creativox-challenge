// components/portfolio/Pokemon3DCanvas.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Image from 'next/image';
import { PokemonCharacter } from '@/data/pokemon';
import { TrainerMaster } from '@/data/trainers';

interface Pokemon3DCanvasProps {
  activePokemon: PokemonCharacter;
  activeTrainer: TrainerMaster;
}

export default function Pokemon3DCanvas({ activePokemon, activeTrainer }: Pokemon3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // 0: Maestro Trainer Persona, 1: Real Varel (foto-saya.png)
  const [stageSlide, setStageSlide] = useState<0 | 1>(0);

  // Auto-slide ganti karakter setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setStageSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, & High-Performance Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const themeColor = new THREE.Color(activePokemon.theme.primary);
    const trainerColor = new THREE.Color(activeTrainer.themeColor);

    // 2. Pencahayaan Sinematik (Key Light, Fill Light, Rim Light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(3, 5, 4);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(themeColor, 4, 12);
    pointLight.position.set(0, 0.5, 2);
    scene.add(pointLight);

    // 3. Panggung 3D Futuristik (Cyber Battle Pedestal)
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Lantai Silinder Arena
    const floorGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.2, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -1.6;
    stageGroup.add(floor);

    // Cincin Neon Pembungkus Arena
    const neonRingGeo = new THREE.TorusGeometry(2.35, 0.04, 16, 64);
    const neonRingMat = new THREE.MeshBasicMaterial({ color: themeColor });
    const neonRing = new THREE.Mesh(neonRingGeo, neonRingMat);
    neonRing.rotation.x = Math.PI / 2;
    neonRing.position.y = -1.5;
    stageGroup.add(neonRing);

    // Cincin Grid Berputar di Lantai
    const gridRingGeo = new THREE.RingGeometry(1.2, 2.1, 32);
    const gridRingMat = new THREE.MeshBasicMaterial({
      color: themeColor,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const gridRing = new THREE.Mesh(gridRingGeo, gridRingMat);
    gridRing.rotation.x = -Math.PI / 2;
    gridRing.position.y = -1.48;
    stageGroup.add(gridRing);

    // 4. Pilar Cahaya Hologram Pemanggilan (Summoning Beam)
    const cylinderGeo = new THREE.CylinderGeometry(1.6, 2.0, 3.2, 32, 1, true);
    const cylinderMat = new THREE.MeshBasicMaterial({
      color: themeColor,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinder.position.y = 0;
    stageGroup.add(cylinder);

    // 5. Model 3D BOLA POKÉBALL ASLI (Three.js Mesh)
    const pokeballGroup = new THREE.Group();
    pokeballGroup.position.set(-1.6, 1.2, 0.5); // Melayang di kiri atas
    scene.add(pokeballGroup);

    // Belahan Merah Atas
    const topGeo = new THREE.SphereGeometry(0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const topMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.7,
      roughness: 0.25,
    });
    const topHemi = new THREE.Mesh(topGeo, topMat);
    pokeballGroup.add(topHemi);

    // Belahan Putih Bawah
    const botGeo = new THREE.SphereGeometry(0.42, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
    const botMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      metalness: 0.7,
      roughness: 0.25,
    });
    const botHemi = new THREE.Mesh(botGeo, botMat);
    pokeballGroup.add(botHemi);

    // Sabuk Hitam Tengah
    const bandGeo = new THREE.CylinderGeometry(0.425, 0.425, 0.08, 32);
    const bandMat = new THREE.MeshBasicMaterial({ color: 0x18181b });
    const band = new THREE.Mesh(bandGeo, bandMat);
    pokeballGroup.add(band);

    // Tombol Tengah Bercahaya
    const btnGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 32);
    const btnMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
    });
    const btn = new THREE.Mesh(btnGeo, btnMat);
    btn.rotation.x = Math.PI / 2;
    btn.position.z = 0.4;
    pokeballGroup.add(btn);

    // Cincin Orbit Mengitari Pokéball
    const ballOrbitGeo = new THREE.TorusGeometry(0.65, 0.015, 16, 48);
    const ballOrbitMat = new THREE.MeshBasicMaterial({
      color: themeColor,
      transparent: true,
      opacity: 0.7,
    });
    const ballOrbit = new THREE.Mesh(ballOrbitGeo, ballOrbitMat);
    pokeballGroup.add(ballOrbit);

    // 6. Sistem Partikel Badai Energi (Cyclone Particle System)
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 0.8 + Math.random() * 1.8;
      const angle = Math.random() * Math.PI * 2;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = -1.5 + Math.random() * 3.5;
      positions[i + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: themeColor,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    stageGroup.add(particles);

    // 7. Mouse Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.2;
      targetY = -y * 1.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Camera Parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 1.2;
      camera.position.y = 1.5 + mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      // Rotasi elemen panggung
      gridRing.rotation.z += 0.005;
      particles.rotation.y += 0.008;
      cylinder.rotation.y -= 0.004;

      // Animasi Bola 3D Pokéball: Mengapung & Berputar
      pokeballGroup.position.y = 1.2 + Math.sin(elapsedTime * 2) * 0.12;
      pokeballGroup.rotation.y += 0.015;
      pokeballGroup.rotation.z = Math.sin(elapsedTime * 1.5) * 0.15;
      ballOrbit.rotation.x += 0.03;
      ballOrbit.rotation.y += 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activePokemon, activeTrainer]);

  return (
    <div className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center group">
      {/* 1. Kanvas 3D Three.js Asli */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* 2. Mode Switcher di Kiri Atas Panggung (Maestro vs Real Varel) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-black/85 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-xl">
        <button
          onClick={() => setStageSlide(0)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
            stageSlide === 0
              ? 'bg-white/20 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
          style={{
            color: stageSlide === 0 ? activeTrainer.themeColor : undefined,
          }}
          title="Tampilkan Persona Maestro Trainer"
        >
          <span>✦</span>
          <span>Maestro</span>
        </button>
        <button
          onClick={() => setStageSlide(1)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
            stageSlide === 1
              ? 'bg-white/20 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
          style={{
            color: stageSlide === 1 ? activePokemon.theme.primary : undefined,
          }}
          title="Tampilkan Foto Asli Varel"
        >
          <span>✦</span>
          <span>Real Varel</span>
        </button>
      </div>

      {/* 3. Floating Battle Stats HUD di Kanan Atas */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1 pointer-events-none">
        <div
          className="px-3 py-1.5 rounded-xl bg-black/85 border shadow-xl backdrop-blur-md flex items-center gap-2"
          style={{ borderColor: activePokemon.theme.primary }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activePokemon.theme.primary }} />
          <span className="text-[11px] font-mono font-bold text-white capitalize">
            {activePokemon.name}
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
            Lv. 100 MASTER
          </span>
        </div>
        {/* HP Bar */}
        <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full rounded-full animate-pulse"
            style={{ width: '100%', backgroundColor: activePokemon.theme.primary }}
          />
        </div>
      </div>

      {/* 4. Quick Slide Arrow Buttons di Sisi Panggung */}
      <button
        onClick={() => setStageSlide((prev) => (prev === 0 ? 1 : 0))}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 flex items-center justify-center text-xs font-bold transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg opacity-60 group-hover:opacity-100"
        aria-label="Ganti Karakter Panggung"
      >
        ‹
      </button>

      <button
        onClick={() => setStageSlide((prev) => (prev === 0 ? 1 : 0))}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 flex items-center justify-center text-xs font-bold transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-lg opacity-60 group-hover:opacity-100"
        aria-label="Ganti Karakter Panggung"
      >
        ›
      </button>

      {/* 5. Duo Karakter Berdiri Kokoh di Atas Panggung 3D */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-auto">
        {/* Karakter Kiri: Slide 0 (Maestro Trainer) vs Slide 1 (Real Varel - foto-saya.png) */}
        {stageSlide === 0 ? (
          <div
            onClick={() => setStageSlide(1)}
            className="absolute left-6 bottom-16 md:bottom-20 w-32 h-32 md:w-40 md:h-40 z-10 transition-transform duration-300 hover:scale-110 group cursor-pointer animate-in fade-in zoom-in-95 duration-500"
            title="Klik untuk beralih ke Foto Real Varel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeTrainer.avatarUrl}
              alt={activeTrainer.name}
              className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.9)] filter brightness-105"
            />
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold whitespace-nowrap border shadow-xl flex items-center gap-1"
              style={{
                backgroundColor: 'rgba(9,9,11,0.9)',
                borderColor: activeTrainer.themeColor,
                color: activeTrainer.themeColor,
              }}
            >
              <span>{activeTrainer.name}</span>
              <span className="text-[8px] opacity-70">⇄</span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setStageSlide(0)}
            className="absolute left-4 bottom-14 md:bottom-18 w-36 h-38 md:w-44 md:h-46 z-10 transition-transform duration-300 hover:scale-110 group cursor-pointer animate-in fade-in zoom-in-95 duration-500"
            title="Klik untuk beralih ke Maestro Trainer"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/image/foto-saya.png"
                alt="Varel Galih Partiyano"
                fill
                sizes="(max-width: 768px) 144px, 176px"
                className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.95)] filter brightness-105"
                priority
              />
            </div>
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold whitespace-nowrap border shadow-xl flex items-center gap-1"
              style={{
                backgroundColor: 'rgba(9,9,11,0.9)',
                borderColor: activePokemon.theme.primary,
                color: activePokemon.theme.primary,
              }}
            >
              <span>Varel Galih P.</span>
              <span className="text-[8px] opacity-70">⇄</span>
            </div>
          </div>
        )}

        {/* Pokémon Partner di Sisi Kanan Depan */}
        <div className="absolute right-4 bottom-12 md:bottom-16 w-44 h-44 md:w-56 md:h-56 z-20 transition-transform duration-300 hover:scale-110 cursor-pointer">
          <Image
            src={activePokemon.spriteUrl}
            alt={activePokemon.name}
            fill
            priority
            sizes="(max-width: 768px) 176px, 224px"
            className="object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.95)] animate-pulse"
            style={{ animationDuration: '3.5s' }}
          />
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[9px] font-mono font-bold whitespace-nowrap border shadow-xl uppercase"
            style={{
              backgroundColor: 'rgba(9,9,11,0.9)',
              borderColor: activePokemon.theme.primary,
              color: activePokemon.theme.primary,
            }}
          >
            {activePokemon.name} ({activePokemon.type})
          </div>
        </div>
      </div>

      {/* 6. Banner Panggung di Bawah */}
      <div
        className="absolute bottom-1 px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border backdrop-blur-md z-30 shadow-2xl flex items-center gap-2"
        style={{
          borderColor: activePokemon.theme.primary,
          color: activePokemon.theme.primary,
          backgroundColor: 'rgba(9,9,11,0.85)',
          boxShadow: `0 0 20px ${activePokemon.theme.primary}44`,
        }}
      >
        {stageSlide === 0 ? (
          <span>✦ CYBER ARENA STAGE • {activeTrainer.region.split('/')[0]} CHAMPION & {activePokemon.name.toUpperCase()} ✦</span>
        ) : (
          <span>✦ CYBER ARENA STAGE • VAREL & {activePokemon.name.toUpperCase()} (CANDIDATE) ✦</span>
        )}
      </div>

      {/* 7. Slide Indicator Dots di Bawah Banner */}
      <div className="absolute -bottom-5 flex items-center gap-1.5 z-30">
        <button
          onClick={() => setStageSlide(0)}
          className="h-1 rounded-full transition-all cursor-pointer"
          style={{
            width: stageSlide === 0 ? '18px' : '6px',
            backgroundColor:
              stageSlide === 0 ? activeTrainer.themeColor : 'rgba(255,255,255,0.25)',
          }}
          aria-label="Slide 1: Maestro Trainer"
        />
        <button
          onClick={() => setStageSlide(1)}
          className="h-1 rounded-full transition-all cursor-pointer"
          style={{
            width: stageSlide === 1 ? '18px' : '6px',
            backgroundColor:
              stageSlide === 1 ? activePokemon.theme.primary : 'rgba(255,255,255,0.25)',
          }}
          aria-label="Slide 2: Real Varel"
        />
      </div>
    </div>
  );
}