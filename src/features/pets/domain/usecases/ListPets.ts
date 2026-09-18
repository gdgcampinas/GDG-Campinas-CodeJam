import type { UseCase } from '@/core/types/UseCase'
import type { Pet } from '../Pet'
import type { PetFilter } from '../PetFilter'
import type { PetRepository } from '../PetRepository'

export class ListPets implements UseCase<PetFilter | undefined, Pet[]> {
  private readonly repository: PetRepository
  constructor(repository: PetRepository) {
    this.repository = repository
  }
  execute(filter?: PetFilter) {
    return this.repository.findAll(filter)
  }
}
