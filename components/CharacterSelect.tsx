// components/CharacterSelect.tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PokemonCharacter, POKEMON_LIST } from '@/data/pokemon';

interface CharacterSelectProps {
  selectedPokemon: PokemonCharacter;
  onSelectPokemon: (pokemon: PokemonCharacter) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export default function CharacterSelect({
  selectedPokemon,
  onSelectPokemon,
  onConfirm,
  onBack,
}: CharacterSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', force3D: true }
      );

      gsap.fromTo(
        '.gsap-pokemon-card',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
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
          ← Back to Trainers
        </button>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
          Choose Your Starter :
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300">
          Pick a Pokémon partner to customize your visual portfolio theme.
        </p>
      </div>

      {/* Main Selection Area: 5 Karakter (Tanpa Blur Berat) */}
      <div className="relative z-10 w-full max-w-4xl my-auto py-6">
        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap md:flex-nowrap">
          {POKEMON_LIST.map((pokemon) => {
            const isSelected = pokemon.id === selectedPokemon.id;

            return (
              <button
                key={pokemon.id}
                onClick={() => onSelectPokemon(pokemon)}
                className={`gsap-pokemon-card group relative flex flex-col items-center p-3 md:p-4 rounded-2xl transition-all duration-200 cursor-pointer will-change-transform ${
                  isSelected
                    ? 'scale-110 md:scale-125 z-20 bg-zinc-950/90 border-2'
                    : 'scale-90 opacity-80 hover:opacity-100 hover:scale-95 bg-zinc-950/60 border border-white/10'
                }`}
                style={{
                  borderColor: isSelected ? pokemon.theme.primary : 'rgba(255,255,255,0.1)',
                  boxShadow: isSelected ? `0 0 25px ${pokemon.theme.primary}55` : 'none',
                }}
              >
                <span className="text-[10px] font-mono tracking-wider text-zinc-400">
                  {pokemon.pokedexNo}
                </span>

                <div className="relative w-24 h-24 md:w-32 md:h-32 my-2 transition-transform duration-200 group-hover:-translate-y-1">
                  <Image
                    src={pokemon.spriteUrl}
                    alt={pokemon.name}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.7)]"
                    priority={isSelected}
                  />
                </div>

                <span className="text-sm md:text-base font-bold text-white capitalize">
                  {pokemon.name}
                </span>

                <span
                  className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full mt-1 font-mono"
                  style={{
                    backgroundColor: `${pokemon.theme.primary}22`,
                    color: pokemon.theme.primary,
                    border: `1px solid ${pokemon.theme.primary}55`,
                  }}
                >
                  {pokemon.type}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Pokemon Info Card */}
        <div className="mt-8 max-w-md mx-auto p-4 rounded-2xl bg-zinc-950/80 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-zinc-400">{selectedPokemon.japaneseName}</span>
            <span
              className="text-xs font-bold uppercase tracking-wider font-mono"
              style={{ color: selectedPokemon.theme.primary }}
            >
              Element: {selectedPokemon.type}
            </span>
          </div>
          <p className="text-xs text-zinc-300 italic">
            &ldquo;{selectedPokemon.description}&rdquo;
          </p>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {POKEMON_LIST.map((pokemon) => (
            <button
              key={pokemon.id}
              onClick={() => onSelectPokemon(pokemon)}
              className="h-2 rounded-full transition-all duration-200 cursor-pointer"
              style={{
                width: pokemon.id === selectedPokemon.id ? '24px' : '8px',
                backgroundColor:
                  pokemon.id === selectedPokemon.id
                    ? selectedPokemon.theme.primary
                    : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Select ${pokemon.name}`}
            />
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="relative z-10 pb-4">
        <button
          onClick={handleConfirm}
          className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
          style={{
            backgroundColor: selectedPokemon.theme.primary,
            color: '#000',
            boxShadow: `0 0 25px ${selectedPokemon.theme.primary}66`,
          }}
        >
          Choose {selectedPokemon.name} & Continue →
        </button>
      </div>
    </div>
  );
}