import { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'list',
  'bullet',
  'link',
  'image',
]

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const { quill, quillRef } = useQuill({
    modules,
    formats,
    theme: 'snow',
  })

  // Load initial / external value into editor
  useEffect(() => {
    if (!quill) return
    if (value === quill.root.innerHTML) return
    quill.clipboard.dangerouslyPasteHTML(value || '')
  }, [quill, value])

  // Propagate changes out
  useEffect(() => {
    if (!quill) return

    const handler = () => {
      onChange(quill.root.innerHTML)
    }

    quill.on('text-change', handler)
    return () => {
      quill.off('text-change', handler)
    }
  }, [quill, onChange])

  return <div ref={quillRef} />
}
