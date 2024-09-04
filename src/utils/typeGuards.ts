import { PokemonData, PokemonTypeValue } from "../types/pokemon"

export function isPokemonData(obj: unknown): obj is PokemonData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    typeof (obj as PokemonData).id === "number" &&
    "name" in obj &&
    typeof (obj as PokemonData).name === "string" &&
    "types" in obj &&
    Array.isArray((obj as PokemonData).types) &&
    (obj as PokemonData).types.every((type): type is PokemonTypeValue => typeof type === "string")
  )
}


export function isPokemonTypeValue(value: unknown): value is PokemonTypeValue {
  return typeof value === "string" && [
    "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground",
    "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
  ].includes(value as PokemonTypeValue)
}