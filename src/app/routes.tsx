import type { AppRoute } from '@/core/types/AppRoute'
import { mapRoutes } from '@/features/map/routes'
import { petsRoutes } from '@/features/pets/routes'

export const appRoutes: AppRoute[] = [...petsRoutes, ...mapRoutes]

export const navItems = appRoutes
  .filter((r) => r.nav)
  .sort((a, b) => a.nav!.order - b.nav!.order)
  .map((r) => ({ to: r.path, label: r.nav!.label, icon: r.nav!.icon }))
