import type { ReactNode, TextareaHTMLAttributes } from 'react'

export interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  hint?: string
  error?: string
  extra?: ReactNode
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  hint,
  error,
  extra,
  className,
  rows = 4,
  ...rest
}: TextAreaFieldProps) {
  return (
    <div className={`form-group ${className ?? ''}`}>
      <div className="form-group__header">
        <label htmlFor={id}>{label}</label>
        {extra}
      </div>
      <textarea
        id={id}
        className={`form-textarea ${error ? 'is-error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        {...rest}
      />
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
