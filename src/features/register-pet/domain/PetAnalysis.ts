import type { PetSize, PetSpecies } from '@/features/pets/domain/Pet'

export interface PetAnalysis {
  species: PetSpecies
  breed: string
  color: string
  size: PetSize
  ageLabel: string
  traits: string[]
}
