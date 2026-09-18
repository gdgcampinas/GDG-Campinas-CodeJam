import type { AppRoute } from '@/core/types/AppRoute'
import { PetDetailPage } from './presentation/PetDetailPage'
import { PetsPage } from './presentation/PetsPage'

export const petsRoutes: AppRoute[] = [
  { path: '/', element: <PetsPage />, nav: { label: 'Início', icon: '🏠', order: 0 } },
  { path: '/pet/:id', element: <PetDetailPage /> },
]
