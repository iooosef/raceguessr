import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import 'flyonui'
import 'flyonui/flyonui.js'
import './index.css'
import { ConfigProvider } from './util/ConfigContext';
import { UserProvider } from './auth/UserContext'; 
import App from './App.jsx'
import "./globals.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ConfigProvider>
      <UserProvider>

        <Router>
          <App />
        </Router>

      </UserProvider>
    </ConfigProvider>
    
  </StrictMode>,
)
