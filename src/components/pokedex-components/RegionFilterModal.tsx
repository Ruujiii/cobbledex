import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { PokemonRegion } from './PokemonDetailModal/pokemonRegions'

interface RegionFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (selectedRegions: PokemonRegion[]) => void
  regions: PokemonRegion[]
  selectedRegions: PokemonRegion[]
}

export function RegionFilterModal({
  isOpen,
  onClose,
  onApply,
  regions,
  selectedRegions,
}: RegionFilterModalProps) {
  const [localSelectedRegions, setLocalSelectedRegions] = useState<PokemonRegion[]>(selectedRegions)

  useEffect(() => {
    setLocalSelectedRegions(selectedRegions)
  }, [selectedRegions])

  const handleRegionToggle = (region: PokemonRegion) => {
    setLocalSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    )
  }

  const handleApply = () => {
    onApply(localSelectedRegions)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter by Region</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2 py-4">
          {regions.map((region) => (
            <Button
              key={region}
              onClick={() => handleRegionToggle(region)}
              variant={localSelectedRegions.includes(region) ? 'default' : 'outline'}
              className={`w-full ${
                localSelectedRegions.includes(region) ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
              } text-white`}
            >
              {region}
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