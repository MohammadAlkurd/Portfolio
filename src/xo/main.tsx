import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import XoGame from './XoGame'
import '../styles.css'
import './xo.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <XoGame />
  </StrictMode>,
)
