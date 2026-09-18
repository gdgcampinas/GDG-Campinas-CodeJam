import type { NewPet, PetSize, PetSpecies, PetStatus } from '@/features/pets/domain/Pet'
import { PET_STATUS_META } from '@/features/pets/domain/petMeta'
import type { Neighborhood } from './Neighborhood'
import type { PetAnalysis } from './PetAnalysis'
import { formatTraits, parseTraits } from '../utils/traits'

export interface RegisterPetFormState {
  name: string
  species: PetSpecies
  breed: string
  color: string
  size: PetSize
  ageLabel: string
  status: PetStatus
  neighborhood: string
  traits: string
  contactName: string
  description: string
}

export const INITIAL_FORM: RegisterPetFormState = {
  name: '',
  species: 'dog',
  breed: '',
  color: '',
  size: 'medium',
  ageLabel: '',
  status: 'abandoned',
  neighborhood: '',
  traits: '',
  contactName: 'Protetor Independente',
  description: '',
}

/** Status que um cidadão pode informar ao cadastrar (adotado é consequência). */
export const REGISTRATION_STATUSES: readonly PetStatus[] = ['abandoned', 'lost', 'adoption']

export const REGISTRATION_STATUS_OPTIONS = REGISTRATION_STATUSES.map((value) => ({
  value,
  label: `${PET_STATUS_META[value].icon} ${PET_STATUS_META[value].label}`,
}))

export const fromAnalysis = (a: PetAnalysis): Partial<RegisterPetFormState> => ({
  species: a.species,
  breed: a.breed,
  color: a.color,
  size: a.size,
  ageLabel: a.ageLabel,
  traits: formatTraits(a.traits),
})

export const toAnalysis = (f: RegisterPetFormState): PetAnalysis => ({
  species: f.species,
  breed: f.breed.trim() || 'SRD',
  color: f.color.trim() || 'Misto',
  size: f.size,
  ageLabel: f.ageLabel.trim() || 'Jovem',
  traits: parseTraits(f.traits),
})

export function toNewPet(form: RegisterPetFormState, photoUrl: string, place: Neighborhood): NewPet {
  const analysis = toAnalysis(form)
  const fallbackName = form.species === 'dog' ? 'Cãozinho resgatado' : 'Gatinho resgatado'
  return {
    ...analysis,
    name: form.name.trim() || fallbackName,
    status: form.status,
    description: form.description.trim(),
    photoUrl,
    location: { lat: place.lat, lng: place.lng, label: place.name },
    contactName: form.contactName.trim() || 'Protetor em Campinas',
  }
}
