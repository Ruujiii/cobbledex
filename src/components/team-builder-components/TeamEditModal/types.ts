export type PokemonTypeValue = 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice' | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

export type Nature = 'Adamant' | 'Bashful' | 'Bold' | 'Brave' | 'Calm' | 'Careful' | 'Docile' | 'Gentle' | 'Hardy' | 'Hasty' | 'Impish' | 'Jolly' | 'Lax' | 'Lonely' | 'Mild' | 'Modest' | 'Naive' | 'Naughty' | 'Quiet' | 'Quirky' | 'Rash' | 'Relaxed' | 'Sassy' | 'Serious' | 'Timid';

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonMove {
  level: number;
  move: string;
  type: PokemonTypeValue;
  category: 'Physical' | 'Special' | 'Status';
  power: number | '--';
  accuracy: number | '--';
  pp: number;
}

export interface PokemonTeamMember {
  id: number;
  name: string;
  ability: string;
  nature: Nature;
  level: number;
  moveset: PokemonMove[];
  evs: Stats;
  ivs: Stats;
}

export interface PokemonData {
  id: number;
  name: string;
  types: PokemonTypeValue[];
  abilities: string[];
  baseStats: Stats;
  image?: string;
  learnset?: PokemonMove[];
}

export interface Team {
  name: string;
  pokemon: PokemonTeamMember[];
}