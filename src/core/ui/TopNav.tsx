import { NavLink } from 'react-router-dom'

export interface NavItem {
  to: string
  label: string
  icon: string
}

interface TopNavProps {
  brand: string
  items: readonly NavItem[]
}

export function TopNav({ brand, items }: TopNavProps) {
  return (
    <header className="topnav">
      <div className="topnav__inner">
        <NavLink to="/" className="topnav__brand">{brand}</NavLink>
        <nav className="topnav__links">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end className={({ isActive }) => `topnav__link ${isActive ? 'is-active' : ''}`}>
              <span aria-hidden>{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
