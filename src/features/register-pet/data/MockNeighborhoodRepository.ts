import { delay } from '@/core/utils/delay'
import type { Neighborhood } from '../domain/Neighborhood'
import type { NeighborhoodRepository } from '../domain/NeighborhoodRepository'
import { CAMPINAS_NEIGHBORHOODS } from './campinasNeighborhoods'

export class MockNeighborhoodRepository implements NeighborhoodRepository {
  private readonly latencyMs: number

  constructor(latencyMs = 100) {
    this.latencyMs = latencyMs
  }

  async findAll(): Promise<Neighborhood[]> {
    await delay(this.latencyMs)
    return [...CAMPINAS_NEIGHBORHOODS]
  }
}
