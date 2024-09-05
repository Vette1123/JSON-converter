'use client'

import React from 'react'

import { FooterText } from '@/components/chat/chat-prompt-footer'
import { PromptForm } from '@/components/chat/chat-prompt-form'

export function ChatPanel() {
  return (
    <div className="fixed inset-x-0 bottom-0 shrink-0 bg-gradient-to-b from-muted/50 to-muted/80 to-50% pt-2">
      <div className="mx-auto sm:max-w-3xl sm:px-4">
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}

const xd1 = [
  {
    id: 1,
    content: 'xd',
    role: 'user',
  },
  {
    id: 2,
    content: 'xd',
    role: 'user',
  },
  {
    id: 3,
    content: 'xd',
    role: 'user',
  },
  {
    id: 4,
    content: 'xd',
    role: 'user',
  },
  {
    id: 5,
    content: 'xd',
    role: 'user',
  },
  {
    id: 6,
    content: 'xd',
    role: 'user',
  },
  {
    id: 7,
    content: 'xd',
    role: 'user',
  },
  {
    id: 8,
    content: 'xd',
    role: 'user',
  },
]
