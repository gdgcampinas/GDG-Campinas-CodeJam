export interface ChipOption<T extends string> {
  value: T
  label: string
}

interface FilterChipsProps<T extends string> {
  options: readonly ChipOption<T>[]
  value: T | undefined
  onChange: (value: T | undefined) => void
  allLabel?: string
}

/** Seleção única com opção "todos". Reutilizado por qualquer filtro categórico. */
export function FilterChips<T extends string>({ options, value, onChange, allLabel = 'Todos' }: FilterChipsProps<T>) {
  return (
    <div className="chips" role="group">
      <button className={`chip ${value === undefined ? 'chip--on' : ''}`} onClick={() => onChange(undefined)}>
        {allLabel}
      </button>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`chip ${value === opt.value ? 'chip--on' : ''}`}
          onClick={() => onChange(opt.value === value ? undefined : opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
