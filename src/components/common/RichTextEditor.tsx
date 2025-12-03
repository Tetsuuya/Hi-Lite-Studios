import { useEffect, useRef, memo, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  onReady?: (quill: any) => void
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

function RichTextEditor({ value, onChange, onReady }: RichTextEditorProps) {
  const quillRef = useRef<HTMLDivElement>(null)
  const [quill, setQuill] = useState<Quill | null>(null)

  const isInitializingRef = useRef(false)
  const lastValueRef = useRef('')

  // Initialize Quill only once
  useEffect(() => {
    if (quillRef.current && !quill) {
      const quillInstance = new Quill(quillRef.current, {
        modules,
        formats,
        theme: 'snow',
      })
      
      setQuill(quillInstance)
      
      if (onReady) {
        onReady(quillInstance)
      }
    }
  }, [quill, onReady])

  // Load initial / external value into editor (only once at start and when explicitly changed from outside)
  useEffect(() => {
    if (!quill) return
    
    // Skip if already initializing
    if (isInitializingRef.current) return
    
    // Skip if value hasn't changed (prevents re-pasting on every parent re-render)
    if (value === lastValueRef.current) return
    
    // Mark as initializing to prevent rapid re-pastes
    isInitializingRef.current = true
    lastValueRef.current = value
    
    // Use setTimeout to batch the paste operation
    const timer = setTimeout(() => {
      quill.clipboard.dangerouslyPasteHTML(value || '')
      isInitializingRef.current = false
    }, 0)
    
    return () => clearTimeout(timer)
  }, [quill, value])

  // Propagate changes out with debouncing to prevent excessive re-renders
  useEffect(() => {
    if (!quill) return

    const handler = () => {
      const newContent = quill.root.innerHTML
      lastValueRef.current = newContent
      onChange(newContent)
    }

    quill.on('text-change', handler)
    return () => {
      quill.off('text-change', handler)
    }
  }, [quill, onChange])

  return <div ref={quillRef} />
}

export default memo(RichTextEditor)
