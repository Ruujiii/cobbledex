import React, { useState } from 'react'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { PokemonData, PokemonTeamMember, PokemonMove } from '../../../types/pokemon'
import { AbilitySelector } from './AbilitySelector'
import { NatureSelector } from './NatureSelector'
import { StatEditor } from './StatEditor'
import { MoveSelector } from './MoveSelector'
import { typeColors } from './utils'
import { Button } from '../../ui/button'

interface PokemonDetailsProps {
  pokemon: PokemonTeamMember
  pokemonData: PokemonData
  index: number
  updatePokemon: (index: number, updatedPokemon: PokemonTeamMember) => void
}

export function PokemonDetails({ pokemon, pokemonData, index, updatePokemon }: PokemonDetailsProps) {
  const [isMoveSelectorOpen, setIsMoveSelectorOpen] = useState(false)
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number | null>(null)

  const handleOpenMoveSelector = (moveIndex: number) => {
    setCurrentMoveIndex(moveIndex)
    setIsMoveSelectorOpen(true)
  }

  const handleSelectMove = (move: PokemonMove) => {
    if (currentMoveIndex !== null) {
      const newMoveset = [...pokemon.moveset]
      newMoveset[currentMoveIndex] = move
      updatePokemon(index, { ...pokemon, moveset: newMoveset })
    }
    setIsMoveSelectorOpen(false)
  }

  const getCategoryStyle = (category: 'Physical' | 'Special' | 'Status') => {
    switch (category) {
      case 'Physical':
        return 'bg-red-500 text-white';
      case 'Special':
        return 'bg-blue-500 text-white';
      case 'Status':
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="mt-4 p-4 bg-[#5C2D91] rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-6 max-w-3xl mx-auto">
        <div>
          <Label>Level</Label>
          <Input
            type="number"
            value={pokemon.level}
            onChange={(e) => updatePokemon(index, { ...pokemon, level: parseInt(e.target.value) })}
            min={1}
            max={100}
            className="bg-[#5C2D91] text-white"
          />
        </div>
        <div>
          <Label>Ability</Label>
          <AbilitySelector
            abilities={pokemonData.abilities}
            selectedAbility={pokemon.ability}
            onSelect={(ability) => updatePokemon(index, { ...pokemon, ability })}
          />
        </div>
        <div>
          <Label>Nature</Label>
          <NatureSelector
            selectedNature={pokemon.nature}
            onSelect={(nature) => updatePokemon(index, { ...pokemon, nature })}
          />
        </div>
      </div>
      <div className="mb-4">
        <Label>Type</Label>
        <div className="flex space-x-2 mt-1">
          {pokemonData.types.map((type) => (
            <span
              key={type}
              className="inline-flex items-center justify-center w-24 px-2 py-1 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: typeColors[type] }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <StatEditor pokemon={pokemon} pokemonData={pokemonData} index={index} updatePokemon={updatePokemon} />
      <div className="mt-4">
        <Label>Moves</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[0, 1, 2, 3].map((moveIndex) => (
            <Button
              key={moveIndex}
              onClick={() => handleOpenMoveSelector(moveIndex)}
              className="h-auto py-2 bg-[#4B2382] hover:bg-[#7654a7]"
            >
              {pokemon.moveset[moveIndex] ? (
                <div className="flex flex-col items-start w-full">
                  <span className="font-bold">{pokemon.moveset[moveIndex].move}</span>
                  <div className="flex justify-between w-full mt-1">
                    <span
                      className="inline-flex items-center justify-center w-20 px-1 py-0.5 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: typeColors[pokemon.moveset[moveIndex].type] }}
                    >
                      {pokemon.moveset[moveIndex].type}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-xs ${getCategoryStyle(pokemon.moveset[moveIndex].category)}`}>
                      {pokemon.moveset[moveIndex].category}
                    </span>
                  </div>
                </div>
              ) : (
                "Select Move"
              )}
            </Button>
          ))}
        </div>
      </div>
      <MoveSelector
        isOpen={isMoveSelectorOpen}
        onClose={() => setIsMoveSelectorOpen(false)}
        moves={pokemonData.learnset?.map(move => ({
          ...move,
          power: move.power === "--" ? 0 : move.power,
          accuracy: move.accuracy === "--" ? 0 : move.accuracy
        })) || []}
        onSelectMove={handleSelectMove}
      />
    </div>
  )
}