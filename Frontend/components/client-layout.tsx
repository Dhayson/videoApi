'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { ThemeClientWrapper } from "@/components/theme-client-wrapper"


export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeClientWrapper attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeClientWrapper>

  )
}
