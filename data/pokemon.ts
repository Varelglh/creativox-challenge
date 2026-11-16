export type PokemonType = 'electric' | 'fire' | 'water' | 'grass' | 'ghost';

export interface PokemonCharacter {
    id: string;
    name: string;
    type: PokemonType;
    japaneseName: string;
    pokedexNo: string;
    description: string;
    theme: {
        primary: string;
        secondary: string;
        accent: string;
        bgGradient: string;
        textColor: string;
    };
    modelPath?: string;
    spriteUrl: string;
}

export const POKEMON_LIST: PokemonCharacter[] = [
  {
    id: 'pikachu',
    name: 'Pikachu',
    type: 'electric',
    japaneseName: 'ピカチュウ',
    pokedexNo: '#025',
    description: 'When it smashes its cheeks together, electricity crackles.',
    theme: {
      primary: '#FBBF24',      // Amber/Yellow
      secondary: '#D97706',
      accent: '#FEF08A',
      bgGradient: 'from-amber-950 via-slate-900 to-black',
      textColor: '#FFFBEB',
    },
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  },
  {
    id: 'charmander',
    name: 'Charmander',
    type: 'fire',
    japaneseName: 'ヒトカゲ',
    pokedexNo: '#004',
    description: 'The flame on its tail indicates Charmander’s life force.',
    theme: {
      primary: '#F97316',      // Orange
      secondary: '#DC2626',
      accent: '#FFEDD5',
      bgGradient: 'from-orange-950 via-slate-900 to-black',
      textColor: '#FFF7ED',
    },
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  },
  {
    id: 'squirtle',
    name: 'Squirtle',
    type: 'water',
    japaneseName: 'ゼニガメ',
    pokedexNo: '#007',
    description: 'Shoots water at prey while in the water. Withdraws into its shell when in danger.',
    theme: {
      primary: '#0EA5E9',      // Ocean Sky Blue
      secondary: '#0284C7',
      accent: '#BAE6FD',
      bgGradient: 'from-sky-950 via-slate-900 to-black',
      textColor: '#F0F9FF',
    },
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
  },
  {
    id: 'bulbasaur',
    name: 'Bulbasaur',
    type: 'grass',
    japaneseName: 'フシギダネ',
    pokedexNo: '#001',
    description: 'For some time after its birth, it grows by gaining nourishment from the seed on its back.',
    theme: {
      primary: '#10B981',      // Emerald Green
      secondary: '#059669',
      accent: '#A7F3D0',
      bgGradient: 'from-emerald-950 via-slate-900 to-black',
      textColor: '#ECFDF5',
    },
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  {
    id: 'gengar',
    name: 'Gengar',
    type: 'ghost',
    japaneseName: 'ゲンガー',
    pokedexNo: '#094',
    description: 'It hides in shadows. It is said that if Gengar is hiding, the temperature drops by nearly 10 degrees.',
    theme: {
      primary: '#A855F7',      // Purple
      secondary: '#7E22CE',
      accent: '#F3E8FF',
      bgGradient: 'from-purple-950 via-slate-900 to-black',
      textColor: '#FAF5FF',
    },
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
  },
];