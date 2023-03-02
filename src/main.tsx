import React from 'react'
import ReactDOM from 'react-dom/client'
import MainApp from './main-app'
import './presentation/styles/global.scss'
import './presentation/translations'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
)
