import type { ChipOption, Tone } from '@/core/ui'
import type { PetSize, PetSpecies, PetStatus } from './Pet'

/** Fonte única de rótulos e cores. UI só lê daqui, nunca duplica. */
export const PET_STATUS_META: Record<PetStatus, { label: string; tone: Tone; icon: string }> = {
  lost: { label: 'Perdido', tone: 'danger', icon: '🔎' },
  abandoned: { label: 'Abandonado', tone: 'warning', icon: '🆘' },
  adoption: { label: 'Para adoção', tone: 'info', icon: '💛' },
  adopted: { label: 'Adotado', tone: 'success', icon: '🏡' },
}

export const PET_SPECIES_LABEL: Record<PetSpecies, string> = { dog: 'Cachorro', cat: 'Gato' }
export const PET_SIZE_LABEL: Record<PetSize, string> = { small: 'Pequeno', medium: 'Médio', large: 'Grande' }

const toOptions = <T extends string>(labels: Record<T, string>): ChipOption<T>[] =>
  (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }))

export const STATUS_OPTIONS = toOptions(
  Object.fromEntries(Object.entries(PET_STATUS_META).map(([k, v]) => [k, v.label])) as Record<PetStatus, string>,
)
export const SPECIES_OPTIONS = toOptions(PET_SPECIES_LABEL)
export const SIZE_OPTIONS = toOptions(PET_SIZE_LABEL)
