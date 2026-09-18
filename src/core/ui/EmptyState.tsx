interface EmptyStateProps {
  icon?: string
  title: string
  hint?: string
}

export function EmptyState({ icon = '🐾', title, hint }: EmptyStateProps) {
  return (
    <div className="center-note">
      <div className="center-note__icon">{icon}</div>
      <strong>{title}</strong>
      {hint && <span>{hint}</span>}
    </div>
  )
}
