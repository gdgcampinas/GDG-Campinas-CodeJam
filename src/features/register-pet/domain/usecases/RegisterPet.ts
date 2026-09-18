import type { UseCase } from '@/core/types/UseCase'
import type { NewPet, Pet } from '@/features/pets/domain/Pet'
import type { PetRepository } from '@/features/pets/domain/PetRepository'

export class RegisterPet implements UseCase<NewPet, Pet> {
  private readonly repository: PetRepository

  constructor(repository: PetRepository) {
    this.repository = repository
  }

  execute(newPet: NewPet): Promise<Pet> {
    return this.repository.save(newPet)
  }
}
