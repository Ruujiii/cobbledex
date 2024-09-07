import React, { useState, useEffect } from 'react'
import { TeamCard } from './TeamCard'
import { Button } from '../ui/button'
import { PokemonData, PokemonTypeValue } from '../../types/pokemon'
import { ScrollArea } from '../ui/scroll-area'
import { Navbar } from '../Navbar'
import { TeamEditModal } from './TeamEditModal/TeamEditModal'

export type Nature = 
  'Adamant' | 'Bashful' | 'Bold' | 'Brave' | 'Calm' | 'Careful' | 'Docile' | 'Gentle' | 
  'Hardy' | 'Hasty' | 'Impish' | 'Jolly' | 'Lax' | 'Lonely' | 'Mild' | 'Modest' | 
  'Naive' | 'Naughty' | 'Quiet' | 'Quirky' | 'Rash' | 'Relaxed' | 'Sassy' | 'Serious' | 'Timid'

export interface Team {
  id: string
  name: string
  pokemon: PokemonTeamMember[]
}

export interface PokemonTeamMember {
  id: number
  name: string
  ability: string
  nature: Nature
  level: number
  moveset: PokemonMove[];
  evs: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
  ivs: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
}

export interface PokemonMove {
  move: string;
  type: PokemonTypeValue;
  category: 'Physical' | 'Special' | 'Status';
  power: number;
  accuracy: number;
  pp: number;
}

interface TeamBuilderProps {
  availablePokemon: PokemonData[]
}

export function TeamBuilder({ availablePokemon }: TeamBuilderProps) {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false)

  useEffect(() => {
    if (Array.isArray(availablePokemon) && availablePokemon.length > 0) {
      const savedTeams = localStorage.getItem('pokemonTeams')
      if (savedTeams) {
        setTeams(JSON.parse(savedTeams))
      }
      setIsLoading(false)
    }
  }, [availablePokemon])

  const addTeam = (newTeam: Team) => {
    setTeams(prevTeams => {
      const updatedTeams = [...prevTeams, { ...newTeam, id: Date.now().toString() }]
      localStorage.setItem('pokemonTeams', JSON.stringify(updatedTeams))
      return updatedTeams
    })
  }

  const updateTeam = (updatedTeam: Team) => {
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.map(team => team.id === updatedTeam.id ? updatedTeam : team)
      localStorage.setItem('pokemonTeams', JSON.stringify(updatedTeams))
      return updatedTeams
    })
  }

  const deleteTeam = (teamId: string) => {
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.filter(team => team.id !== teamId)
      localStorage.setItem('pokemonTeams', JSON.stringify(updatedTeams))
      return updatedTeams
    })
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading Pokémon data...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Team Builder</h2>
        <Button onClick={() => setIsNewTeamModalOpen(true)} className="mb-4">
          Create New Team
        </Button>
        <ScrollArea className="w-full max-w-6xl">
          <div className="flex-grow p-4 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map(team => (
                <TeamCard
                  key={team.id}
                  team={team}
                  availablePokemon={availablePokemon}
                  onUpdate={updateTeam}
                  onEdit={() => {}}
                  onDelete={deleteTeam}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
        <TeamEditModal
          isOpen={isNewTeamModalOpen}
          onClose={() => setIsNewTeamModalOpen(false)}
          team={{ id: Date.now().toString(), name: '', pokemon: [] } as Team}
          availablePokemon={availablePokemon}
          onSave={(newTeam) => {
            addTeam(newTeam)
            setIsNewTeamModalOpen(false)
          }}
        />
      </div>
    </div>
  )
}