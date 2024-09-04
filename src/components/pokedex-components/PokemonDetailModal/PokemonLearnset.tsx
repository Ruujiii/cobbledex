import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { PokemonTypeTag, PokemonTypeValue } from '../PokemonType'
import { getCategoryColor } from '../../utils/pokemonHelpers'

interface PokemonLearnsetProps {
  learnset?: {
    level: number
    move: string
    type: PokemonTypeValue
    category: 'Physical' | 'Special' | 'Status'
    power: number | '--'
    accuracy: number | '--'
    pp: number
  }[]
}

export function PokemonLearnset({ learnset }: PokemonLearnsetProps) {
  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold mb-2">Learnset</h3>
      {learnset && learnset.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 py-1">Level</TableHead>
                <TableHead className="px-2 py-1">Move</TableHead>
                <TableHead className="px-2 py-1">Type</TableHead>
                <TableHead className="px-2 py-1">Cat.</TableHead>
                <TableHead className="px-2 py-1">Power</TableHead>
                <TableHead className="px-2 py-1">Acc.</TableHead>
                <TableHead className="px-2 py-1">PP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {learnset.map((move, index) => (
                <TableRow key={index}>
                  <TableCell className="px-2 py-1">{move.level}</TableCell>
                  <TableCell className="px-2 py-1">{move.move}</TableCell>
                  <TableCell className="px-2 py-1">
                    <PokemonTypeTag type={move.type} />
                  </TableCell>
                  <TableCell className="px-2 py-1">
                    <span className={`inline-block w-16 text-center px-2 py-1 rounded text-white text-xs ${getCategoryColor(move.category)}`}>
                      {move.category}
                    </span>
                  </TableCell>
                  <TableCell className="px-2 py-1">{move.power}</TableCell>
                  <TableCell className="px-2 py-1">{typeof move.accuracy === 'number' ? `${move.accuracy}%` : move.accuracy}</TableCell>
                  <TableCell className="px-2 py-1">{move.pp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>Learnset data not available</p>
      )}
    </div>
  )
}