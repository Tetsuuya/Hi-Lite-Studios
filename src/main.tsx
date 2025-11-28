import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MagazineProvider } from './components/sections/context/MagazineContext.tsx'
import { FAQProvider } from './components/sections/context/FAQContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MagazineProvider>
        <FAQProvider>
      <App />
      </FAQProvider>
    </MagazineProvider>
  </StrictMode>,
)
