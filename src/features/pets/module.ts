import type { Container } from '@/core/di/container'
import { MockPetRepository } from './data/MockPetRepository'
import { GetPet } from './domain/usecases/GetPet'
import { GetPetStats } from './domain/usecases/GetPetStats'
import { ListPets } from './domain/usecases/ListPets'
import { GET_PET, GET_PET_STATS, LIST_PETS, PET_REPOSITORY } from './domain/tokens'

/** Módulo DI da feature (equivale a um módulo Hilt). */
export function registerPetsModule(container: Container) {
  container
    .register(PET_REPOSITORY, () => new MockPetRepository())
    .register(LIST_PETS, (c) => new ListPets(c.resolve(PET_REPOSITORY)))
    .register(GET_PET, (c) => new GetPet(c.resolve(PET_REPOSITORY)))
    .register(GET_PET_STATS, (c) => new GetPetStats(c.resolve(PET_REPOSITORY)))
}
