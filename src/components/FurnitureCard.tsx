import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

interface Product {
  id: string
  name: string
  image: string
  modelUrl: string
}

interface FurnitureCardProps {
  product: Product
  onViewAR: (product: Product) => void
}

export function FurnitureCard({ product, onViewAR }: FurnitureCardProps) {
  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-elegant transition-smooth hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>
        <div className="p-4 flex justify-between items-center">
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-smooth">
            {product.name}
          </h3>
          <Button
            size="icon"
            variant="outline"
            onClick={() => onViewAR(product)}
            className="transition-bounce hover:scale-110 hover:bg-model-highlight hover:text-white hover:border-model-highlight"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}