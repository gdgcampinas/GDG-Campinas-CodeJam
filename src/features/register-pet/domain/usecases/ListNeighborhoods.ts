import type { UseCase } from '@/core/types/UseCase'
import type { Neighborhood } from '../Neighborhood'
import type { NeighborhoodRepository } from '../NeighborhoodRepository'

export class ListNeighborhoods implements UseCase<void, Neighborhood[]> {
  private readonly repository: NeighborhoodRepository

  constructor(repository: NeighborhoodRepository) {
    this.repository = repository
  }

  execute(): Promise<Neighborhood[]> {
    return this.repository.findAll()
  }
}
