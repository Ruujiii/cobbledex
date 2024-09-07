import { Nature, Stats, PokemonTypeValue } from '../../../types/pokemon'

export const calculateStat = (base: number, iv: number, ev: number, level: number, nature: number, isHP: boolean): number => {
  if (isHP) {
    return Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10
  }
  return Math.floor((Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5) * nature)
}

export const natureEffects: Record<Nature, { increase?: keyof Stats; decrease?: keyof Stats }> = {
  Adamant: { increase: 'attack', decrease: 'specialAttack' },
  Bashful: {},
  Bold: { increase: 'defense', decrease: 'attack' },
  Brave: { increase: 'attack', decrease: 'speed' },
  Calm: { increase: 'specialDefense', decrease: 'attack' },
  Careful: { increase: 'specialDefense', decrease: 'specialAttack' },
  Docile: {},
  Gentle: { increase: 'specialDefense', decrease: 'defense' },
  Hardy: {},
  Hasty: { increase: 'speed', decrease: 'defense' },
  Impish: { increase: 'defense', decrease: 'specialAttack' },
  Jolly: { increase: 'speed', decrease: 'specialAttack' },
  Lax: { increase: 'defense', decrease: 'specialDefense' },
  Lonely: { increase: 'attack', decrease: 'defense' },
  Mild: { increase: 'specialAttack', decrease: 'defense' },
  Modest: { increase: 'specialAttack', decrease: 'attack' },
  Naive: { increase: 'speed', decrease: 'specialDefense' },
  Naughty: { increase: 'attack', decrease: 'specialDefense' },
  Quiet: { increase: 'specialAttack', decrease: 'speed' },
  Quirky: {},
  Rash: { increase: 'specialAttack', decrease: 'specialDefense' },
  Relaxed: { increase: 'defense', decrease: 'speed' },
  Sassy: { increase: 'specialDefense', decrease: 'speed' },
  Serious: {},
  Timid: { increase: 'speed', decrease: 'attack' },
}

export const natureEffect = (nature: Nature, stat: keyof Stats): number => {
  const effect = natureEffects[nature]
  if (effect.increase === stat) return 1.1
  if (effect.decrease === stat) return 0.9
  return 1
}

export const typeColors: Record<PokemonTypeValue, string> = {
  Electric: '#F7D02C',
  Steel: '#B7B7CE',
  Rock: '#B6A136',
  Ground: '#E2BF65',
  Grass: '#7AC74C',
  Poison: '#A33EA1',
  Water: '#6390F0',
  Psychic: '#F95587',
  Normal: '#A8A77A',
  Flying: '#A98FF3',
  Fire: '#EE8130',
  Dark: '#705746',
  Fairy: '#D685AD',
  Fighting: '#C22E28',
  Ghost: '#735797',
  Ice: '#96D9D6',
  Dragon: '#6F35FC',
  Bug: '#A6B91A'
}