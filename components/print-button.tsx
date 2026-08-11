"use client"

import type React from "react"

import type { ReactNode } from "react"
import { useReactToPrint } from "react-to-print"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

interface PrintButtonProps {
  contentRef: React.RefObject<HTMLElement | null>
  documentTitle?: string
  children?: ReactNode
}

export function PrintButton({ contentRef, documentTitle, children }: PrintButtonProps) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
  })

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
      onClick={() => handlePrint()}
    >
      <Printer className="h-4 w-4" />
      {children || "Print"}
    </Button>
  )
}
