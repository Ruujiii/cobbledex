// import React, { useState } from 'react';
// import { PokemonCard } from './PokemonCard';
// import { PokemonTypeValue } from './PokemonType';
// import PokemonDetailModal from './PokemonDetailModal';
// import { PokemonSpawnLocation } from './PokemonDetailModal/pokemonSpawnLocations';
// import { PokemonRegion } from './PokemonDetailModal/pokemonRegions';

// export interface EvolutionData {
//   stage: number
//   name: string
//   image?: string
//   types: PokemonTypeValue[]
//   evolutionMethod: string
// }

// const pokemonData = [
//   { id: 1, name: 'Bulbasaur', image: '/src/components/img/1.png', types: ['Grass', 'Poison'] as PokemonTypeValue[] },
//   { id: 2, name: 'Ivysaur', image: '/src/components/img/2.png', types: ['Grass', 'Poison'] as PokemonTypeValue[] },
//   { id: 3, name: 'Venusaur', image: '/src/components/img/3.png', types: ['Grass', 'Poison'] as PokemonTypeValue[] },
//   { id: 4, name: 'Charmander', image: '/src/components/img/4.png', types: ['Fire'] as PokemonTypeValue[] },
//   { id: 5, name: 'Charmeleon', image: '/src/components/img/5.png', types: ['Fire'] as PokemonTypeValue[],},
//   { id: 6, name: 'Charizard', image: '/src/components/img/6.png', types: ['Fire', 'Flying'] as PokemonTypeValue[]},
//   { id: 7, name: 'Squirtle', image: '/src/components/img/7.png', types: ['Water'] as PokemonTypeValue[] },
//   { id: 8, name: 'Wartortle', image: '/src/components/img/8.png', types: ['Water'] as PokemonTypeValue[]},
//   { id: 9, name: 'Blastoise', image: '/src/components/img/9.png', types: ['Water'] as PokemonTypeValue[] },
//   { id: 25, name: 'Pikachu', image: '/src/components/img/25.png', types: ['Electric'] as PokemonTypeValue[] },
// ].map(pokemon => ({ ...pokemon, spawnLocations: [] as PokemonSpawnLocation[] }));

// export function PokemonGrid() {
//   const [selectedPokemon, setSelectedPokemon] = useState<typeof pokemonData[0] | null>(null);

//   const handleSelectPokemon = (pokemon: typeof pokemonData[0]) => {
//     setSelectedPokemon(pokemon);
//   };

//   const handleClosePokemonDetail = () => {
//     setSelectedPokemon(null);
//   };

//   const handleSelectEvolution = (pokemonName: string) => {
//     const pokemon = pokemonData.find(p => p.name === pokemonName);
//     if (pokemon) {
//       setSelectedPokemon(pokemon);
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//         {pokemonData.map((pokemon) => (
//           <PokemonCard
//             key={pokemon.id}
//             id={pokemon.id}
//             name={pokemon.name}
//             image={pokemon.image}
//             types={pokemon.types}
//             // spawnLocations={pokemon.spawnLocations}
//             onSelect={() => handleSelectPokemon(pokemon)}
//           />
//         ))}
//       </div>
//       {selectedPokemon && (
//         <PokemonDetailModal
//           id={selectedPokemon.id}
//           name={selectedPokemon.name}
//           types={selectedPokemon.types}
//           image={selectedPokemon.image}
//           shinyImage={`/src/components/img/${selectedPokemon.id}-shiny.png`}
//           abilities={['To be added']}
//           levelingRate="To be added"
//           evYield="To be added"
//           eggGroup="To be added"
//           catchRate={0}
//           pokedexEntry="To be added"
//           spawnLocations={[]}
//           region={'To be added' as PokemonRegion}
//           baseStats={{
//             hp: 0,
//             attack: 0,
//             defense: 0,
//             specialAttack: 0,
//             specialDefense: 0,
//             speed: 0
//           }}
//           typeEffectiveness={{}}
//           learnset={[]}
//           evolutionData={[] as EvolutionData[]}
//           isOpen={!!selectedPokemon}
//           onClose={handleClosePokemonDetail}
//           onSelectPokemon={handleSelectEvolution}
//           availablePokemon={pokemonData.map(p => p.name)}
//         />
//       )}
//     </>
//   );
// }