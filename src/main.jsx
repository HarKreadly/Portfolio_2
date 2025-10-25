import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SplitText from './components/SplitText'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="min-h-screen">
      <SplitText text="Welcome to my Portfolio" />
    </div>
  </StrictMode>,
)
