// data/trainers.ts

export interface TrainerMaster {
  id: string;
  name: string;
  japaneseName: string;
  title: string;
  region: string;
  quote: string;
  themeColor: string;
  avatarUrl: string;
  signaturePokemon: string;
}

export const TRAINER_LIST: TrainerMaster[] = [
  {
    id: 'ash',
    name: 'Ash Ketchum',
    japaneseName: 'サトシ (Satoshi)',
    title: 'World Coronation Monarch',
    region: 'Kanto / Pallet Town',
    quote: 'Never give up until it is over! Aim to be the greatest Pokémon Master.',
    themeColor: '#3B82F6', // Blue / Cap Red
    avatarUrl: 'https://play.pokemonshowdown.com/sprites/trainers/ash-capbackward.png',
    signaturePokemon: 'pikachu',
  },
  {
    id: 'red',
    name: 'Red',
    japaneseName: 'レッド (Red)',
    title: 'The Silent Living Legend',
    region: 'Kanto / Mt. Silver',
    quote: '... ... ... Words are not needed in a true Pokémon battle.',
    themeColor: '#EF4444', // Red
    avatarUrl: 'https://play.pokemonshowdown.com/sprites/trainers/red.png',
    signaturePokemon: 'charmander',
  },
  {
    id: 'cynthia',
    name: 'Cynthia',
    japaneseName: 'シロナ (Shirona)',
    title: 'Sinnoh League Champion',
    region: 'Sinnoh / Celestic Town',
    quote: 'When every life meets another life, something will be born.',
    themeColor: '#F59E0B', // Gold / Dark Coat
    avatarUrl: 'https://play.pokemonshowdown.com/sprites/trainers/cynthia-gen4.png',
    signaturePokemon: 'gengar',
  },
  {
    id: 'leon',
    name: 'Leon',
    japaneseName: 'ダンデ (Dande)',
    title: 'The Undefeated Champion',
    region: 'Galar / Postwick',
    quote: 'Let us have a champion time! We will show them a battle that fires up the whole stadium.',
    themeColor: '#8B5CF6', // Royal Purple
    avatarUrl: 'https://play.pokemonshowdown.com/sprites/trainers/leon.png',
    signaturePokemon: 'charmander',
  },
  {
    id: 'steven',
    name: 'Steven Stone',
    japaneseName: 'ダイゴ (Daigo)',
    title: 'Hoenn League Champion',
    region: 'Hoenn / Rustboro City',
    quote: 'Together with my beloved partners, we can triumph over any battle.',
    themeColor: '#06B6D4', // Steel Cyan
    avatarUrl: 'https://play.pokemonshowdown.com/sprites/trainers/steven.png',
    signaturePokemon: 'squirtle',
  },
];