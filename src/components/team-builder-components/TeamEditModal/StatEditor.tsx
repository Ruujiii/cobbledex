import React from 'react'
import { Label } from '../../ui/label'
import { Slider } from '../../ui/slider'
import { PokemonData, PokemonTeamMember, Stats } from '../../../types/pokemon'
import { calculateStat, natureEffect } from './utils'

interface StatEditorProps {
  pokemon: PokemonTeamMember
  pokemonData: PokemonData
  index: number
  updatePokemon: (index: number, updatedPokemon: PokemonTeamMember) => void
}

export function StatEditor({ pokemon, pokemonData, index, updatePokemon }: StatEditorProps) {
  const totalEvs = Object.values(pokemon.evs).reduce((sum, ev) => sum + ev, 0)

  const updateEv = (stat: keyof Stats, value: number) => {
    const currentTotal = totalEvs - pokemon.evs[stat]
    const newValue = Math.min(value, 510 - currentTotal)
    const newEvs = { ...pokemon.evs, [stat]: newValue }
    updatePokemon(index, { ...pokemon, evs: newEvs })
  }

  const updateIv = (stat: keyof Stats, value: number) => {
    const newIvs = { ...pokemon.ivs, [stat]: Math.max(0, Math.min(31, value)) }
    updatePokemon(index, { ...pokemon, ivs: newIvs })
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-2">
        <div className="w-24"></div>
        <Label className="w-20 text-center">Base Stats</Label>
        <Label className="w-14 text-center">EV</Label>
        <div className="w-40"></div>
        <Label className="w-14 text-center">IV</Label>
        <div className="w-40"></div>
        <Label className="w-12 text-center">Total</Label>
      </div>
      {(Object.keys(pokemon.evs) as Array<keyof Stats>).map((stat) => {
        const base = pokemonData.baseStats[stat] || 0
        const calculatedStat = calculateStat(
          base,
          pokemon.ivs[stat],
          pokemon.evs[stat],
          pokemon.level,
          natureEffect(pokemon.nature, stat),
          stat === 'hp'
        )
        return (
          <div key={stat} className="flex items-center space-x-4">
            <Label className="w-24 text-right uppercase">{stat}</Label>
            <div className="w-20 flex items-center">
              <div className="w-12 h-4 bg-[#4B2382] rounded-full overflow-hidden mr-2">
                <div 
                  className="h-full bg-[#8a6ab9]" 
                  style={{ width: `${(base / 255) * 100}%` }}
                ></div>
              </div>
              <span className="w-8 text-center">{base}</span>
            </div>
            <span className="w-14 text-center bg-[#5C2D91] text-white py-1 px-2 rounded">
              {pokemon.evs[stat]}
            </span>
            <Slider
              value={[pokemon.evs[stat]]}
              onValueChange={(value) => updateEv(stat, value[0])}
              max={252}
              step={4}
              className="w-40"
              disabled={totalEvs >= 510 && pokemon.evs[stat] === 0}
            />
            <span className="w-14 text-center bg-[#5C2D91] text-white py-1 px-2 rounded">
              {pokemon.ivs[stat]}
            </span>
            <Slider
              value={[pokemon.ivs[stat]]}
              onValueChange={(value) => updateIv(stat, value[0])}
              max={31}
              step={1}
              className="w-40"
            />
            <span className="w-12 text-center">{calculatedStat}</span>
          </div>
        )
      })}
      <div className="text-right">
        Total EVs: {totalEvs}/510
      </div>
    </div>
  )
}