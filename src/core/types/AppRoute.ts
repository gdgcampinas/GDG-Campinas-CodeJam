import type { ReactNode } from 'react'

export interface NavMeta {
  label: string
  icon: string
  order: number
}

/** Cada feature exporta suas rotas; o app só compõe. */
export interface AppRoute {
  path: string
  element: ReactNode
  nav?: NavMeta
}
