import { useEffect, useRef, useState } from "react"
import { EditorState, basicSetup } from "@codemirror/basic-setup"
import { EditorView, keymap, ViewUpdate } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"
import { markdown } from "@codemirror/lang-markdown"

export const Editor: React.FC<{
  value: string
  onChange: (value: string) => void
}> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [view, setView] = useState<EditorView | null>(null)

  useEffect(() => {
    const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
      if (vu.docChanged && typeof onChange === "function") {
        const doc = vu.state.doc
        const value = doc.toString()
        onChange(value)
      }
    })

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          markdown(),
          updateListener,
        ],
      }),
      parent: editorRef.current!,
    })

    setView(view)

    return () => {
      view.destroy()
      setView(null)
    }
  }, [])

  // Update view state when `value` changed
  useEffect(() => {
    const currentValue = view ? view.state.doc.toString() : ""
    if (view && value !== currentValue) {
      view.dispatch({
        changes: { from: 0, to: currentValue.length, insert: value || "" },
      })
    }
  }, [value, view])

  return <div ref={editorRef}></div>
}
