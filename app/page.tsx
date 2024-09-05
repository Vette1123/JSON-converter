import { ChatPanel } from '@/components/chat/chat-panel'
import { MemorizedMarkDown } from '@/components/markdown/memorized-mark-down'

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <MemorizedMarkDown />
      <ChatPanel />
    </section>
  )
}
