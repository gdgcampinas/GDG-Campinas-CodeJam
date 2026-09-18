export function Spinner({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div className="center-note" role="status">
      <span className="spinner" aria-hidden />
      {label}
    </div>
  )
}
