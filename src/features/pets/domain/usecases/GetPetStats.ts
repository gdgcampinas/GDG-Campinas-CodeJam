import type { UseCase } from '@/core/types/UseCase'
import type { PetStatus } from '../Pet'
import type { PetRepository } from '../PetRepository'

export type PetStats = Record<PetStatus, number>

export class GetPetStats implements UseCase<void, PetStats> {
  private readonly repository: PetRepository
  constructor(repository: PetRepository) {
    this.repository = repository
  }
  async execute() {
    const pets = await this.repository.findAll()
    const stats: PetStats = { lost: 0, abandoned: 0, adoption: 0, adopted: 0 }
    for (const pet of pets) stats[pet.status] += 1
    return stats
  }
}
