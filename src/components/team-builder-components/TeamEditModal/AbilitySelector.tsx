import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface AbilitySelectorProps {
  abilities: string[]
  selectedAbility: string
  onSelect: (ability: string) => void
}

export function AbilitySelector({ abilities, selectedAbility, onSelect }: AbilitySelectorProps) {
  return (
    <Select value={selectedAbility} onValueChange={onSelect}>
      <SelectTrigger className="w-full bg-[#5C2D91] text-white border-[#7654a7]">
        <SelectValue placeholder="Select ability" />
      </SelectTrigger>
      <SelectContent className="bg-[#4B2382] text-white border-[#7654a7]">
        {abilities.map((ability) => (
          <SelectItem key={ability} value={ability} className="focus:bg-[#7654a7] focus:text-white">
            {ability}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}