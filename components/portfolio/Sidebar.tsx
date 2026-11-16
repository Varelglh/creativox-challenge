// components/portfolio/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PokemonCharacter } from '@/data/pokemon';
import { TrainerMaster } from '@/data/trainers';
import { TrainerUser } from '@/components/TitleScreen';

interface SidebarProps {
  activePokemon: PokemonCharacter;
  activeTrainer: TrainerMaster;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onChangePokemon: () => void;
  onChangeTrainer: () => void;
  user?: TrainerUser | null;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },      
  { id: 'showreel', label: 'Showreel' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Sidebar({
  activePokemon,
  activeTrainer,
  activeSection,
  onNavigate,
  onChangePokemon,
  onChangeTrainer,
  user,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMobileClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. DESKTOP SIDEBAR (Kiri Layar) */}
      {/* ========================================================= */}
      <aside
        className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col w-48 p-3 rounded-3xl bg-zinc-950/90 border border-white/15 shadow-2xl transition-all duration-300 gap-2"
        style={{
          boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 25px ${activePokemon.theme.primary}15`,
        }}
      >
        {/* KARTU 1: MAESTRO TRAINER (Terpisah) */}
        <button
          onClick={onChangeTrainer}
          title="Klik untuk ganti Maestro Trainer"
          className="group w-full flex items-center gap-2.5 p-2 rounded-2xl transition-all duration-200 hover:bg-white/10 cursor-pointer text-left"
          style={{
            border: `1px solid ${activeTrainer.themeColor}44`,
            backgroundColor: `${activeTrainer.themeColor}12`,
          }}
        >
          <div className="relative w-8 h-8 flex-shrink-0 transition-transform group-hover:scale-110">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeTrainer.avatarUrl}
              alt={activeTrainer.name}
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold text-white block truncate">
              {activeTrainer.name}
            </span>
            <span
              className="text-[9px] font-mono uppercase tracking-wider block"
              style={{ color: activeTrainer.themeColor }}
            >
              Trainer ↺
            </span>
          </div>
        </button>

        {/* KARTU 2: POKÉDEX PARTNER (Terpisah) */}
        <button
          onClick={onChangePokemon}
          title="Klik untuk ganti Pokémon Partner"
          className="group w-full flex items-center gap-2.5 p-2 rounded-2xl transition-all duration-200 hover:bg-white/10 cursor-pointer text-left"
          style={{
            border: `1px solid ${activePokemon.theme.primary}44`,
            backgroundColor: `${activePokemon.theme.primary}12`,
          }}
        >
          <div className="relative w-8 h-8 flex-shrink-0 transition-transform group-hover:scale-110">
            <Image
              src={activePokemon.spriteUrl}
              alt={activePokemon.name}
              fill
              sizes="32px"
              className="object-contain drop-shadow"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold text-white capitalize block truncate">
              {activePokemon.name}
            </span>
            <span
              className="text-[9px] font-mono uppercase tracking-wider block"
              style={{ color: activePokemon.theme.primary }}
            >
              Pokédex ↺
            </span>
          </div>
        </button>

        {/* Garis Pemisah */}
        <div className="w-full h-px bg-white/10 my-1" />

        {/* Menu Navigasi Vertikal */}
        <nav className="flex flex-col gap-1 w-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer text-left"
                style={{
                  backgroundColor: isActive ? activePokemon.theme.primary : 'transparent',
                  color: isActive ? '#000' : '#A1A1AA',
                  boxShadow: isActive ? `0 0 15px ${activePokemon.theme.primary}44` : 'none',
                }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isActive ? 'bg-black' : 'bg-zinc-600'
                  }`}
                />
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Info Trainer Rank di Bagian Bawah */}
        <div className="w-full h-px bg-white/10 my-1" />
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: activeTrainer.themeColor }}
            />
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
              {activeTrainer.region.split('/')[0]} Champion
            </span>
          </div>
          <span className="text-[10px] font-bold text-white block truncate">
            {activeTrainer.title}
          </span>
        </div>

        {/* Badge User dari API Login */}
        {user && (
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30">
            <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={user.image}
                alt={user.username}
                fill
                sizes="20px"
                className="object-cover"
              />
            </div>
            <span className="text-[9px] font-mono text-emerald-400 truncate">
              ● {user.firstName}
            </span>
          </div>
        )}
      </aside>

      {/* ========================================================= */}
      {/* 2. MOBILE FLOATING MENU BUTTON */}
      {/* ========================================================= */}
      <div className="fixed top-5 right-5 z-50 md:hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl transition-all transform active:scale-95 cursor-pointer border border-white/20"
          style={{
            backgroundColor: activePokemon.theme.primary,
            color: '#000',
            boxShadow: `0 0 20px ${activePokemon.theme.primary}66`,
          }}
          aria-label="Toggle Menu"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeTrainer.avatarUrl}
            alt={activeTrainer.name}
            className="w-5 h-5 object-contain"
          />
          <span>{isMobileOpen ? 'Close ✕' : 'Menu ☰'}</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 3. MOBILE POP-UP MODAL (Center) */}
      {/* ========================================================= */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div
            className="w-full max-w-xs sm:max-w-sm rounded-3xl p-6 bg-zinc-950 border border-white/20 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: `0 0 50px ${activePokemon.theme.primary}33`,
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Battle Navigation
              </span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Dua Kartu Terpisah di Mobile */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onChangeTrainer();
                }}
                className="flex flex-col items-center p-2.5 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeTrainer.avatarUrl}
                  alt={activeTrainer.name}
                  className="w-8 h-8 object-contain mb-1"
                />
                <span className="text-[11px] font-bold text-white truncate w-full">
                  {activeTrainer.name}
                </span>
                <span className="text-[9px] font-mono text-zinc-400">Trainer ↺</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onChangePokemon();
                }}
                className="flex flex-col items-center p-2.5 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer"
              >
                <div className="relative w-8 h-8 mb-1">
                  <Image
                    src={activePokemon.spriteUrl}
                    alt={activePokemon.name}
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold text-white capitalize truncate w-full">
                  {activePokemon.name}
                </span>
                <span className="text-[9px] font-mono text-zinc-400">Pokédex ↺</span>
              </button>
            </div>

            {/* List Menu */}
            <nav className="flex flex-col gap-1.5 pt-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMobileClick(item.id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left"
                    style={{
                      backgroundColor: isActive ? activePokemon.theme.primary : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#000' : '#fff',
                      border: isActive
                        ? `1px solid ${activePokemon.theme.primary}`
                        : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-60">→</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}