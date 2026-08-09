# JSON Converter

Paste a JavaScript object or array and get it back as formatted,
syntax-highlighted JSON — live, as you type. No build step in the loop, no
request, nothing leaves the browser.

**[Live →](https://json-converter-nine.vercel.app)**

## What it handles

Strict JSON works, and so does the thing you actually have on your clipboard —
a JavaScript literal copied out of a source file:

```js
{ name: 'ada', ids: [1, 2, 3,], active: true }
```

Unquoted keys, single quotes and trailing commas all convert. Output is
pretty-printed at two-space indentation with a copy button and a download
button on the code block.

## How the parsing works

Strict JSON is tried first, and covers most input without executing anything:

```ts
function parseSource(source: string): unknown {
  try {
    return JSON.parse(source)
  } catch {
    return Function(`"use strict"; return (${source});`)()
  }
}
```

Only when `JSON.parse` fails does it fall back to evaluating the text as a
JavaScript expression — which is what makes unquoted keys and trailing commas
work at all, and the reason to paste here rather than into a plain JSON
formatter.

`Function` rather than `eval` is deliberate: a direct `eval` can read and write
the surrounding local scope, while a function body sees only globals. It is
still evaluation, so the honest boundary is this — everything runs client-side
on text you typed yourself, and nothing is persisted, shared, or sent anywhere.
Do not extend it to parse input arriving from a URL or another user without
swapping in a real parser such as JSON5 first.

## Stack

| | |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| State | Zustand |
| Rendering | `react-markdown` + `remark-gfm` + `remark-math` |
| Highlighting | `react-syntax-highlighter` |
| UI | shadcn/ui on Radix primitives + Tailwind CSS |
| Input | `react-textarea-autosize` |
| Themes | `next-themes` |

## Layout

```
app/page.tsx                          # MemorizedMarkDown + ChatPanel
components/chat/chat-panel.tsx        # docked input at the bottom
components/chat/chat-prompt-form.tsx  # the textarea
components/markdown/                  # parse, format, render, highlight
hooks/use-message.ts                  # Zustand store holding the input
```

The renderer is memoised on purpose. It re-runs on every keystroke and
`react-syntax-highlighter` re-tokenises the whole block each time, so without
`memo` typing into a large paste visibly stutters. "It re-renders" and "it is
slow" are different problems, and only the second one is fixed by memoising.

## Running locally

```bash
git clone https://github.com/Vette1123/JSON-converter.git
cd JSON-converter
bun install     # or npm install
bun dev         # or npm run dev
```

Open `http://localhost:3000`. No environment variables or API keys required.

## Notes

Scaffolded from [Sadge Template](https://github.com/Vette1123/next-js-starter-template),
which is why `package.json` still carries the template's name. The input dock
borrows its layout from the Vercel AI chatbot example — there is no AI and no
API route here.

---

Built by [Mohamed Gado](https://mohamedgado.com) · 2024
