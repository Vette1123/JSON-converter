import * as React from 'react'
import { useRouter } from 'next/navigation'
import Textarea from 'react-textarea-autosize'

import { cn } from '@/lib/utils'
import { useEnterSubmit } from '@/hooks/use-enter-submit'
import { useMessage } from '@/hooks/use-message'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Icons } from '../icons'

export function PromptForm() {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const { setMessages } = useMessage()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        // if (!input?.trim()) {
        //   return
        // }
        // if (messages.length ) setInput('')
        // await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          onChange={(e) => setMessages([e.target.value])}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-1 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-3 sm:right-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                className="size-8 p-0"
                // disabled={isLoading || input === ''}
              >
                <Icons.arrowElbow className="size-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
