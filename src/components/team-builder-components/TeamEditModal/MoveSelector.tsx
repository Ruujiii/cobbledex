import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';
import { PokemonMove, PokemonTypeValue } from '../../../types/pokemon';
import { typeColors } from './utils';

interface MoveSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  moves: PokemonMove[];
  onSelectMove: (move: PokemonMove) => void;
}

const getCategoryStyle = (category: 'Physical' | 'Special' | 'Status') => {
  switch (category) {
    case 'Physical':
      return 'bg-red-500 text-white';
    case 'Special':
      return 'bg-blue-500 text-white';
    case 'Status':
      return 'bg-gray-500 text-white';
  }
};

export function MoveSelector({ isOpen, onClose, moves, onSelectMove }: MoveSelectorProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#4B2382] text-white max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select a Move</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {moves.map((move, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex flex-col items-start p-4 h-auto bg-[#5C2D91] hover:bg-[#7654a7] text-left"
                onClick={() => onSelectMove(move)}
              >
                <div className="flex justify-between w-full mb-2">
                  <span className="font-bold">{move.move}</span>
                  <span
                    className="inline-flex items-center justify-center w-20 px-1 py-0.5 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: typeColors[move.type as PokemonTypeValue] }}
                  >
                    {move.type}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 w-full text-sm">
                  <span>Power: {move.power}</span>
                  <span>Acc: {move.accuracy}</span>
                  <span>PP: {move.pp}</span>
                </div>
                <div className="flex justify-between w-full mt-2">
                  <span className={`px-2 py-1 rounded-md text-xs ${getCategoryStyle(move.category)}`}>
                    {move.category}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}