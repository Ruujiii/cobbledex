export const getStatColor = (statName: string) => {
    switch (statName) {
      case 'hp': return 'bg-green-500'
      case 'attack': return 'bg-orange-500'
      case 'defense': return 'bg-red-500'
      case 'specialAttack': return 'bg-blue-400'
      case 'specialDefense': return 'bg-blue-600'
      case 'speed': return 'bg-pink-500'
      default: return 'bg-gray-500'
    }
  }
  
  export const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Physical': return 'bg-red-500'
      case 'Special': return 'bg-blue-500'
      case 'Status': return 'bg-gray-500'
      default: return 'bg-gray-300'
    }
  }