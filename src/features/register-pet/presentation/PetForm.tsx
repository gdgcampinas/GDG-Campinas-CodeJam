import type { FormEvent } from 'react'
import { Button, SelectField, TextAreaField, TextField } from '@/core/ui'
import { PET_STATUS_META, SIZE_OPTIONS, SPECIES_OPTIONS } from '@/features/pets/domain/petMeta'
import type { Neighborhood } from '../domain/Neighborhood'
import { REGISTRATION_STATUS_OPTIONS, type RegisterPetFormState } from '../domain/RegisterPetForm'

interface PetFormProps {
  form: RegisterPetFormState
  neighborhoods: readonly Neighborhood[]
  onChange: <K extends keyof RegisterPetFormState>(key: K, value: RegisterPetFormState[K]) => void
  onStatusChange: (status: RegisterPetFormState['status']) => void
  onRegenerate: () => void
  onSubmit: () => void
  submitting: boolean
  error: string | null
}

export function PetForm({ form, neighborhoods, onChange, onStatusChange, onRegenerate, onSubmit, submitting, error }: PetFormProps) {
  const neighborhoodOptions = neighborhoods.map((n) => ({ value: n.name, label: `📍 ${n.name}` }))
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <TextField id="pet-name" label="Nome do Pet (se souber)" placeholder="Ex.: Pipoca, Thor, ou deixe em branco" value={form.name} onChange={(v) => onChange('name', v)} />

      <div className="form-row">
        <SelectField id="pet-status" label="Situação *" value={form.status} options={REGISTRATION_STATUS_OPTIONS} onChange={onStatusChange} />
        <SelectField id="pet-neighborhood" label="Bairro em Campinas *" value={form.neighborhood} options={neighborhoodOptions} onChange={(v) => onChange('neighborhood', v)} />
      </div>

      <div className="form-row form-row--3">
        <SelectField id="pet-species" label="Espécie *" value={form.species} options={SPECIES_OPTIONS} onChange={(v) => onChange('species', v)} />
        <SelectField id="pet-size" label="Porte *" value={form.size} options={SIZE_OPTIONS} onChange={(v) => onChange('size', v)} />
        <TextField id="pet-age" label="Idade estimada" value={form.ageLabel} onChange={(v) => onChange('ageLabel', v)} />
      </div>

      <div className="form-row">
        <TextField id="pet-breed" label="Raça (detectada pela IA)" value={form.breed} onChange={(v) => onChange('breed', v)} />
        <TextField id="pet-color" label="Cor da pelagem" value={form.color} onChange={(v) => onChange('color', v)} />
      </div>

      <TextField id="pet-traits" label="Características e sinais (separadas por vírgula)" placeholder="Dócil, Coleira vermelha, Castrado" value={form.traits} onChange={(v) => onChange('traits', v)} />

      <TextAreaField
        id="pet-desc"
        label="Texto do anúncio (gerado pela IA)"
        value={form.description}
        onChange={(v) => onChange('description', v)}
        extra={<button type="button" className="form-btn-regen" onClick={onRegenerate}>✨ Regerar texto</button>}
      />

      <TextField id="pet-contact" label="Nome do contato ou ONG *" value={form.contactName} onChange={(v) => onChange('contactName', v)} required />

      {error && <span className="form-error" role="alert">{error}</span>}

      <Button type="submit" block disabled={submitting}>
        {submitting ? 'Publicando...' : `Publicar anúncio (${PET_STATUS_META[form.status].label})`}
      </Button>
    </form>
  )
}
