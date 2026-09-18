import type { InputHTMLAttributes, ReactNode } from 'react'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  hint?: string
  error?: string
  extra?: ReactNode
}

export function TextField({
  id,
  label,
  value,
  onChange,
  hint,
  error,
  extra,
  className,
  ...rest
}: TextFieldProps) {
  return (
    <div className={`form-group ${className ?? ''}`}>
      <div className="form-group__header">
        <label htmlFor={id}>{label}</label>
        {extra}
      </div>
      <input
        id={id}
        className={`form-input ${error ? 'is-error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
