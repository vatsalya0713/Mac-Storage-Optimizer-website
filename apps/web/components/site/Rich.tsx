import { Fragment } from 'react'

// Renders copy that marks emphasis with <b>…</b> (the only tag allowed in
// page content files). Everything else is plain text, so nothing from a
// content file is ever injected as HTML.
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(<b>.*?<\/b>)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('<b>') && part.endsWith('</b>') ? (
          <strong key={i}>{part.slice(3, -4)}</strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
