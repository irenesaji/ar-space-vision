import { Card, CardContent } from "@/components/ui/card"
import { ReactNode } from "react"

interface CategoryCardProps {
  icon: ReactNode
  name: string
  onClick: () => void
}

export function CategoryCard({ icon, name, onClick }: CategoryCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer shadow-card hover:shadow-elegant hover:-translate-y-2 transition-bounce group"
    >
      <CardContent className="p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
        <div className="transition-smooth group-hover:scale-110 group-hover:text-accent">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-center group-hover:text-primary transition-smooth font-playfair">
          {name}
        </h3>
      </CardContent>
    </Card>
  )
}