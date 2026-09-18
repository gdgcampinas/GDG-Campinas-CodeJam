import type { UseCase } from '@/core/types/UseCase'
import type { Pet } from '../Pet'
import type { PetRepository } from '../PetRepository'

export class GetPet implements UseCase<string, Pet | null> {
  private readonly repository: PetRepository
  constructor(repository: PetRepository) {
    this.repository = repository
  }
  execute(id: string) {
    return this.repository.findById(id)
  }
}
