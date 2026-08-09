import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useMessage } from '@/hooks/use-message'

/**
 * The input dock. Conversion runs on every keystroke, so there is nothing to
 * submit — no form, no send button, and Enter inserts a newline like it does
 * in any other editor. (It previously submitted an empty handler, which meant
 * you could not type a multi-line object without holding Shift.)
 */
export function PromptForm() {
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { setMessages } = useMessage()

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-4 sm:rounded-md sm:border">
      <label htmlFor="source" className="sr-only">
        Object or array to convert
      </label>
      <Textarea
        id="source"
        ref={inputRef}
        tabIndex={0}
        rows={1}
        onChange={(e) => setMessages([e.target.value])}
        placeholder="Paste an object or array — { name: 'ada', ids: [1, 2] }"
        spellCheck={false}
        className="min-h-[60px] w-full resize-none bg-transparent px-1 py-[1.3rem] focus-within:outline-none sm:text-sm"
      />
    </div>
  )
}
