import type { ReactNode } from 'react'
import { EmptyState } from './EmptyState'
import { Spinner } from './Spinner'

interface ItemListProps<T> {
  items: readonly T[] | null
  loading?: boolean
  keyOf: (item: T) => string
  renderItem: (item: T) => ReactNode
  emptyTitle: string
  emptyHint?: string
}

/** Lista genérica com estados de loading e vazio. */
export function ItemList<T>({ items, loading, keyOf, renderItem, emptyTitle, emptyHint }: ItemListProps<T>) {
  if (loading && !items) return <Spinner />
  if (!items || items.length === 0) return <EmptyState title={emptyTitle} hint={emptyHint} />
  return (
    <div className="list">
      {items.map((item) => (
        <div key={keyOf(item)}>{renderItem(item)}</div>
      ))}
    </div>
  )
}
