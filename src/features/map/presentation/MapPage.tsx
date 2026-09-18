import { useState } from 'react'
import { useInject } from '@/core/di/DiProvider'
import { useAsync } from '@/core/hooks/useAsync'
import { FilterChips, ItemList, PageHeader } from '@/core/ui'
import type { PetFilter } from '@/features/pets/domain/PetFilter'
import { SPECIES_OPTIONS, STATUS_OPTIONS } from '@/features/pets/domain/petMeta'
import { LIST_PETS } from '@/features/pets/domain/tokens'
import { PetCard } from '@/features/pets/presentation/PetCard'
import { PetMap } from './PetMap'
import './map.css'

export function MapPage() {
  const listPets = useInject(LIST_PETS)
  const [filter, setFilter] = useState<PetFilter>({})
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const pets = useAsync(() => listPets.execute(filter), [filter])

  const patchFilter = (partial: Partial<PetFilter>) => {
    setFilter((prev) => ({ ...prev, ...partial }))
  }

  const handleSelectPet = (petId: string) => {
    setSelectedPetId(petId)
    // Rolagem suave na lista lateral para o card correspondente
    const cardEl = document.getElementById(`pet-card-${petId}`)
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  return (
    <>
      <PageHeader
        title="Mapa de Pets"
        subtitle="Explore pets perdidos, abandonados e para adoção em Campinas"
      />

      <FilterChips
        options={STATUS_OPTIONS}
        value={filter.status}
        onChange={(status) => patchFilter({ status })}
        allLabel="Todos os status"
      />
      <FilterChips
        options={SPECIES_OPTIONS}
        value={filter.species}
        onChange={(species) => patchFilter({ species })}
        allLabel="Cães e gatos"
      />

      <div className="map-view">
        <aside className="map-view__sidebar">
          <ItemList
            items={pets.data}
            loading={pets.loading}
            keyOf={(pet) => pet.id}
            renderItem={(pet) => (
              <PetCard
                pet={pet}
                selected={pet.id === selectedPetId}
                onClick={() => handleSelectPet(pet.id)}
              />
            )}
            emptyTitle="Nenhum pet encontrado"
            emptyHint="Tente alterar os filtros de busca"
          />
        </aside>

        <PetMap
          pets={pets.data || []}
          selectedPetId={selectedPetId}
          onSelectPet={handleSelectPet}
        />
      </div>
    </>
  )
}
