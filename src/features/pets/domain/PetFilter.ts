import type { Pet, PetSize, PetSpecies, PetStatus } from './Pet'

export interface PetFilter {
  status?: PetStatus
  species?: PetSpecies
  size?: PetSize
  query?: string
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** Regra de filtro pura, compartilhada por qualquer implementação de repositório. */
export function matchesFilter(pet: Pet, filter: PetFilter = {}): boolean {
  if (filter.status && pet.status !== filter.status) return false
  if (filter.species && pet.species !== filter.species) return false
  if (filter.size && pet.size !== filter.size) return false
  if (filter.query) {
    const haystack = norm([pet.name, pet.breed, pet.color, pet.location.label].join(' '))
    if (!haystack.includes(norm(filter.query))) return false
  }
  return true
}
