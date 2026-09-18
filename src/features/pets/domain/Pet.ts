import type { GeoPoint } from '@/core/utils/geo'

export type PetSpecies = 'dog' | 'cat'
export type PetSize = 'small' | 'medium' | 'large'
export type PetStatus = 'lost' | 'abandoned' | 'adoption' | 'adopted'

export interface PetLocation extends GeoPoint {
  label: string
}

export interface Pet {
  id: string
  name: string
  species: PetSpecies
  breed: string
  color: string
  size: PetSize
  ageLabel: string
  status: PetStatus
  description: string
  traits: string[]
  photoUrl: string
  location: PetLocation
  reportedAt: string
  contactName: string
}

export type NewPet = Omit<Pet, 'id' | 'reportedAt'>
