import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { PokemonData } from '../../types/pokemon'
import { Team } from './TeamBuilder'
import { TeamEditModal } from './TeamEditModal/TeamEditModal'

interface TeamCardProps {
  team: Team
  availablePokemon: PokemonData[]
  onUpdate: (team: Team) => void
  onEdit: () => void
  onDelete: (teamId: string) => void
}

export function TeamCard({ team, availablePokemon, onUpdate, onDelete }: TeamCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <Card className="bg-[#4B2382] text-white">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{team.name}</span>
            <div>
              <Button onClick={() => setIsEditModalOpen(true)} variant="ghost" className="mr-2">
                Edit
              </Button>
              <Button onClick={() => onDelete(team.id)} variant="destructive">
                Delete
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {team.pokemon.map((pokemon, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={availablePokemon.find(p => p.id === pokemon.id)?.image}
                  alt={pokemon.name}
                  className="w-16 h-16"
                />
                <span className="text-sm mt-1">{pokemon.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <TeamEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        team={team}
        availablePokemon={availablePokemon}
        onSave={onUpdate}
      />
    </>
  )
}