import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { PokemonSelector } from './PokemonSelector'
import { PokemonData, PokemonTeamMember, Team } from '../../../types/pokemon'
import { PokemonPreview } from './PokemonPreview'
import { PokemonDetails } from './PokemonDetails'

interface TeamEditModalProps {
  isOpen: boolean
  onClose: () => void
  team: Team
  availablePokemon: PokemonData[]
  onSave: (updatedTeam: Team) => void
}

export function TeamEditModal({ isOpen, onClose, team, availablePokemon, onSave }: TeamEditModalProps) {
  const [editedTeam, setEditedTeam] = useState<Team>(team)
  const [expandedPokemon, setExpandedPokemon] = useState<number | null>(null)

  useEffect(() => {
    setEditedTeam(team)
  }, [team])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTeam({ ...editedTeam, name: e.target.value })
  }

  const addPokemon = (pokemon: PokemonData) => {
    if (editedTeam.pokemon.length < 6) {
      const newPokemon: PokemonTeamMember = {
        id: pokemon.id,
        name: pokemon.name,
        ability: pokemon.abilities[0] || '',
        nature: 'Hardy',
        level: 100,
        moveset: [],
        evs: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
        ivs: { hp: 31, attack: 31, defense: 31, specialAttack: 31, specialDefense: 31, speed: 31 }
      }
      setEditedTeam({ ...editedTeam, pokemon: [...editedTeam.pokemon, newPokemon] })
    }
  }

  const updatePokemon = (index: number, updatedPokemon: PokemonTeamMember) => {
    const newPokemonList = [...editedTeam.pokemon]
    newPokemonList[index] = updatedPokemon
    setEditedTeam({ ...editedTeam, pokemon: newPokemonList })
  }

  const removePokemon = (index: number) => {
    const newPokemonList = editedTeam.pokemon.filter((_: unknown, i: number) => i !== index)
    setEditedTeam({ ...editedTeam, pokemon: newPokemonList })
    if (expandedPokemon === index) {
      setExpandedPokemon(null)
    }
  }

  const handleSave = () => {
    if (editedTeam.name.trim() === '') {
      alert('Please enter a team name before saving.')
      return
    }
    onSave(editedTeam)
    onClose()
  }

  const toggleExpand = (index: number) => {
    setExpandedPokemon(expandedPokemon === index ? null : index)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#4B2382] text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
        </DialogHeader>
        <Input
          value={editedTeam.name}
          onChange={handleNameChange}
          placeholder="Team Name"
          className="mb-4 bg-[#5C2D91] text-white"
        />
        {editedTeam.pokemon.map((pokemon: PokemonTeamMember, index: number) => {
          const pokemonData = availablePokemon.find(p => p.id === pokemon.id)
          if (!pokemonData) return null
          return (
            <div key={index}>
              <PokemonPreview
                pokemon={pokemon}
                pokemonData={pokemonData}
                index={index}
                toggleExpand={toggleExpand}
                removePokemon={removePokemon}
                isExpanded={expandedPokemon === index}
              />
              {expandedPokemon === index && (
                <PokemonDetails
                  pokemon={pokemon}
                  pokemonData={pokemonData}
                  index={index}
                  updatePokemon={updatePokemon}
                />
              )}
            </div>
          )
        })}
        {editedTeam.pokemon.length < 6 && (
          <PokemonSelector
            availablePokemon={availablePokemon}
            onSelect={addPokemon}
          />
        )}
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave} disabled={editedTeam.name.trim() === ''}>Save Team</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}