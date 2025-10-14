import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import tabIconUrl from './assets/F - Copy (1).png'

if (typeof document !== 'undefined') {
  const existingFavicon = document.querySelector("link[rel='icon']")
  if (existingFavicon) {
    existingFavicon.href = tabIconUrl
  } else {
    const newFavicon = document.createElement('link')
    newFavicon.rel = 'icon'
    newFavicon.href = tabIconUrl
    document.head.appendChild(newFavicon)
  }
  document.title = 'FIRSTX'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
