import React, { useState, useEffect } from "react"
import { Navbar } from "../Navbar"
import { PokedexSearch } from "./PokedexSearch"
import { PokemonCard } from "./PokemonCard"
import PokemonDetailModal from "./PokemonDetailModal"
import { PokemonData, PokemonTypeValue, PokemonRegion, PokemonSpawnLocation } from "../../types/pokemon"
import pokemonDataJson from "../../data/pokemonData.json"
import { allPokemonRegions } from './PokemonDetailModal/pokemonRegions'
import { allSpawnLocations } from './PokemonDetailModal/pokemonSpawnLocations'
import { RegionFilterModal } from "./RegionFilterModal"
import { SpawnLocationFilterModal } from "./SpawnLocationFilterModal"
import { TypeFilterModal } from "./TypeFilterModal"
import { isPokemonData } from "../../utils/typeGuards"

export default function Pokedex() {
  const [pokemonDataList, setPokemonDataList] = useState<PokemonData[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null)
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonData[]>([])
  const [activeFilters, setActiveFilters] = useState<{
    type: PokemonTypeValue[];
    region: PokemonRegion[];
    spawnLocation: PokemonSpawnLocation[];
  }>({
    type: [],
    region: [],
    spawnLocation: []
  })
  const [isRegionFilterModalOpen, setIsRegionFilterModalOpen] = useState(false)
  const [isSpawnLocationFilterModalOpen, setIsSpawnLocationFilterModalOpen] = useState(false)
  const [isTypeFilterModalOpen, setIsTypeFilterModalOpen] = useState(false)

  useEffect(() => {
    const validPokemonData = (pokemonDataJson as { pokemonDataList: unknown[] }).pokemonDataList.filter(isPokemonData)
    setPokemonDataList(validPokemonData)
    setFilteredPokemon(validPokemonData)
  }, [])

  const handleSelectPokemon = (pokemonName: string) => {
    const pokemon = pokemonDataList.find(p => p.name === pokemonName)
    if (pokemon) {
      setSelectedPokemon(pokemon)
    }
  }

  const handleSearch = (results: PokemonData[]) => {
    setFilteredPokemon(results)
  }

  const handleFilter = (filterType: 'type' | 'region' | 'spawnLocation', values: string[]) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values as unknown
    }))

    let filtered = pokemonDataList

    if (values.length > 0) {
      switch (filterType) {
        case 'type':
          filtered = filtered.filter(pokemon => 
            pokemon.types.some(type => values.includes(type))
          )
          break
        case 'region':
          filtered = filtered.filter(pokemon => 
            pokemon.region && values.includes(pokemon.region)
          )
          break
        case 'spawnLocation':
          filtered = filtered.filter(pokemon => 
            pokemon.spawnLocation && pokemon.spawnLocation.some(location => 
              values.includes(location)
            )
          )
          break
      }
    }

    setFilteredPokemon(filtered)
  }

  const handleRegionFilterApply = (newSelectedRegions: PokemonRegion[]) => {
    handleFilter('region', newSelectedRegions)
    setIsRegionFilterModalOpen(false)
  }

  const handleSpawnLocationFilterApply = (newSelectedSpawnLocations: PokemonSpawnLocation[]) => {
    handleFilter('spawnLocation', newSelectedSpawnLocations)
    setIsSpawnLocationFilterModalOpen(false)
  }

  const handleTypeFilterApply = (selectedTypes: PokemonTypeValue[]) => {
    handleFilter('type', selectedTypes)
    setIsTypeFilterModalOpen(false)
  }

  const availablePokemon = pokemonDataList.map(pokemon => pokemon.name)

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#5C2D91]">
      <Navbar />
      <PokedexSearch 
        onSearch={handleSearch}
        onFilter={handleFilter}
        onTypeFilterSelect={() => setIsTypeFilterModalOpen(true)}
        onRegionFilterSelect={() => setIsRegionFilterModalOpen(true)}
        onSpawnLocationFilterSelect={() => setIsSpawnLocationFilterModalOpen(true)}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <main className="flex-1 p-4 md:ml-16 md:p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard 
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              image={pokemon.image}
              onSelect={() => setSelectedPokemon(pokemon)}
            />
          ))}
        </div>
      </main>
      {selectedPokemon && (
        <PokemonDetailModal
          {...selectedPokemon}
          spawnLocations={selectedPokemon.spawnLocation || []}
          isOpen={!!selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onSelectPokemon={handleSelectPokemon}
          availablePokemon={availablePokemon}
        />
      )}
      <RegionFilterModal
        isOpen={isRegionFilterModalOpen}
        onClose={() => setIsRegionFilterModalOpen(false)}
        regions={[...allPokemonRegions]}
        onApply={handleRegionFilterApply}
        selectedRegions={activeFilters.region}
      />
      <SpawnLocationFilterModal
        isOpen={isSpawnLocationFilterModalOpen}
        onClose={() => setIsSpawnLocationFilterModalOpen(false)}
        onApply={handleSpawnLocationFilterApply}
        spawnLocations={allSpawnLocations}
        selectedSpawnLocations={activeFilters.spawnLocation}
      />
      <TypeFilterModal
        isOpen={isTypeFilterModalOpen}
        onClose={() => setIsTypeFilterModalOpen(false)}
        onFilterApply={handleTypeFilterApply}
        selectedTypes={activeFilters.type}
      />
    </div>
  )
}