import type { AppRoute } from '@/core/types/AppRoute'
import { RegisterPetPage } from './presentation/RegisterPetPage'

export const registerPetRoutes: AppRoute[] = [
  {
    path: '/cadastrar',
    element: <RegisterPetPage />,
    nav: { label: 'Achei um Pet', icon: '➕', order: 2 },
  },
]
