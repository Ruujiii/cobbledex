import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

interface AddTeamCardProps {
  onAdd: () => void
}

export function AddTeamCard({ onAdd }: AddTeamCardProps) {
  return (
    <Card className="bg-[#4B2382] text-white">
      <CardContent className="flex items-center justify-center h-full">
        <Button onClick={onAdd} variant="ghost" className="w-full h-full">
          <Plus className="mr-2 h-6 w-6" />
          Add New Team
        </Button>
      </CardContent>
    </Card>
  )
}