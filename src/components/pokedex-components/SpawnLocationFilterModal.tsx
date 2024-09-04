import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { PokemonSpawnLocation } from './PokemonDetailModal/pokemonSpawnLocations'

interface SpawnLocationFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (selectedSpawnLocations: PokemonSpawnLocation[]) => void
  spawnLocations: PokemonSpawnLocation[]
  selectedSpawnLocations: PokemonSpawnLocation[]
}

export function SpawnLocationFilterModal({
  isOpen,
  onClose,
  onApply,
  spawnLocations,
  selectedSpawnLocations,
}: SpawnLocationFilterModalProps) {
  const [localSelectedSpawnLocations, setLocalSelectedSpawnLocations] = useState<PokemonSpawnLocation[]>(selectedSpawnLocations)

  useEffect(() => {
    setLocalSelectedSpawnLocations(selectedSpawnLocations)
  }, [selectedSpawnLocations])

  const handleSpawnLocationToggle = (spawnLocation: PokemonSpawnLocation) => {
    setLocalSelectedSpawnLocations((prev) =>
      prev.includes(spawnLocation)
        ? prev.filter((loc) => loc !== spawnLocation)
        : [...prev, spawnLocation]
    )
  }

  const handleApply = () => {
    onApply(localSelectedSpawnLocations)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter by Spawn Location</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[500px] grid grid-cols-3 gap-2 px-2 py-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-slate-400 scrollbar-track-slate-800">
          {spawnLocations.map((location) => (
            <Button
              key={location}
              onClick={() => handleSpawnLocationToggle(location)}
              variant={localSelectedSpawnLocations.includes(location) ? 'default' : 'outline'}
              className={`w-full ${
                localSelectedSpawnLocations.includes(location) ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
              } text-white`}
            >
              {location}
            </Button>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}