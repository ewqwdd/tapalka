import { Route, Routes } from 'react-router'
import { Suspense } from 'react'
import { AppRoutes, routerConfig } from './routerConfig'

export default function AppRouter() {
  return (
    <Routes>
      {Object.keys(routerConfig).map((elem) => (
        <Route key={elem} path={elem} element={<Suspense>{routerConfig[elem as AppRoutes].component}</Suspense>} />
      ))}
    </Routes>
  )
}
