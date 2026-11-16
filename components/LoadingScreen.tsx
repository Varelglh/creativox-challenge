// components/LoadingScreen.tsx
'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PokemonCharacter } from '@/data/pokemon';
import { TrainerMaster } from '@/data/trainers';

interface LoadingScreenProps {
  selectedPokemon: PokemonCharacter;
  selectedTrainer?: TrainerMaster;
  onComplete: () => void;
}

export default function LoadingScreen({
  selectedPokemon,
  selectedTrainer,
  onComplete,
}: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spriteGroupRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Syncing Pokédex database...');

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.98,
            duration: 0.45,
            ease: 'power2.inOut',
            onComplete: onComplete,
          });
        },
      });

      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 2.2,
        ease: 'power1.inOut',
        onUpdate: () => {
          const currentVal = Math.round(progressObj.value);
          setProgress(currentVal);

          if (currentVal > 75) {
            setStatusText(
              `Entering Battle Arena with ${selectedTrainer?.name || 'Trainer'} & ${selectedPokemon.name}...`
            );
          } else if (currentVal > 40) {
            setStatusText("Loading Varel's Projects, Skills & Battle Stats...");
          }
        },
      });

      // Efek membal (running bounce)
      gsap.to(spriteGroupRef.current, {
        y: -6,
        duration: 0.22,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden z-10"
    >
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        <div className="space-y-1">
          <h3 className="text-2xl md:text-3xl font-black tracking-wide text-white">
            Loading Adventure :
          </h3>
          <p className="text-xs font-mono text-zinc-300">
            {statusText} ({progress}%)
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full">
          {/* Duo Trainer & Pokémon Berlari Bersama */}
          <div
            ref={spriteGroupRef}
            className="absolute -top-14 transition-all duration-75 pointer-events-none -translate-x-1/2 flex items-end gap-1"
            style={{ left: `${progress}%` }}
          >
            {/* Trainer Sprite */}
            {selectedTrainer && (
              <div className="relative w-10 h-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedTrainer.avatarUrl}
                  alt={selectedTrainer.name}
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
            )}
            {/* Pokémon Sprite */}
            <div className="relative w-11 h-11">
              <Image
                src={selectedPokemon.spriteUrl}
                alt={selectedPokemon.name}
                fill
                sizes="44px"
                className="object-contain drop-shadow"
              />
            </div>
          </div>

          {/* Bar Background */}
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-75 shadow-sm"
              style={{
                width: `${progress}%`,
                backgroundColor: selectedPokemon.theme.primary,
                boxShadow: `0 0 14px ${selectedPokemon.theme.primary}`,
              }}
            />
          </div>
        </div>

        <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
          Maestro Link Established • 60 FPS Engine
        </span>
      </div>
    </div>
  );
}