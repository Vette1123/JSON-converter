'use client'

import React from 'react'
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

/**
 * Turns the pasted source into a value.
 *
 * Strict JSON is tried first and covers most input without executing
 * anything. Only when that fails do we fall back to evaluating the text as a
 * JavaScript expression, which is what makes unquoted keys, single quotes and
 * trailing commas work — the whole reason to paste an object literal here
 * rather than into a plain JSON formatter.
 *
 * `Function` rather than `eval`: a direct `eval` can read and write the
 * surrounding local scope, while a function body cannot see anything but
 * globals. Everything runs client-side on text the user typed themselves, and
 * nothing is persisted or shared, so that is the boundary that matters here.
 */
function parseSource(source: string): unknown {
  try {
    return JSON.parse(source)
  } catch {
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${source});`)()
  }
}

function describeError(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message
  }
  return 'Could not parse that as an object or array.'
}

export function MemorizedMarkDown() {
  const { messages } = useMessage()
  const source = (messages[0] ?? '').trim()

  let formattedContent = ''
  let error: string | null = null

  if (source) {
    try {
      // `undefined` has no JSON representation, so stringify returns undefined
      // rather than a string — guard it instead of rendering "undefined".
      const json = JSON.stringify(parseSource(source), null, 2)
      if (json === undefined) {
        error = 'That value has no JSON representation.'
      } else {
        formattedContent = '```json\n' + json + '\n```'
      }
    } catch (err) {
      error = describeError(err)
    }
  }

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
      {error ? (
        <p
          role="status"
          className="text-center text-sm text-red-500"
          data-testid="parse-error"
        >
          {error}
        </p>
      ) : null}
      {!formattedContent && !error ? (
        <p className="text-center text-muted-foreground">
          Paste an object or array below to convert it to formatted JSON.
        </p>
      ) : null}
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
