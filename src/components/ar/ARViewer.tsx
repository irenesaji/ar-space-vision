import { useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  ArrowLeft, 
  RotateCcw, 
  Move3D, 
  ZoomIn, 
  ZoomOut,
  RotateCw,
  CheckCircle
} from "lucide-react"
import * as THREE from "three"

interface Product {
  id: string
  name: string
  image: string
  modelUrl: string
}

interface ARViewerProps {
  product: Product
  onBack: () => void
}

// Realistic 3D furniture model component based on reference designs
function FurnitureModel({ modelUrl, position, rotation, scale, color }: {
  modelUrl: string
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
}) {
  const getGeometry = () => {
    if (modelUrl.includes('chair1')) {
      // Modern shell chair with arms and wooden legs
      return (
        <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
          {/* Chair shell seat */}
          <mesh position={[0, 0.45, 0]} rotation={[-0.1, 0, 0]}>
            <sphereGeometry args={[0.65, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
            <meshStandardMaterial color="#A8B8C8" roughness={0.7} />
          </mesh>
          {/* Chair back with curve */}
          <mesh position={[0, 0.9, -0.3]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.6, 16, 8, 0, Math.PI * 2, Math.PI * 0.3, Math.PI * 0.4]} />
            <meshStandardMaterial color="#A8B8C8" roughness={0.7} />
          </mesh>
          {/* Armrests */}
          <mesh position={[-0.45, 0.65, -0.1]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.08, 0.1, 0.4]} />
            <meshStandardMaterial color="#A8B8C8" roughness={0.7} />
          </mesh>
          <mesh position={[0.45, 0.65, -0.1]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.08, 0.1, 0.4]} />
            <meshStandardMaterial color="#A8B8C8" roughness={0.7} />
          </mesh>
          {/* Wooden legs */}
          {[[-0.3, -0.2], [0.3, -0.2], [-0.3, 0.3], [0.3, 0.3]].map(([x, z], i) => (
            <mesh key={i} position={[x, 0, z]} rotation={[0.05, 0, i % 2 === 0 ? 0.05 : -0.05]}>
              <cylinderGeometry args={[0.03, 0.04, 0.9]} />
              <meshStandardMaterial color="#D2691E" roughness={0.8} />
            </mesh>
          ))}
        </group>
      )
    } else if (modelUrl.includes('chair2')) {
      // Modern organic curved armchair
      return (
        <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
          {/* Main body curved shell */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.7, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.8]} />
            <meshStandardMaterial color="#D2B48C" roughness={0.6} />
          </mesh>
          {/* Back support */}
          <mesh position={[0, 0.8, -0.35]} rotation={[0.3, 0, 0]}>
            <sphereGeometry args={[0.55, 12, 8, 0, Math.PI * 2, Math.PI * 0.2, Math.PI * 0.4]} />
            <meshStandardMaterial color="#D2B48C" roughness={0.6} />
          </mesh>
          {/* Sleek wooden legs */}
          {[[-0.25, -0.15], [0.25, -0.15], [-0.25, 0.25], [0.25, 0.25]].map(([x, z], i) => (
            <mesh key={i} position={[x, 0, z]} rotation={[0, i * Math.PI / 8, 0]}>
              <cylinderGeometry args={[0.025, 0.035, 0.85]} />
              <meshStandardMaterial color="#8B4513" roughness={0.9} />
            </mesh>
          ))}
        </group>
      )
    } else if (modelUrl.includes('sofa1')) {
      // Elegant vintage-style sofa with ornate details
      return (
        <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
          {/* Main sofa base with curves */}
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[2.2, 0.5, 0.9]} />
            <meshStandardMaterial color="#D3D3D3" roughness={0.6} />
          </mesh>
          {/* Curved back with tufting effect */}
          <mesh position={[0, 0.75, -0.35]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.05, 2.2, 0.8, 32]} />
            <meshStandardMaterial color="#D3D3D3" roughness={0.6} />
          </mesh>
          {/* Ornate curved arms */}
          <mesh position={[-1.0, 0.7, 0]} rotation={[0, 0, -0.1]}>
            <sphereGeometry args={[0.35, 12, 8, 0, Math.PI]} />
            <meshStandardMaterial color="#D3D3D3" roughness={0.6} />
          </mesh>
          <mesh position={[1.0, 0.7, 0]} rotation={[0, 0, 0.1]}>
            <sphereGeometry args={[0.35, 12, 8, 0, Math.PI]} />
            <meshStandardMaterial color="#D3D3D3" roughness={0.6} />
          </mesh>
          {/* Decorative wooden frame */}
          <mesh position={[0, 0.1, 0.45]}>
            <boxGeometry args={[2.4, 0.1, 0.05]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
        </group>
      )
    } else if (modelUrl.includes('sofa2')) {
      // Dark leather sofa set
      return (
        <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
          {/* Main sofa base */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[2.8, 0.6, 1.1]} />
            <meshStandardMaterial color="#2F1B14" roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Backrest with leather texture */}
          <mesh position={[0, 0.9, -0.45]}>
            <boxGeometry args={[2.8, 1.0, 0.2]} />
            <meshStandardMaterial color="#2F1B14" roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Chunky arms */}
          <mesh position={[-1.3, 0.8, 0]}>
            <boxGeometry args={[0.3, 0.8, 1.1]} />
            <meshStandardMaterial color="#2F1B14" roughness={0.3} metalness={0.1} />
          </mesh>
          <mesh position={[1.3, 0.8, 0]}>
            <boxGeometry args={[0.3, 0.8, 1.1]} />
            <meshStandardMaterial color="#2F1B14" roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Coffee table */}
          <mesh position={[0, 0.2, 1.8]}>
            <boxGeometry args={[1.2, 0.05, 0.6]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
          {/* Table legs */}
          {[[-0.5, 0.9], [0.5, 0.9], [-0.5, 1.5], [0.5, 1.5]].map(([x, z], i) => (
            <mesh key={i} position={[x, 0.1, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.4]} />
              <meshStandardMaterial color="#654321" roughness={0.8} />
            </mesh>
          ))}
        </group>
      )
    } else if (modelUrl.includes('bed')) {
      // Platform bed with white bedding and dark wooden frame
      return (
        <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
          {/* Wooden bed frame */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[2.1, 0.1, 3.1]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
          {/* White mattress */}
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[2.0, 0.2, 3.0]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
          </mesh>
          {/* White bedding/comforter */}
          <mesh position={[0, 0.42, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1.95, 0.05, 2.9]} />
            <meshStandardMaterial color="#F8F8FF" roughness={0.8} />
          </mesh>
          {/* Dark wooden headboard */}
          <mesh position={[0, 0.9, -1.5]}>
            <boxGeometry args={[2.2, 1.2, 0.1]} />
            <meshStandardMaterial color="#4A4A4A" roughness={0.7} />
          </mesh>
          {/* Pillows */}
          <mesh position={[-0.4, 0.5, -1.2]}>
            <boxGeometry args={[0.4, 0.15, 0.3]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
          </mesh>
          <mesh position={[0.4, 0.5, -1.2]}>
            <boxGeometry args={[0.4, 0.15, 0.3]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
          </mesh>
        </group>
      )
    }
    return null
  }

  return getGeometry()
}

// AR Camera component
function ARCamera({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) {
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      } catch (error) {
        console.error('Camera access denied:', error)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [videoRef])

  return null
}

export function ARViewer({ product, onBack }: ARViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaced, setIsPlaced] = useState(false)
  const [modelPosition, setModelPosition] = useState<[number, number, number]>([0, 0, 0])
  const [modelRotation, setModelRotation] = useState<[number, number, number]>([0, 0, 0])
  const [modelScale, setModelScale] = useState(1)
  const [modelColor, setModelColor] = useState("#8B7355")
  const [showControls, setShowControls] = useState(false)

  const handlePlaceModel = () => {
    setIsPlaced(true)
    setShowControls(true)
  }

  const handleResetPosition = () => {
    setModelPosition([0, 0, 0])
    setModelRotation([0, 0, 0])
    setModelScale(1)
  }

  const adjustScale = (delta: number) => {
    setModelScale(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }

  const adjustRotation = (axis: 'x' | 'y' | 'z', delta: number) => {
    setModelRotation(prev => {
      const newRotation = [...prev] as [number, number, number]
      const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
      newRotation[axisIndex] += delta
      return newRotation
    })
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-ar-overlay">
      {/* Camera feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        autoPlay
        muted
      />
      <ARCamera videoRef={videoRef} />

      {/* AR surface grid overlay */}
      <div className="absolute inset-0 ar-surface-grid opacity-20" />

      {/* 3D Canvas for AR models */}
      <div className="absolute inset-0 pointer-events-none">
        {isPlaced && (
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            style={{ background: 'transparent' }}
            className="pointer-events-auto"
          >
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            
            <FurnitureModel
              modelUrl={product.modelUrl}
              position={modelPosition}
              rotation={modelRotation}
              scale={modelScale}
              color={modelColor}
            />
            
            <ContactShadows
              position={[0, -1, 0]}
              opacity={0.3}
              scale={10}
              blur={2}
              far={20}
            />
            
            <Environment preset="apartment" />
            <OrbitControls enablePan enableZoom enableRotate />
          </Canvas>
        )}
      </div>

      {/* Top controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <Button variant="outline" onClick={onBack} className="shadow-ar bg-ar-control text-ar-control-foreground backdrop-blur-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="px-4 py-2 bg-ar-control/80 backdrop-blur-md border-white/20">
          <h3 className="font-semibold text-ar-control-foreground">{product.name}</h3>
        </Card>
      </div>

      {/* Center placement prompt */}
      {!isPlaced && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Card className="p-6 bg-ar-control/90 backdrop-blur-md shadow-ar border-white/20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-detected/20 flex items-center justify-center">
              <Move3D className="h-8 w-8 text-surface-detected" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-ar-control-foreground">
              Find a flat surface
            </h3>
            <p className="text-sm text-ar-control-foreground/80 mb-4">
              Point your camera at a flat surface like a floor or table
            </p>
            <Button variant="default" onClick={handlePlaceModel} className="w-full bg-model-highlight text-white hover:bg-model-highlight/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Place {product.name}
            </Button>
          </Card>
        </div>
      )}

      {/* Bottom controls */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Card className="p-4 bg-ar-control/90 backdrop-blur-md shadow-ar border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustRotation('y', Math.PI / 4)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCw className="h-4 w-4 mr-1" />
                Rotate
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustScale(0.2)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ZoomIn className="h-4 w-4 mr-1" />
                Bigger
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustScale(-0.2)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ZoomOut className="h-4 w-4 mr-1" />
                Smaller
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetPosition}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-white/80">
                Drag to move • Pinch to scale • Tap controls to adjust
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}