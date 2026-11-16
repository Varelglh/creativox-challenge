// components/TrainersSelect.tsx
'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TrainerMaster, TRAINER_LIST } from '@/data/trainers';

interface TrainerSelectProps {
  selectedTrainer: TrainerMaster;
  onSelectTrainer: (trainer: TrainerMaster) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export default function TrainerSelect({
  selectedTrainer,
  onSelectTrainer,
  onConfirm,
  onBack,
}: TrainerSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', force3D: true }
      );

      gsap.fromTo(
        '.gsap-trainer-card',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.06,
          ease: 'power2.out',
          force3D: true,
        }
      );
    },
    { scope: containerRef }
  );

  const handleBack = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.25,
      ease: 'power2.inOut',
      force3D: true,
      onComplete: onBack,
    });
  };

  const handleConfirm = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.inOut',
      force3D: true,
      onComplete: onConfirm,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-between py-10 px-4 text-center overflow-hidden z-10 will-change-transform"
    >
      {/* Header */}
      <div className="relative z-10 space-y-2">
        <button
          onClick={handleBack}
          className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10"
        >
          ← Back to Title
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
          Choose Your Maestro Trainer :
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          Select a legendary Pokémon Master champion persona to guide your journey.
        </p>
      </div>

      {/* 5 Trainer Cards dengan Gambar Karakter Asli */}
      <div className="relative z-10 w-full max-w-5xl my-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {TRAINER_LIST.map((trainer) => {
            const isSelected = trainer.id === selectedTrainer.id;

            return (
              <button
                key={trainer.id}
                onClick={() => onSelectTrainer(trainer)}
                className={`gsap-trainer-card group relative flex flex-col items-center p-4 rounded-2xl transition-all duration-200 cursor-pointer will-change-transform text-center ${
                  isSelected
                    ? 'scale-105 z-20 bg-zinc-950/95 border-2 shadow-2xl'
                    : 'scale-95 opacity-80 hover:opacity-100 hover:scale-100 bg-zinc-950/60 border border-white/10'
                }`}
                style={{
                  borderColor: isSelected ? trainer.themeColor : 'rgba(255,255,255,0.1)',
                  boxShadow: isSelected ? `0 0 25px ${trainer.themeColor}55` : 'none',
                }}
              >
                {/* Region Tag */}
                <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase">
                  {trainer.region.split('/')[0]}
                </span>

                {/* Gambar Karakter Sprite Asli */}
                <div
                  className="relative w-24 h-24 my-2 flex items-center justify-center rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-110"
                  style={{
                    backgroundColor: `${trainer.themeColor}12`,
                    border: `1px solid ${trainer.themeColor}33`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trainer.avatarUrl}
                    alt={trainer.name}
                    className="w-20 h-20 object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)]"
                  />
                </div>

                {/* Trainer Name */}
                <span className="text-sm md:text-base font-bold text-white block">
                  {trainer.name}
                </span>

                {/* Trainer Title */}
                <span
                  className="text-[9px] font-mono px-2 py-0.5 rounded-full mt-1.5 line-clamp-1"
                  style={{
                    backgroundColor: `${trainer.themeColor}15`,
                    color: trainer.themeColor,
                    border: `1px solid ${trainer.themeColor}44`,
                  }}
                >
                  {trainer.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Trainer Detail Quote Card */}
        <div className="mt-8 max-w-lg mx-auto p-4 rounded-2xl bg-zinc-950/80 border border-white/10 shadow-xl text-center space-y-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">{selectedTrainer.japaneseName}</span>
            <span style={{ color: selectedTrainer.themeColor }} className="font-bold">
              {selectedTrainer.title}
            </span>
          </div>
          <p className="text-xs text-zinc-300 italic pt-1 leading-relaxed">
            &ldquo;{selectedTrainer.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="relative z-10 pb-4">
        <button
          onClick={handleConfirm}
          className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
          style={{
            backgroundColor: selectedTrainer.themeColor,
            color: '#000',
            boxShadow: `0 0 25px ${selectedTrainer.themeColor}66`,
          }}
        >
          Confirm Maestro {selectedTrainer.name} & Choose Partner →
        </button>
      </div>
    </div>
  );
}