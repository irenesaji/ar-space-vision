import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Enhanced button variants for the AR furniture app
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // AR app specific variants
        hero: "gradient-hero text-white shadow-elegant hover:shadow-lg hover:scale-105 transition-bounce font-semibold",
        ar: "bg-ar-control text-ar-control-foreground backdrop-blur-sm shadow-ar hover:bg-ar-control/90",
        "ar-primary": "bg-model-highlight text-white shadow-ar hover:bg-model-highlight/90 font-medium",
        premium: "gradient-warm text-white shadow-elegant hover:shadow-lg hover:scale-105 transition-bounce",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariant = NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
export type ButtonSize = NonNullable<Parameters<typeof buttonVariants>[0]>['size']