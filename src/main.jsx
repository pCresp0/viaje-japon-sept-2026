import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n'
import { HighlightProvider } from './context/HighlightContext'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary resetKey="app-shell">
      <LanguageProvider>
        <HighlightProvider>
          <App />
        </HighlightProvider>
      </LanguageProvider>
    </ErrorBoundary>
  </StrictMode>,
)
