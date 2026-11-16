// components/TitleScreen.tsx
'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { PokemonCharacter } from '@/data/pokemon';

export interface TrainerUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  accessToken: string;
}

interface TitleScreenProps {
  onStart: (user?: TrainerUser) => void;
  activePokemon: PokemonCharacter;
}

const ELEMENT_BADGES = [
  { name: 'Electric', icon: '⚡', color: '#FBBF24' },
  { name: 'Fire', icon: '🔥', color: '#F97316' },
  { name: 'Water', icon: '💧', color: '#0EA5E9' },
  { name: 'Grass', icon: '🍃', color: '#10B981' },
  { name: 'Ghost', icon: '👻', color: '#A855F7' },
];

export default function TitleScreen({ onStart, activePokemon }: TitleScreenProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const animateTransitionOut = (userData?: TrainerUser) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.92,
        y: -20,
        duration: 0.35,
        ease: 'power2.inOut',
        force3D: true, // Hardware Acceleration
        onComplete: () => {
          onStart(userData);
        },
      });
    } else {
      onStart(userData);
    }
  };

  const handleLogin = async (e?: React.FormEvent, customUser?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const loginPayload = {
      username: customUser || username,
      password: customPass || password,
    };

    try {
      const response = await fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed, please check your credentials');
      }

      setShowLoginModal(false);
      animateTransitionOut(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to connect to authentication server');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePlayDemo = () => {
    handleLogin(undefined, 'emilys', 'emilyspass');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 text-center z-10">
      {/* Kartu Utama Tanpa Backdrop-Blur Berat (Super Ringan & 60 FPS) */}
      <div
        ref={cardRef}
        className="relative z-10 max-w-2xl w-full rounded-3xl p-6 sm:p-8 md:p-10 bg-zinc-950/85 border border-white/15 shadow-2xl flex flex-col items-center gap-5 transition-all duration-300 overflow-hidden will-change-transform"
        style={{
          boxShadow: `0 20px 60px rgba(0,0,0,0.9), 0 0 30px ${activePokemon.theme.primary}20`,
        }}
      >
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/20" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/20" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/20" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/20" />

        <div className="flex flex-col items-center gap-2">
          <div
            className="w-10 h-10 rounded-full p-1 border transition-transform duration-500 hover:rotate-180 cursor-pointer shadow-md"
            style={{
              borderColor: activePokemon.theme.primary,
              boxShadow: `0 0 15px ${activePokemon.theme.primary}55`,
              backgroundColor: '#18181b',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="46" fill="#18181b" stroke="#fff" strokeWidth="4" />
              <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill={activePokemon.theme.primary} />
              <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#ffffff" />
              <rect x="4" y="46" width="92" height="8" fill="#18181b" />
              <circle cx="50" cy="50" r="14" fill="#18181b" />
              <circle cx="50" cy="50" r="8" fill="#ffffff" />
            </svg>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full border border-white/20 bg-zinc-900/80 text-zinc-300">
            Interactive Portfolio • Open New Challenge
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md leading-tight">
            MY POKÉMON <br />
            <span
              className="text-transparent bg-clip-text transition-colors duration-500"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff, ${activePokemon.theme.primary}, ${activePokemon.theme.accent})`,
              }}
            >
              WEBSITE
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed pt-1">
            Experience my creative developer journey like an RPG adventure.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          {ELEMENT_BADGES.map((elem) => (
            <div
              key={elem.name}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-white/10 text-[10px] font-mono font-bold tracking-wider uppercase transition-transform hover:scale-105 cursor-default"
            >
              <span>{elem.icon}</span>
              <span style={{ color: elem.color }}>{elem.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-1">
          <button
            onClick={handlePlayDemo}
            disabled={loading}
            className="group relative px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            style={{
              backgroundColor: activePokemon.theme.primary,
              color: '#000',
              boxShadow: `0 0 20px ${activePokemon.theme.primary}55`,
            }}
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            {loading ? 'Authenticating...' : 'Play Demo Account'}
          </button>

          <button
            onClick={() => setShowLoginModal(true)}
            className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider border border-white/20 bg-zinc-900/80 hover:bg-zinc-800 text-white transition-all cursor-pointer"
          >
            Manual Login ⚙
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Auth API: dummyjson.com/user/login</span>
        </div>
      </div>

      {/* Modal Dialog Form Login */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="relative w-full max-w-sm rounded-3xl p-6 bg-zinc-900 border border-white/20 shadow-2xl text-left space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span
                  className="text-[10px] font-mono uppercase tracking-widest font-bold"
                  style={{ color: activePokemon.theme.primary }}
                >
                  Trainer Passport
                </span>
                <h3 className="text-lg font-black text-white">Login to Pokédex</h3>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-zinc-400 hover:text-white text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400">Username :</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-white/40 font-mono"
                  placeholder="e.g. emilys"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400">Password :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-white/40 font-mono"
                  placeholder="e.g. emilyspass"
                  required
                />
              </div>

              <div className="text-[10px] font-mono text-zinc-500">
                Demo: <code className="text-zinc-300">emilys</code> / <code className="text-zinc-300">emilyspass</code>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
                style={{
                  backgroundColor: activePokemon.theme.primary,
                  color: '#000',
                }}
              >
                {loading ? 'Authenticating Trainer...' : 'Confirm Login →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}