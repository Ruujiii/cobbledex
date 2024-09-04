import React from "react"
import { Card } from "../ui/card"
import { PokemonTypeTag, PokemonTypeValue } from './PokemonType'

interface PokemonCardProps {
  id: number
  name: string
  types: PokemonTypeValue[]
  image?: string
  onSelect: () => void
}

export function PokemonCard({ id, name, types, image, onSelect }: PokemonCardProps) {
  return (
    <Card 
      className="overflow-hidden rounded-lg bg-[#4B2382] shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl cursor-pointer"
      onClick={onSelect}
    >
      <div className="bg-[#7654a7] p-3 md:p-4 relative">
      {image ? ( 
        <img src={image} width={100} height={100} alt={name} 
          className="aspect-square object-contain mx-auto" /> ) : ( 
          <div className="w-[100px] h-[100px] flex items-center justify-center mx-auto bg-[#5C2D91] text-white text-xs"> 
            No image available 
          </div> )} 
          <span className="absolute top-2 left-2 bg-white bg-opacity-80 text-[#4B2382] font-bold px-2 py-1 rounded-full text-xs"> 
            #{id.toString().padStart(3, '0')} 
          </span>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {types.map((type) => (
            <PokemonTypeTag key={type} type={type} />
          ))}
        </div>
      </div>
    </Card>
  )
}