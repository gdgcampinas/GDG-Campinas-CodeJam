import type { AppRoute } from '@/core/types/AppRoute'
import { MapPage } from './presentation/MapPage'

export const mapRoutes: AppRoute[] = [
  { path: '/mapa', element: <MapPage />, nav: { label: 'Mapa', icon: '🗺️', order: 1 } },
]
