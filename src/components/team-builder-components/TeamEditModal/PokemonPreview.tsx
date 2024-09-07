import React from 'react'
import { Button } from '../../ui/button'
import { PokemonData, PokemonTeamMember } from '../../../types/pokemon'
import { typeColors } from './utils'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface PokemonPreviewProps {
  pokemon: PokemonTeamMember
  pokemonData: PokemonData
  index: number
  toggleExpand: (index: number) => void
  removePokemon: (index: number) => void
  isExpanded: boolean
}

export function PokemonPreview({ pokemon, pokemonData, index, toggleExpand, removePokemon, isExpanded }: PokemonPreviewProps) {
  const totalStats = Object.values(pokemonData.baseStats).reduce((sum, stat) => sum + stat, 0)

  return (
    <div 
      className="mb-2 p-4 bg-[#7654a7] rounded-lg cursor-pointer hover:bg-[#8a6ab9]"
      onClick={() => toggleExpand(index)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={pokemonData.image || '/placeholder.svg?height=60&width=60'} 
            alt={pokemon.name} 
            className="w-10 h-10"
          />
          <div>
            <h3 className="font-bold text-lg">{pokemon.name}</h3>
            <div className="flex space-x-2 mt-1">
              {pokemonData.types.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center justify-center w-20 px-1 py-0.5 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: typeColors[type] }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">Lv. {pokemon.level}</p>
          <p className="text-sm">{pokemon.ability}</p>
          <p className="text-sm">{pokemon.nature}</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-semibold">Moves:</span>
          <span className="text-sm">{pokemon.moveset.length}/4</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {pokemon.moveset.map((move, i) => (
            <span key={i} className="text-xs bg-[#5C2D91] px-2 py-1 rounded">{move.move}</span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-semibold">Base Stats:</span>
          <span className="text-sm">Total: {totalStats}</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          {Object.entries(pokemonData.baseStats).map(([stat, value], i) => (
            <div
              key={stat}
              className="h-full inline-block"
              style={{
                width: `${(value / totalStats) * 100}%`,
                backgroundColor: ['#FF5959', '#F5AC78', '#FAE078', '#9DB7F5', '#A7DB8D', '#FA92B2'][i]
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); removePokemon(index); }}>
          Remove
        </Button>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    </div>
  )
}