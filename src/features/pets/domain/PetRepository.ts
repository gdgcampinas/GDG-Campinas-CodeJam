import type { NewPet, Pet } from './Pet'
import type { PetFilter } from './PetFilter'

export interface PetRepository {
  findAll(filter?: PetFilter): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
  save(pet: NewPet): Promise<Pet>
}
