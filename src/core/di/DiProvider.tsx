import { createContext, useContext, type ReactNode } from 'react'
import type { Container, Token } from './container'

const DiContext = createContext<Container | null>(null)

interface DiProviderProps {
  container: Container
  children: ReactNode
}

export function DiProvider({ container, children }: DiProviderProps) {
  return <DiContext.Provider value={container}>{children}</DiContext.Provider>
}

export function useInject<T>(token: Token<T>): T {
  const container = useContext(DiContext)
  if (!container) throw new Error('useInject fora do <DiProvider>')
  return container.resolve(token)
}
