import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Pokedex from './components/pokedex-components/Pokedex';
// import { PokemonGrid } from './components/pokedex-components/PokemonGrid';
import pokemonDataJson from "./data/pokemonData.json"
import { Navbar } from './components/Navbar';
import ErrorBoundary from './ErrorBoundary';
import { TeamBuilder } from './components/team-builder-components/TeamBuilder';
import { isPokemonData } from './utils/typeGuards';

function App() {
  const availablePokemon = (pokemonDataJson as { pokemonDataList: unknown[] }).pokemonDataList.filter(isPokemonData)
  console.log("Available Pokemon:", availablePokemon);

  return (
    <ErrorBoundary>
      <div className="bg-[#5C2D91] min-h-screen">
        <main className="container mx-auto pt-16 px-4">
          <Routes>
            <Route path="/" element={<Pokedex />} />
            {/* <Route path="/pokemon" element={<PokemonGrid />} /> */}
            <Route path="/team-builder" element={<TeamBuilder availablePokemon={availablePokemon} />} />
            <Route path="/items" element={<Navbar />} />
            <Route path="/blocks" element={<Navbar />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;