import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import TokenAuth from './Pages/ContextApi/TokenAuth.jsx'
import TokenAgent from './Pages/ContextApi/TokenAgent.jsx'
import TokenAdmin from './Pages/ContextApi/TokenAdmin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenAuth>
      <TokenAgent>
        <TokenAdmin>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TokenAdmin>
      </TokenAgent>
    </TokenAuth>
  </StrictMode>,
)
