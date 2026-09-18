import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInject } from '@/core/di/DiProvider'
import { useAsync } from '@/core/hooks/useAsync'
import { FilterChips, ItemList, PageHeader, StatCard } from '@/core/ui'
import type { PetFilter } from '../domain/PetFilter'
import { SPECIES_OPTIONS, STATUS_OPTIONS } from '../domain/petMeta'
import { GET_PET_STATS, LIST_PETS } from '../domain/tokens'
import { PetCard } from './PetCard'
import './pets.css'

export function PetsPage() {
  const listPets = useInject(LIST_PETS)
  const getStats = useInject(GET_PET_STATS)
  const navigate = useNavigate()
  const [filter, setFilter] = useState<PetFilter>({})

  const pets = useAsync(() => listPets.execute(filter), [filter])
  const stats = useAsync(() => getStats.execute(), [])

  const patch = (partial: Partial<PetFilter>) => setFilter((prev) => ({ ...prev, ...partial }))

  return (
    <>
      <PageHeader title="Ache, ajude e adote" subtitle="Pets perdidos, abandonados e para adoção em Campinas" />
      {stats.data && (
        <div className="stats">
          <StatCard icon="🏡" value={stats.data.adopted} label="adotados" />
          <StatCard icon="💛" value={stats.data.adoption} label="esperando lar" />
          <StatCard icon="🔎" value={stats.data.lost + stats.data.abandoned} label="precisam de ajuda" />
        </div>
      )}
      <FilterChips options={STATUS_OPTIONS} value={filter.status} onChange={(status) => patch({ status })} allLabel="Todos" />
      <FilterChips options={SPECIES_OPTIONS} value={filter.species} onChange={(species) => patch({ species })} allLabel="Cães e gatos" />
      <ItemList
        items={pets.data}
        loading={pets.loading}
        keyOf={(pet) => pet.id}
        renderItem={(pet) => <PetCard pet={pet} onClick={() => navigate(`/pet/${pet.id}`)} />}
        emptyTitle="Nenhum pet encontrado"
        emptyHint="Tente mudar os filtros"
      />
    </>
  )
}
