import { useMemo } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { DiProvider } from '@/core/di/DiProvider'
import { AppShell, TopNav } from '@/core/ui'
import { buildContainer } from './container'
import { appRoutes, navItems } from './routes'

/** HashRouter evita 404 no refresh em GitHub Pages. */
export function App() {
  const container = useMemo(() => buildContainer(), [])
  return (
    <DiProvider container={container}>
      <HashRouter>
        <AppShell nav={<TopNav brand="🐾 Patinhas" items={navItems} />}>
          <Routes>
            {appRoutes.map((r) => <Route key={r.path} path={r.path} element={r.element} />)}
          </Routes>
        </AppShell>
      </HashRouter>
    </DiProvider>
  )
}
