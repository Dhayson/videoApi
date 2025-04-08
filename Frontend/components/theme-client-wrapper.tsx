"use client"

import { useState, useEffect } from "react"
import { ThemeProvider as NextThemeProvider, type ThemeProviderProps } from "next-themes"

export function ThemeClientWrapper({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
