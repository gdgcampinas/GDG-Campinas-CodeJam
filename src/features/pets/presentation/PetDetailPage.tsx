import { useParams } from 'react-router-dom'
import { useInject } from '@/core/di/DiProvider'
import { useAsync } from '@/core/hooks/useAsync'
import { Button, EmptyState, PageHeader, Spinner, Tag } from '@/core/ui'
import { PET_SIZE_LABEL, PET_SPECIES_LABEL, PET_STATUS_META } from '../domain/petMeta'
import { GET_PET } from '../domain/tokens'
import './pets.css'

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('pt-BR')

export function PetDetailPage() {
  const { id = '' } = useParams()
  const getPet = useInject(GET_PET)
  const { data: pet, loading } = useAsync(() => getPet.execute(id), [id])

  if (loading) return <Spinner />
  if (!pet) return <EmptyState icon="🤷" title="Pet não encontrado" />

  const status = PET_STATUS_META[pet.status]
  const facts: [string, string][] = [
    ['Espécie', PET_SPECIES_LABEL[pet.species]],
    ['Raça', pet.breed],
    ['Cor', pet.color],
    ['Porte', PET_SIZE_LABEL[pet.size]],
    ['Idade', pet.ageLabel],
    ['Local', pet.location.label],
    ['Registrado em', formatDate(pet.reportedAt)],
  ]

  return (
    <>
      <PageHeader title={pet.name} back action={<Tag label={`${status.icon} ${status.label}`} tone={status.tone} />} />
      <div className="pet-detail">
        <img className="pet-detail__photo" src={pet.photoUrl} alt={pet.name} />
        <div>
          <p className="pet-detail__desc">{pet.description}</p>
          <div className="pet-detail__traits">
            {pet.traits.map((t) => <Tag key={t} label={t} />)}
          </div>
          <dl className="facts">
            {facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <Button block onClick={() => alert(`(mock) Contato enviado para ${pet.contactName}`)}>
            {pet.status === 'lost' ? 'Vi este pet!' : pet.status === 'adopted' ? 'Já tem um lar 💚' : 'Quero ajudar / adotar'}
          </Button>
        </div>
      </div>
    </>
  )
}
