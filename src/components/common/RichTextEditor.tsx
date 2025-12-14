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
  'link',
  'image',
]

function RichTextEditor({ value, onChange, onReady }: RichTextEditorProps) {
  const quillRef = useRef<HTMLDivElement>(null)
  const quillInstanceRef = useRef<Quill | null>(null)
  const [quill, setQuill] = useState<Quill | null>(null)

  const isInitializingRef = useRef(false)
  const lastValueRef = useRef('')

  // Initialize Quill only once
  useEffect(() => {
    // If we already have a Quill instance, don't initialize again
    if (quillInstanceRef.current || quill) {
      return
    }

    if (!quillRef.current) {
      return
    }

    // Check if Quill is already initialized on this element (from a previous render)
    const existingQuill = (quillRef.current as any).__quill
    if (existingQuill) {
      quillInstanceRef.current = existingQuill
      setQuill(existingQuill)
      if (onReady) {
        onReady(existingQuill)
      }
      return
    }

    // Check if the element already has Quill content (toolbar + editor)
    // Quill creates a structure with .ql-toolbar and .ql-container
    if (quillRef.current.querySelector('.ql-toolbar') || quillRef.current.querySelector('.ql-container')) {
      // Element already has Quill initialized, find the instance
      const root = quillRef.current.querySelector('.ql-container')?.parentElement || quillRef.current
      const existingInstance = (root as any).__quill
      if (existingInstance) {
        quillInstanceRef.current = existingInstance
        setQuill(existingInstance)
        if (onReady) {
          onReady(existingInstance)
        }
        return
      }
      // If we can't find the instance but toolbar exists, clear and reinitialize
      quillRef.current.innerHTML = ''
    } else {
      // Clear any existing content to prevent duplicate toolbars
      quillRef.current.innerHTML = ''
    }
    
    const quillInstance = new Quill(quillRef.current, {
      modules,
      formats,
      theme: 'snow',
    })
    
    // Store reference to prevent duplicate initialization
    quillInstanceRef.current = quillInstance
    ;(quillRef.current as any).__quill = quillInstance
    
    setQuill(quillInstance)
    
    if (onReady) {
      onReady(quillInstance)
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (quillRef.current) {
        // Clear the reference but keep the Quill instance for potential reuse
        delete (quillRef.current as any).__quill
      }
      quillInstanceRef.current = null
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
