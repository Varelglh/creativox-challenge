// app/page.tsx
'use client';

import { useState } from 'react';
import { POKEMON_LIST, PokemonCharacter } from '@/data/pokemon';
import { TRAINER_LIST, TrainerMaster } from '@/data/trainers';
import TitleScreen, { TrainerUser } from '@/components/TitleScreen';
import TrainerSelect from '@/components/TrainersSelect';
import CharacterSelect from '@/components/CharacterSelect';
import LoadingScreen from '@/components/LoadingScreen';
import Sidebar from '@/components/portfolio/Sidebar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ShowreelSection from '@/components/portfolio/ShowreelSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ContactSection from '@/components/portfolio/ContactSection';
import SkillsSection from '@/components/portfolio/SkillsSection';

type GameState = 'title' | 'trainer-select' | 'pokemon-select' | 'loading' | 'portfolio';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('title');
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerMaster>(TRAINER_LIST[0]); // Default: Ash Ketchum
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonCharacter>(POKEMON_LIST[0]); // Default: Pikachu
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentUser, setCurrentUser] = useState<TrainerUser | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-b ${selectedPokemon.theme.bgGradient} transition-colors duration-700 text-white selection:bg-white selection:text-black`}
    >
      {/* PERSISTENT VIDEO BACKGROUND */}
      {gameState !== 'portfolio' && (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/pokemon-intro.mp4" type="video/mp4" />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-bright-neon-tunnel-movement-41481-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        </div>
      )}

      {/* 1. Layar Title Screen */}
      {gameState === 'title' && (
        <TitleScreen
          activePokemon={selectedPokemon}
          onStart={(user) => {
            if (user) setCurrentUser(user);
            setGameState('trainer-select'); // Pindah ke pilih Trainer
          }}
        />
      )}

      {/* 2. Layar Pilih Maestro Trainer */}
      {gameState === 'trainer-select' && (
        <TrainerSelect
          selectedTrainer={selectedTrainer}
          onSelectTrainer={(trainer) => setSelectedTrainer(trainer)}
          onConfirm={() => setGameState('pokemon-select')} // Lanjut ke pilih Pokémon
          onBack={() => setGameState('title')}
        />
      )}

      {/* 3. Layar Pilih Pokémon Partner */}
      {gameState === 'pokemon-select' && (
        <CharacterSelect
          selectedPokemon={selectedPokemon}
          onSelectPokemon={(pokemon) => setSelectedPokemon(pokemon)}
          onConfirm={() => setGameState('loading')} // Lanjut ke Loading
          onBack={() => setGameState('trainer-select')}
        />
      )}

      {/* 4. Layar Loading GSAP */}
      {gameState === 'loading' && (
        <LoadingScreen
          selectedPokemon={selectedPokemon}
          selectedTrainer={selectedTrainer}
          onComplete={() => setGameState('portfolio')}
        />
      )}
      {/* 5. Layar Main Portfolio Lengkap */}
      {gameState === 'portfolio' && (
        <div className="relative w-full z-10">
          <Sidebar
            activePokemon={selectedPokemon}
            activeTrainer={selectedTrainer}
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onChangeTrainer={() => setGameState('trainer-select')}
            onChangePokemon={() => setGameState('pokemon-select')}
            user={currentUser}
          />
          <div className="md:pl-52">
            <HeroSection
              activePokemon={selectedPokemon}
              activeTrainer={selectedTrainer}
              onNavigate={handleNavigate}
            />
            <AboutSection activePokemon={selectedPokemon} activeTrainer={selectedTrainer} />
            <SkillsSection activePokemon={selectedPokemon} />   
            <ShowreelSection activePokemon={selectedPokemon} />
            <ProjectsSection activePokemon={selectedPokemon} />
            <ExperienceSection activePokemon={selectedPokemon} />
            <ContactSection activePokemon={selectedPokemon} />
            <div className="py-8 text-center border-t border-white/5">
              <button
                onClick={() => setGameState('trainer-select')}
                className="px-6 py-2.5 rounded-full text-xs font-mono border border-white/20 bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
              >
                ← Switch Maestro Trainer & Pokémon Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};