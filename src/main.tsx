import React from 'react'
import ReactDOM from 'react-dom/client'
import BudgetContextProvider from './contexts/useBudget.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BudgetContextProvider>
      <App />
    </BudgetContextProvider>
  </React.StrictMode>,
)
