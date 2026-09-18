import type { Neighborhood } from './Neighborhood'

export interface NeighborhoodRepository {
  findAll(): Promise<Neighborhood[]>
}
