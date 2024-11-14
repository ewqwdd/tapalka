import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LoadingPage } from './pages/LoadingPage'

const Layout = lazy(() => import('./Layout'))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Layout />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
