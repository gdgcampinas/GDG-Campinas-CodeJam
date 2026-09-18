import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface PageHeaderProps {
  title: string
  subtitle?: string
  back?: boolean
  action?: ReactNode
}

export function PageHeader({ title, subtitle, back, action }: PageHeaderProps) {
  const navigate = useNavigate()
  return (
    <header className="page-header">
      {back && (
        <button className="page-header__back" onClick={() => navigate(-1)} aria-label="Voltar">
          ←
        </button>
      )}
      <div className="page-header__text">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}
