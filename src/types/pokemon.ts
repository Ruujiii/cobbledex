import { allSpawnLocations } from '../components/pokedex-components/PokemonDetailModal/pokemonSpawnLocations';
import { allPokemonRegions } from '../components/pokedex-components/PokemonDetailModal/pokemonRegions';

export type PokemonTypeValue = "Normal" | "Fire" | "Water" | "Electric" | "Grass" | "Ice" | "Fighting" | "Poison" | "Ground" | "Flying" | "Psychic" | "Bug" | "Rock" | "Ghost" | "Dragon" | "Dark" | "Steel" | "Fairy";
export type Nature = 'Adamant' | 'Bashful' | 'Bold' | 'Brave' | 'Calm' | 'Careful' | 'Docile' | 'Gentle' | 'Hardy' | 'Hasty' | 'Impish' | 'Jolly' | 'Lax' | 'Lonely' | 'Mild' | 'Modest' | 'Naive' | 'Naughty' | 'Quiet' | 'Quirky' | 'Rash' | 'Relaxed' | 'Sassy' | 'Serious' | 'Timid';
export type PokemonRegion = typeof allPokemonRegions[number];
export type PokemonSpawnLocation = typeof allSpawnLocations[number];

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;

}

export interface EvolutionData {
  stage: number;
  name: string;
  image?: string;
  types: PokemonTypeValue[];
  evolutionMethod: string;
}

export interface PokemonData {
  id: number;
  name: string;
  types: PokemonTypeValue[];
  image?: string;
  shinyImage?: string;
  abilities: string[];
  levelingRate?: string;
  evYield?: string;
  eggGroup?: string;
  catchRate?: number;
  pokedexEntry?: string;
  spawnLocation?: PokemonSpawnLocation[];
  region?: PokemonRegion;
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  typeEffectiveness?: {
    [key in PokemonTypeValue]?: number;
  };
  learnset?: {
    level: number;
    move: string;
    type: PokemonTypeValue;
    category: 'Physical' | 'Special' | 'Status';
    power: number | '--';
    accuracy: number | '--';
    pp: number;
  }[];
  evolutionData?: EvolutionData[];
}

export interface PokemonMove {
  move: string
  type: PokemonTypeValue
  category: 'Physical' | 'Special' | 'Status'
  power: number
  accuracy: number
  pp: number
}

export interface PokemonTeamMember {
  id: number
  name: string
  ability: string
  nature: Nature
  level: number
  moveset: PokemonMove[]
  evs: Stats
  ivs: Stats
}

export interface Team {
  id: string;
  name: string;
  pokemon: PokemonTeamMember[];
}