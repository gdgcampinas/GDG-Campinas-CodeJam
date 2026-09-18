interface StatCardProps {
  value: number | string
  label: string
  icon?: string
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="stat">
      <div className="stat__value">
        {icon && <span aria-hidden>{icon} </span>}
        {value}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  )
}
