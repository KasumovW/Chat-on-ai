import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'App'
import 'styles/index.css'

// @ts-ignore
// import { NotificationContainer } from 'react-notifications'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  // {/* <NotificationContainer /> */}
)
