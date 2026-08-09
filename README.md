# JSON Converter

> **Status: work in progress.** The editor and live preview work. The
> conversion step is not wired up yet — see [Current state](#current-state)
> before you judge it as a finished tool.

A prompt-style workspace for pasting a JavaScript array or object and seeing it
rendered back, formatted and syntax highlighted, as you type.

**[Live →](https://json-converter-nine.vercel.app)**

## Current state

Being precise about this, because the repository name promises more than the
code currently does:

| Part | State |
| --- | --- |
| Chat-style input, autosizing textarea | working |
| Live markdown + code rendering of the input | working |
| Syntax highlighting, GFM, math | working |
| Light/dark theme, responsive shell | working |
| **Submit handler** | **not implemented** — `onSubmit` is stubbed out |
| **Array/object → JSON conversion** | **not implemented** |

What happens today: `onChange` pushes the raw textarea value into a Zustand
store, and `MemorizedMarkDown` re-renders it. That makes it a live markdown and
code previewer with a chat-shaped input. The conversion the name refers to has
not been written.

## Stack

| | |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| State | Zustand |
| Rendering | `react-markdown` + `remark-gfm` + `remark-math` |
| Highlighting | `react-syntax-highlighter` |
| UI | shadcn/ui on Radix primitives + Tailwind CSS |
| Input | `react-textarea-autosize` |
| Themes | `next-themes` |

## How it is put together

```
app/page.tsx                          # MemorizedMarkDown + ChatPanel
components/chat/chat-panel.tsx        # fixed bottom dock
components/chat/chat-prompt-form.tsx  # textarea, Enter-to-submit, send button
components/markdown/                  # memoised renderer
hooks/use-message.ts                  # Zustand store holding the input
hooks/use-enter-submit.ts             # Enter submits, Shift+Enter newlines
```

The renderer is memoised on purpose. It re-runs on every keystroke, and
`react-syntax-highlighter` tokenises the whole block each time — without
`memo`, typing into a large paste visibly stutters.

## Finishing it

The remaining work is one function and a call site:

1. Implement the parse in `chat-prompt-form.tsx`'s `onSubmit` (currently
   commented out) — take the raw input, evaluate or parse it into a value,
   `JSON.stringify` with indentation.
2. Store the result alongside the input rather than overwriting it, so the pane
   can show source and output side by side.
3. Render errors in place. A malformed object should say where it broke, not
   silently render nothing.

## Running locally

```bash
git clone https://github.com/Vette1123/JSON-converter.git
cd JSON-converter
bun install     # or npm install
bun dev         # or npm run dev
```

Open `http://localhost:3000`. No environment variables or API keys required —
everything runs client-side.

## Notes

Scaffolded from [Sadge Template](https://github.com/Vette1123/next-js-starter-template),
which is why `package.json` still carries the template's name. The chat shell
borrows its layout from the Vercel AI chatbot example, but there is no AI and
no API route here — nothing leaves the browser.

---

Built by [Mohamed Gado](https://mohamedgado.com) · 2024
