import React, { useState } from 'react'
import { PokemonData } from '../../../types/pokemon'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { ScrollArea } from '../../ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '../../ui/dropdown-menu'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface PokemonSelectorProps {
  availablePokemon: PokemonData[]
  onSelect: (pokemon: PokemonData) => void
}

export function PokemonSelector({ availablePokemon, onSelect }: PokemonSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null)

  const filteredPokemon = availablePokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (pokemon: PokemonData) => {
    setSelectedPokemon(pokemon)
    onSelect(pokemon)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white text-purple-800 hover:bg-purple-100 hover:text-purple-900"
        >
          {selectedPokemon ? (
            <>
              <img 
                src={selectedPokemon.image} 
                alt={selectedPokemon.name} 
                className="w-6 h-6 mr-2"
              />
              {selectedPokemon.name}
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Pokémon
            </>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <Input
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
        <ScrollArea className="h-[200px]">
          {filteredPokemon.map((pokemon) => (
            <DropdownMenuItem
              key={pokemon.id}
              onSelect={() => handleSelect(pokemon)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedPokemon?.id === pokemon.id ? "opacity-100" : "opacity-0"
                )}
              />
              <img 
                src={pokemon.image} 
                alt={pokemon.name} 
                className="w-6 h-6 mr-2"
              />
              {pokemon.name}
              <span className="ml-auto text-xs text-gray-500">
                {pokemon.types.join(', ')}
              </span>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}