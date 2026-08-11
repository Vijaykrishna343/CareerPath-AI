"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type FavoritesContextType = {
  favorites: string[]
  addFavorite: (industry: string) => void
  removeFavorite: (industry: string) => void
  isFavorite: (industry: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("careerExplorerFavorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error("Failed to parse favorites from localStorage")
      }
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("careerExplorerFavorites", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (industry: string) => {
    setFavorites((prev) => [...prev, industry])
  }

  const removeFavorite = (industry: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== industry))
  }

  const isFavorite = (industry: string) => {
    return favorites.includes(industry)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
