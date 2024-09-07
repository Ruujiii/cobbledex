import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Nature } from '../TeamBuilder'

interface NatureSelectorProps {
  selectedNature: Nature
  onSelect: (nature: Nature) => void
}

const natures: Nature[] = [
  'Adamant', 'Bashful', 'Bold', 'Brave', 'Calm', 'Careful', 'Docile', 'Gentle',
  'Hardy', 'Hasty', 'Impish', 'Jolly', 'Lax', 'Lonely', 'Mild', 'Modest',
  'Naive', 'Naughty', 'Quiet', 'Quirky', 'Rash', 'Relaxed', 'Sassy', 'Serious', 'Timid'
]

export function NatureSelector({ selectedNature, onSelect }: NatureSelectorProps) {
  return (
    <Select value={selectedNature} onValueChange={onSelect}>
      <SelectTrigger className="w-full bg-[#5C2D91] text-white border-[#7654a7]">
        <SelectValue placeholder="Select nature" />
      </SelectTrigger>
      <SelectContent className="bg-[#4B2382] text-white border-[#7654a7]">
        {natures.map((nature) => (
          <SelectItem key={nature} value={nature} className="focus:bg-[#7654a7] focus:text-white">
            {nature}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}