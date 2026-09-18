import { Container } from '@/core/di/container'
import { registerPetsModule } from '@/features/pets/module'

/** Composition root: único lugar que conhece todas as features. */
export function buildContainer(): Container {
  const container = new Container()
  registerPetsModule(container)
  return container
}
