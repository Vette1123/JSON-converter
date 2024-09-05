import React from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'

import { ThemeProvider } from './theme-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
