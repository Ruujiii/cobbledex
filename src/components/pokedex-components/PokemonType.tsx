const pokemonTypes = [
  'Electric', 'Steel', 'Rock', 'Ground', 'Grass', 'Poison',
  'Water', 'Psychic', 'Normal', 'Flying', 'Fire', 'Dark',
  'Fairy', 'Fighting', 'Ghost', 'Ice', 'Dragon', 'Bug'
] as const;

type PokemonTypeValue = typeof pokemonTypes[number];

const typeColors: Record<PokemonTypeValue, string> = {
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
};

interface PokemonTypeTagProps {
  type: PokemonTypeValue;
  small?: boolean
}

function PokemonTypeTag({ type, small = false }: PokemonTypeTagProps) {
  return (
    <span
      className={`inline-flex items-center justify-center ${small ? 'w-20 px-1 py-0.5 text-xs' : 'w-24 px-2 py-1 text-sm'} rounded-full font-semibold text-white`}
      style={{ backgroundColor: typeColors[type] }}
    >
      {type}
    </span>
  )
}

export type { PokemonTypeValue };
export { pokemonTypes, PokemonTypeTag, typeColors };