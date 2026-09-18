import { useEffect, useState } from 'react'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  reload: () => void
}

/** Executa uma tarefa assíncrona e reexecuta quando `deps` mudam ou `reload()` é chamado. */
export function useAsync<T>(task: () => Promise<T>, deps: readonly unknown[]): AsyncState<T> {
  const [state, setState] = useState<Omit<AsyncState<T>, 'reload'>>({
    data: null,
    loading: true,
    error: null,
  })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, loading: true, error: null }))
    task()
      .then((data) => !cancelled && setState({ data, loading: false, error: null }))
      .catch((e: unknown) => {
        if (cancelled) return
        setState({ data: null, loading: false, error: e instanceof Error ? e : new Error(String(e)) })
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  return { ...state, reload: () => setTick((t) => t + 1) }
}
