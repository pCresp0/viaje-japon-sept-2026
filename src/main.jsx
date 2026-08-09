import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n'
import { HighlightProvider } from './context/HighlightContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <HighlightProvider>
        <App />
      </HighlightProvider>
    </LanguageProvider>
  </StrictMode>,
)
