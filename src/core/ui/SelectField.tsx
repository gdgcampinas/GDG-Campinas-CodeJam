import type { ReactNode, SelectHTMLAttributes } from 'react'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}

export interface SelectFieldProps<T extends string = string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  id: string
  label: string
  value: T
  onChange: (value: T) => void
  options: readonly SelectOption<T>[]
  error?: string
  extra?: ReactNode
}

export function SelectField<T extends string = string>({
  id,
  label,
  value,
  onChange,
  options,
  error,
  extra,
  className,
  ...rest
}: SelectFieldProps<T>) {
  return (
    <div className={`form-group ${className ?? ''}`}>
      <div className="form-group__header">
        <label htmlFor={id}>{label}</label>
        {extra}
      </div>
      <select
        id={id}
        className={`form-select ${error ? 'is-error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
