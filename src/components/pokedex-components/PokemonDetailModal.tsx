import React, { useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { PokemonBasicInfo } from './PokemonDetailModal/PokemonBasicInfo'
import { PokemonStats } from './PokemonDetailModal/PokemonStats'
import { PokemonTypeEffectiveness } from './PokemonDetailModal/PokemonTypeEffectiveness'
import { PokemonLearnset } from './PokemonDetailModal/PokemonLearnset'
import { EvolutionChain } from './EvolutionChain'
import { PokemonDetailProps } from './PokemonDetailModal/types'
import { PokemonRegion } from './PokemonDetailModal/pokemonRegions'

export default function PokemonDetailModal({
  id,
  name,
  types,
  image,
  shinyImage,
  abilities,
  levelingRate,
  evYield,
  eggGroup,
  catchRate,
  pokedexEntry,
  spawnLocations,
  region,
  baseStats,
  typeEffectiveness,
  learnset,
  evolutionData,
  isOpen,
  onClose,
  onSelectPokemon,
  availablePokemon
}: PokemonDetailProps) {
  const dialogContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTop = 0
    }
  }, [id])

  const handleSelectPokemon = (pokemonName: string) => {
    onSelectPokemon(pokemonName)
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTop = 0
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" ref={dialogContentRef}>
        <DialogHeader>
          <DialogTitle>{name} #{id.toString().padStart(3, '0')}</DialogTitle>
          <DialogDescription>
            <div className="flex justify-between">
              {image ? (
                <img src={image} alt={name} className="w-1/2 object-contain" />
              ) : (
                <div className="w-1/2 flex items-center justify-center">Image not available</div>
              )}
              {shinyImage ? (
                <img src={shinyImage} alt={`Shiny ${name}`} className="w-1/2 object-contain" />
              ) : (
                <div className="w-1/2 flex items-center justify-center">Shiny image not available</div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <PokemonBasicInfo
            types={types}
            abilities={abilities}
            levelingRate={levelingRate}
            evYield={evYield}
            eggGroup={eggGroup}
            catchRate={catchRate}
            pokedexEntry={pokedexEntry}
            spawnLocations={spawnLocations || []}
            region={region as PokemonRegion}
          />
          <PokemonStats baseStats={baseStats} />
          <PokemonTypeEffectiveness typeEffectiveness={typeEffectiveness} />
          <PokemonLearnset learnset={learnset} />
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-2">Evolution Chain</h3>
            {evolutionData && evolutionData.length > 0 ? (
              <EvolutionChain 
                evolutionData={evolutionData}
                onSelectPokemon={handleSelectPokemon}
                availablePokemon={availablePokemon}
              />
            ) : (
              <p>Evolution data not available</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}