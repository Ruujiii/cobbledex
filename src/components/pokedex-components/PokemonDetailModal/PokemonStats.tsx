import React from 'react'
import { getStatColor } from '../../utils/pokemonHelpers'

interface PokemonStatsProps {
  baseStats?: {
    hp?: number
    attack?: number
    defense?: number
    specialAttack?: number
    specialDefense?: number
    speed?: number
  }
}

export function PokemonStats({ baseStats }: PokemonStatsProps) {
  const totalStats = baseStats ? Object.values(baseStats).reduce((sum, stat) => sum + (stat || 0), 0) : 0

  const renderStatBar = (statName: string, value: number | undefined) => {
    const percentage = value ? (value / 255) * 100 : 0 // 255 is the max possible stat value
    return (
      <div className="flex items-center">
        <span className="w-24 text-right mr-2">{statName.charAt(0).toUpperCase() + statName.slice(1)}:</span>
        <span className="w-8 text-right mr-2">{value || 'N/A'}</span>
        <div className="w-48 bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getStatColor(statName)}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold mb-2">Base Stats</h3>
      {baseStats && Object.keys(baseStats).length > 0 ? (
        <div className="bg-green-100 p-4 rounded-lg">
          {Object.entries(baseStats).map(([statName, value]) => (
            <div key={statName} className="mb-2">
              {renderStatBar(statName, value)}
            </div>
          ))}
          <div className="flex items-center mt-4">
            <span className="w-24 text-right mr-2 font-bold">Total:</span>
            <span className="w-8 text-right mr-2 font-bold">{totalStats}</span>
            <div className="w-48 bg-purple-200 rounded-full h-2.5">
              <div 
                className="bg-purple-500 h-2.5 rounded-full" 
                style={{ width: `${(totalStats / 720) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <p>Base stats data not available</p>
      )}
    </div>
  )
}