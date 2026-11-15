import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminInbox from './components/message/AdminInbox'
import './styles/global.css'

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const activeApplication = currentPath === '/admin/messages' ? <AdminInbox /> : <App />

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{activeApplication}</React.StrictMode>,
)
