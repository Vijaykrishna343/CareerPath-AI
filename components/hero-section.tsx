"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToExplorer = () => {
    const explorerElement = document.getElementById("career-explorer")
    if (explorerElement) {
      explorerElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-primary/10 to-background pt-20 pb-24 md:pt-32 md:pb-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Discover Your <span className="text-primary">Career Path</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Explore different industries, find your passion, and map out your journey from education to dream job.
          </p>

          <button
            onClick={scrollToExplorer}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition-all duration-200 flex items-center mx-auto"
          >
            Start Exploring
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
