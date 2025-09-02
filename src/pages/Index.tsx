import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/components/CategoryCard"
import { FurnitureCard } from "@/components/FurnitureCard"
import { ARViewer } from "@/components/ar/ARViewer"
import { ArrowLeft, Sofa, Armchair, Bed, Sparkles } from "lucide-react"

// Import furniture images
import chair1 from "@/assets/chair1.jpg"
import chair2 from "@/assets/chair2.jpg"
import sofa1 from "@/assets/sofa1.jpg"
import sofa2 from "@/assets/sofa2.jpg"
import bed from "@/assets/bed.jpg"

// Furniture Data
const arFurnitureData = {
  chairs: {
    displayName: "Chairs",
    icon: <Armchair className="h-12 w-12" />,
    products: [
      {
        id: "ac001",
        name: "Modern Shell Chair",
        image: chair1,
        modelUrl: "/models/chair1.glb",
      },
      {
        id: "ac002",
        name: "Classic Wooden Chair",
        image: chair2,
        modelUrl: "/models/chair2.glb",
      },
    ],
  },
  sofas: {
    displayName: "Sofas",
    icon: <Sofa className="h-12 w-12" />,
    products: [
      {
        id: "sf001",
        name: "3-Seater Modern Sofa",
        image: sofa1,
        modelUrl: "/models/sofa1.glb",
      },
      {
        id: "sf002",
        name: "Loveseat Couch",
        image: sofa2,
        modelUrl: "/models/sofa2.glb",
      },
    ],
  },
  beds: {
    displayName: "Beds",
    icon: <Bed className="h-12 w-12" />,
    products: [
      {
        id: "tb001",
        name: "Platform Bed",
        image: bed,
        modelUrl: "/models/bed.glb",
      },
    ],
  },
}

type CategoryKey = keyof typeof arFurnitureData
type Product = {
  id: string
  name: string
  image: string
  modelUrl: string
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // AR View
  if (selectedProduct) {
    return (
      <ARViewer
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    )
  }

  // Category Products View
  if (selectedCategory) {
    const category = arFurnitureData[selectedCategory]

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedCategory(null)} 
            className="mb-6 transition-bounce hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>

          <div className="text-center mb-12">
            <h1 className="font-playfair font-bold text-4xl mb-4 gradient-hero bg-clip-text text-transparent">
              {category.displayName}
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a product to view in your space with AR
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {category.products.map((product) => (
              <FurnitureCard
                key={product.id}
                product={product}
                onViewAR={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Main Categories View
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-8 w-8 text-accent" />
            <h1 className="font-playfair font-bold text-5xl md:text-6xl">
              AR Furniture
            </h1>
            <Sparkles className="h-8 w-8 text-accent" />
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See how furniture looks in your space before you buy. 
            Point your camera and place 3D models in your room.
          </p>
          <Button 
            variant="default"
            size="lg"
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            className="gradient-hero text-white shadow-elegant hover:shadow-lg hover:scale-105 transition-bounce font-semibold h-14 px-10 text-base"
          >
            Start AR Experience
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair font-bold text-4xl mb-4">Choose a Category</h2>
            <p className="text-lg text-muted-foreground">
              Select furniture type to browse AR-enabled products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(Object.keys(arFurnitureData) as CategoryKey[]).map((key) => {
              const category = arFurnitureData[key]
              return (
                <CategoryCard
                  key={key}
                  icon={category.icon}
                  name={category.displayName}
                  onClick={() => setSelectedCategory(key)}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h3 className="font-playfair font-bold text-3xl mb-8">AR Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Real-time Placement</h4>
              <p className="text-muted-foreground">
                Place furniture models on real surfaces with accurate scaling
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <Armchair className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Interactive Models</h4>
              <p className="text-muted-foreground">
                Rotate, scale, and position furniture exactly where you want it
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <Bed className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Multiple Categories</h4>
              <p className="text-muted-foreground">
                Browse chairs, sofas, beds and more with realistic 3D models
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
