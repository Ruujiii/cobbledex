import React from 'react'
import { PokemonTypeTag, PokemonTypeValue } from '../PokemonType'
import { PokemonRegion } from './pokemonRegions'
import { PokemonSpawnLocation } from './pokemonSpawnLocations'

interface PokemonBasicInfoProps {
  types: PokemonTypeValue[]
  abilities?: string[]
  levelingRate?: string
  evYield?: string
  eggGroup?: string
  catchRate?: number
  pokedexEntry?: string
  spawnLocations: PokemonSpawnLocation[]
  region: PokemonRegion
}

export function PokemonBasicInfo({
  types,
  abilities,
  levelingRate,
  evYield,
  eggGroup,
  catchRate,
  pokedexEntry,
  spawnLocations,
  region
}: PokemonBasicInfoProps) {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-2">Type</h3>
        <div className="flex gap-2">
          {types.map((type) => (
            <PokemonTypeTag key={type} type={type} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Abilities</h3>
        <p>{abilities?.join(', ') || 'To be added'}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Leveling Rate</h3>
        <p>{levelingRate || 'To be added'}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">EV Yield</h3>
        <p>{evYield || 'To be added'}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Egg Group</h3>
        <p>{eggGroup || 'To be added'}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Catch Rate</h3>
        <p>{catchRate ?? 'To be added'}</p>
      </div>
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-2">Pokedex Entry</h3>
        <p>{pokedexEntry || 'To be added'}</p>
      </div>
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-2">Spawn Locations</h3>
        <p>{spawnLocations.length > 0 ? spawnLocations.join(', ') : 'No spawn locations available'}</p>
      </div>
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-2">Region</h3>
        <p>{region || 'To be added'}</p>
      </div>
    </>
  )
}