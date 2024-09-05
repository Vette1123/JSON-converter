import { create } from 'zustand'

interface MessageStore {
  messages: string[]
  addMessage: (message: string) => void
  setMessages: (messages: string[]) => void
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
}))

export function useMessage() {
  const { messages, addMessage, setMessages } = useMessageStore()

  return {
    messages,
    addMessage,
    setMessages,
  }
}
