import type { ReactNode } from 'react'

interface AppShellProps {
  nav: ReactNode
  children: ReactNode
}

/** Moldura web: navbar no topo + conteúdo centralizado e largo. */
export function AppShell({ nav, children }: AppShellProps) {
  return (
    <div className="shell">
      {nav}
      <main className="shell__content">{children}</main>
    </div>
  )
}
