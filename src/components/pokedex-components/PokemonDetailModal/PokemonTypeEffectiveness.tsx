import React from 'react'
import { PokemonTypeValue, pokemonTypes, typeColors } from '../PokemonType'

interface PokemonTypeEffectivenessProps {
  typeEffectiveness?: {
    [key in PokemonTypeValue]?: number
  }
}

export function PokemonTypeEffectiveness({ typeEffectiveness }: PokemonTypeEffectivenessProps) {
  if (!typeEffectiveness) return <p>Type effectiveness data not available</p>;

  const damagedNormallyBy: PokemonTypeValue[] = [];
  const weakTo: PokemonTypeValue[] = [];
  const doubleWeakTo: PokemonTypeValue[] = [];
  const immuneTo: PokemonTypeValue[] = [];
  const resistantTo: PokemonTypeValue[] = [];
  const doubleResistantTo: PokemonTypeValue[] = [];

  pokemonTypes.forEach((type) => {
    const effectiveness = typeEffectiveness[type] !== undefined ? typeEffectiveness[type] : 1;
    if (effectiveness === 1) damagedNormallyBy.push(type);
    else if (effectiveness === 2) weakTo.push(type);
    else if (effectiveness === 4) doubleWeakTo.push(type);
    else if (effectiveness === 0) immuneTo.push(type);
    else if (effectiveness === 0.5) resistantTo.push(type);
    else if (effectiveness === 0.25) doubleResistantTo.push(type);
  });

  const renderTypeRow = (types: PokemonTypeValue[], effectiveness: string) => (
    <div className="flex flex-wrap gap-1 mb-2">
      {types.map((type) => (
        <span
          key={type}
          className="inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: typeColors[type] }}
        >
          {type}
          <span className="ml-1 bg-white text-black rounded-full px-1 text-xs">
            {effectiveness}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold mb-2">Type Effectiveness</h3>
      <div className="bg-green-100 p-4 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">Under normal battle conditions in Generation IX (this is what Cobblemon is basing off), this Pokémon is:</h4>
        <div className="mb-2">
          <span className="font-semibold">Damaged normally by:</span>
          {renderTypeRow(damagedNormallyBy, '1×')}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Weak to:</span>
          {doubleWeakTo.length > 0 && renderTypeRow(doubleWeakTo, '4×')}
          {weakTo.length > 0 && renderTypeRow(weakTo, '2×')}
          {doubleWeakTo.length === 0 && weakTo.length === 0 && <span>None</span>}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Immune to:</span>
          {immuneTo.length > 0 ? renderTypeRow(immuneTo, '0×') : <span>None</span>}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Resistant to:</span>
          {doubleResistantTo.length > 0 && renderTypeRow(doubleResistantTo, '¼×')}
          {resistantTo.length > 0 && renderTypeRow(resistantTo, '½×')}
          {doubleResistantTo.length === 0 && resistantTo.length === 0 && <span>None</span>}
        </div>
      </div>
    </div>
  )
}