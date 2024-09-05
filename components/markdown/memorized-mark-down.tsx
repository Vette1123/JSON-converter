'use client'

import React, { useState } from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { useMessage } from '@/hooks/use-message'
import { CodeBlock } from '@/components/markdown/code-block'
import { MemoizedReactMarkdown } from '@/components/markdown/markdown'

interface CodeProps {
  inline?: boolean
  className?: string
  children: React.ReactNode
}

function stringifyObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(stringifyObject)
  }
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, stringifyObject(value)])
  )
}

export function MemorizedMarkDown() {
  const { messages: input } = useMessage()
  console.log('input', input)

  const parsedInput =
    input?.length && input.filter(Boolean) ? eval('(' + input + ')') : ''
  const formattedArray = stringifyObject(parsedInput)
  const formattedContent = parsedInput.length
    ? '```json\n' + JSON.stringify(formattedArray, null, 2) + '\n```'
    : ''

  const markdownComponents = {
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-2">{children}</p>
    ),
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : ''
      const code = String(children).replace(/\n$/, '')

      if (inline) {
        return (
          <code className="rounded bg-gray-100 px-1 py-0.5">{children}</code>
        )
      }
      return <CodeBlock language={language} value={code} {...props} />
    },
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4 pb-72">
      <MemoizedReactMarkdown
        className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-3xl break-words"
        remarkPlugins={[remarkGfm, remarkMath] as any}
        components={markdownComponents as any}
      >
        {formattedContent}
      </MemoizedReactMarkdown>
    </div>
  )
}
