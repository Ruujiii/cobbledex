import React from 'react'
import { PokemonTypeTag, PokemonTypeValue, typeColors } from './PokemonType'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '../ui/alert-dialog'

interface EvolutionData {
  stage: number
  name: string
  image?: string
  types: PokemonTypeValue[]
  evolutionMethod: string
}

interface EvolutionChainProps {
  evolutionData: EvolutionData[]
  onSelectPokemon: (pokemonName: string) => void
  availablePokemon: string[]
}

export function EvolutionChain({ evolutionData, onSelectPokemon, availablePokemon }: EvolutionChainProps) {
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [selectedPokemon, setSelectedPokemon] = React.useState('')

  const handlePokemonClick = (pokemonName: string) => {
    setSelectedPokemon(pokemonName)
    if (availablePokemon.includes(pokemonName)) {
      onSelectPokemon(pokemonName)
    } else {
      setAlertOpen(true)
    }
  }

  const getBackgroundColor = (types: PokemonTypeValue[]) => {
    if (types.length > 0) {
      return typeColors[types[0]] || 'bg-gray-500'
    }
    return 'bg-gray-500'
  }

  const backgroundColor = getBackgroundColor(evolutionData[0].types)

  return (
    <div className={`p-4 rounded-lg`} style={{ backgroundColor }}>
      <div className="flex items-center justify-center">
        {evolutionData.map((pokemon, index) => (
          <React.Fragment key={pokemon.name}>
            <div className="flex flex-col items-center">
              <div 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => handlePokemonClick(pokemon.name)}
              >
                {pokemon.image ? (
                  <img src={pokemon.image} alt={pokemon.name} className="w-14 h-14 object-contain" />
                ) : (
                  <span className="text-xs font-bold">{pokemon.name}</span>
                )}
              </div>
              <span className="mt-1 text-white font-bold text-xs">{pokemon.name}</span>
              <div className="flex flex-col gap-1 mt-1">
                {pokemon.types.map(type => (
                  <PokemonTypeTag key={type} type={type} small />
                ))}
              </div>
            </div>
            {index < evolutionData.length - 1 && (
              <div className="flex flex-col items-center mx-2">
                <ArrowRight className="text-white" size={24} />
                <div className="text-white text-xs mt-1">{evolutionData[index + 1].evolutionMethod}</div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Pokémon Not Available</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedPokemon} has not been added to the Pokédex yet.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Button onClick={() => setAlertOpen(false)} variant="default">Okay</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}