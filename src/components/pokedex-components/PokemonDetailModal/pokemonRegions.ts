export const allPokemonRegions = [
  'Kanto',
  'Johto',
  'Hoenn',
  'Sinnoh',
  'Unova',
  'Kalos',
  'Alola',
  'Galar',
  'Hisui',
  'Paldea'
] as const;

export type PokemonRegion = typeof allPokemonRegions[number];