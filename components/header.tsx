"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">Career Explorer</span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <ThemeToggle />
        </motion.div>
      </div>
    </header>
  )
}
