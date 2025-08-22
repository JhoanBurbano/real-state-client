'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function LanguageToggle() {
  const [currentLanguage, setCurrentLanguage] = useState<'EN' | 'ES'>('EN')

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'EN' ? 'ES' : 'EN')
    // TODO: Implement actual language switching logic
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{currentLanguage}</span>
    </Button>
  )
}
