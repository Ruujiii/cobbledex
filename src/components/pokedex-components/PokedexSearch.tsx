import React, { useState, useCallback, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../ui/dropdown-menu"
import { SearchIcon, SlidersHorizontal, X } from "lucide-react"
import { PokemonData, PokemonTypeValue, PokemonRegion, PokemonSpawnLocation } from "../../types/pokemon"
import pokemonDataJson from "../../data/pokemonData.json"

interface PokedexSearchProps {
  onSearch: (results: PokemonData[]) => void;
  onFilter: (filterType: 'type' | 'region' | 'spawnLocation', values: string[]) => void;
  onTypeFilterSelect: () => void;
  onRegionFilterSelect: () => void;
  onSpawnLocationFilterSelect: () => void;
  activeFilters: {
    type: PokemonTypeValue[];
    region: PokemonRegion[];
    spawnLocation: PokemonSpawnLocation[];
  };
  setActiveFilters: React.Dispatch<React.SetStateAction<{
    type: PokemonTypeValue[];
    region: PokemonRegion[];
    spawnLocation: PokemonSpawnLocation[];
  }>>;
}

export function PokedexSearch({
  onSearch,
  onFilter,
  onTypeFilterSelect,
  onRegionFilterSelect,
  onSpawnLocationFilterSelect,
  activeFilters,
  setActiveFilters
}: PokedexSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [pokemonDataList, setPokemonDataList] = useState<PokemonData[]>([])

  useEffect(() => {
    // Load and parse the JSON data
    const loadPokemonData = () => {
      try {
        const data = (pokemonDataJson as { pokemonDataList: PokemonData[] }).pokemonDataList;
        setPokemonDataList(data);
      } catch (error) {
        console.error("Error loading Pokemon data:", error);
      }
    };

    loadPokemonData();
  }, []);

  const applyFilters = useCallback((term: string) => {
    let results = pokemonDataList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(term.toLowerCase())
    )

    if (activeFilters.type.length > 0) {
      results = results.filter(pokemon => 
        pokemon.types.some(type => activeFilters.type.includes(type))
      )
    }

    if (activeFilters.region.length > 0) {
      results = results.filter(pokemon => 
        pokemon.region && activeFilters.region.includes(pokemon.region)
      )
    }

    if (activeFilters.spawnLocation.length > 0) {
      results = results.filter(pokemon => 
        pokemon.spawnLocation && pokemon.spawnLocation.some(location => 
          activeFilters.spawnLocation.includes(location)
        )
      )
    }

    onSearch(results)
  }, [onSearch, pokemonDataList, activeFilters])

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    applyFilters(term)
  }, [applyFilters])

  useEffect(() => {
    applyFilters(searchTerm)
  }, [activeFilters, applyFilters, searchTerm])

  const handleRemoveFilter = (filterType: 'type' | 'region' | 'spawnLocation', value: string) => {
    const newValues = activeFilters[filterType].filter(v => v !== value)
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: newValues
    }))
    onFilter(filterType, newValues)
  }

  const handleFilterSelect = (filterType: 'type' | 'region' | 'spawnLocation') => {
    switch (filterType) {
      case 'type':
        onTypeFilterSelect();
        break;
      case 'region':
        onRegionFilterSelect();
        break;
      case 'spawnLocation':
        onSpawnLocationFilterSelect();
        break;
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4 bg-[#5C2D91]">
      <div className="w-full max-w-[1000px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="relative group flex-grow">
            <SearchIcon className="absolute left-2 top-2 h-4 w-4 text-white transition-colors group-hover:text-[#4B2382] group-focus-within:text-[#4B2382]" />
            <Input
              type="search"
              placeholder="Search Pokémon"
              className="h-8 w-full rounded-lg bg-[#4B2382] pl-8 text-sm placeholder:text-slate-200 text-white transition-colors hover:bg-[#7B4AA8] focus:bg-[#7B4AA8] focus:outline-none focus:ring-2 focus:ring-[#E60012]"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-lg bg-[#4B2382] transition-colors hover:bg-[#7B4AA8] group"
              >
                <SlidersHorizontal className="h-4 w-4 text-white transition-colors group-hover:text-[#4B2382]" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleFilterSelect('type')}>Type</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleFilterSelect('region')}>Region</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleFilterSelect('spawnLocation')}>Spawn Location</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {(activeFilters.type.length > 0 || activeFilters.region.length > 0 || activeFilters.spawnLocation.length > 0) && (
          <div className="flex items-center flex-wrap gap-2 mt-2">
            {activeFilters.type.map(type => (
              <Button
                key={type}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleRemoveFilter('type', type)}
              >
                {type}
                <X className="h-3 w-3" />
              </Button>
            ))}
            {activeFilters.region.map(region => (
              <Button
                key={region}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleRemoveFilter('region', region)}
              >
                {region}
                <X className="h-3 w-3" />
              </Button>
            ))}
            {activeFilters.spawnLocation.map(location => (
              <Button
                key={location}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleRemoveFilter('spawnLocation', location)}
              >
                {location}
                <X className="h-3 w-3" />
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}