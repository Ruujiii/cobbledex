import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { PokemonTypeValue } from './PokemonType'

interface TypeFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onFilterApply: (selectedTypes: PokemonTypeValue[]) => void
  selectedTypes: PokemonTypeValue[]
}

export function TypeFilterModal({
  isOpen,
  onClose,
  onFilterApply,
  selectedTypes,
}: TypeFilterModalProps) {
  const [localSelectedTypes, setLocalSelectedTypes] = useState<PokemonTypeValue[]>(selectedTypes)

  useEffect(() => {
    setLocalSelectedTypes(selectedTypes)
  }, [selectedTypes])

  const handleTypeToggle = (type: PokemonTypeValue) => {
    setLocalSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    )
  }

  const handleApply = () => {
    onFilterApply(localSelectedTypes)
  }

  const types: PokemonTypeValue[] = [
    'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground',
    'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter by Type</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2 py-4">
          {types.map((type) => (
            <Button
              key={type}
              onClick={() => handleTypeToggle(type)}
              variant={localSelectedTypes.includes(type) ? 'default' : 'outline'}
              className={`w-full ${
                localSelectedTypes.includes(type) ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
              } text-white`}
            >
              {type}
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