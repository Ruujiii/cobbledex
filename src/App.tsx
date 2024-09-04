import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Pokedex from './components/pokedex-components/Pokedex';
// import { PokemonGrid } from './components/pokedex-components/PokemonGrid';
import { Navbar } from './components/Navbar';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="bg-[#5C2D91] min-h-screen">
        <main className="container mx-auto pt-16 px-4">
          <Routes>
            <Route path="/" element={<Pokedex />} />
            {/* <Route path="/pokemon" element={<PokemonGrid />} /> */}
            <Route path="/team-builder" element={<Navbar />} />
            <Route path="/items" element={<Navbar />} />
            <Route path="/blocks" element={<Navbar />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;