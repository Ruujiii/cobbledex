import { PokemonTypeValue } from '../PokemonType'
import { PokemonSpawnLocation } from './pokemonSpawnLocations'

export interface EvolutionData {
  stage: number
  name: string
  image?: string
  types: PokemonTypeValue[]
  evolutionMethod: string
}

export interface PokemonDetailProps {
    id: number
    name: string
    types: PokemonTypeValue[]
    image?: string
    shinyImage?: string
    abilities?: string[]
    levelingRate?: string
    evYield?: string
    eggGroup?: string
    catchRate?: number
    pokedexEntry?: string
    spawnLocations?: PokemonSpawnLocation[]
    region?: string
    baseStats?: {
      hp?: number
      attack?: number
      defense?: number
      specialAttack?: number
      specialDefense?: number
      speed?: number
    }
    typeEffectiveness?: {
      [key in PokemonTypeValue]?: number
    }
    learnset?: {
      level: number
      move: string
      type: PokemonTypeValue
      category: 'Physical' | 'Special' | 'Status'
      power: number | '--'
      accuracy: number | '--'
      pp: number
    }[]
    evolutionData?: EvolutionData[]
    isOpen: boolean
    onClose: () => void
    onSelectPokemon: (pokemonName: string) => void
    availablePokemon: string[]
  }