import { Tag } from '@/core/ui'
import type { Pet } from '../domain/Pet'
import { PET_SIZE_LABEL, PET_SPECIES_LABEL, PET_STATUS_META } from '../domain/petMeta'
import './pets.css'

interface PetCardProps {
  pet: Pet
  onClick?: (pet: Pet) => void
  /** conteúdo extra opcional (ex.: score de compatibilidade) */
  footer?: React.ReactNode
  selected?: boolean
}

export function PetCard({ pet, onClick, footer, selected }: PetCardProps) {
  const status = PET_STATUS_META[pet.status]
  return (
    <article id={`pet-card-${pet.id}`} className={`pet-card ${selected ? 'is-selected' : ''}`} onClick={() => onClick?.(pet)}>
      <img className="pet-card__photo" src={pet.photoUrl} alt={pet.name} loading="lazy" />
      <div className="pet-card__body">
        <div className="pet-card__row">
          <h3>{pet.name}</h3>
          <Tag label={`${status.icon} ${status.label}`} tone={status.tone} />
        </div>
        <p className="pet-card__meta">
          {PET_SPECIES_LABEL[pet.species]} · {pet.breed} · {PET_SIZE_LABEL[pet.size]} · {pet.ageLabel}
        </p>
        <p className="pet-card__meta">📍 {pet.location.label}</p>
        {footer}
      </div>
    </article>
  )
}
