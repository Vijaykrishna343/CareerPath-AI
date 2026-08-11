import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FavoritesProvider } from "@/context/favorites-context"

export const metadata = {
  title: "Career Explorer",
  description: "Explore different career paths across various industries",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FavoritesProvider>{children}</FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
