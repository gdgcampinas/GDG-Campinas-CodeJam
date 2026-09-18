import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Pet } from '@/features/pets/domain/Pet'
import { PET_STATUS_META } from '@/features/pets/domain/petMeta'

interface PetMapProps {
  pets: readonly Pet[]
  selectedPetId?: string | null
  onSelectPet?: (petId: string) => void
}

const CAMPINAS_CENTER: [number, number] = [-22.9056, -47.0608]

const STATUS_HEX: Record<string, string> = {
  lost: '#d94141',
  abandoned: '#e59a0b',
  adoption: '#3b7ddd',
  adopted: '#2e9e6b',
}

function createPinIcon(pet: Pet, isSelected: boolean): L.DivIcon {
  const meta = PET_STATUS_META[pet.status]
  const color = STATUS_HEX[pet.status] || '#f26a2e'

  const html = `
    <div class="map-pin ${isSelected ? 'is-selected' : ''}" style="--pin-color: ${color};">
      <div class="map-pin__circle">
        <span class="map-pin__icon">${meta.icon}</span>
      </div>
      <div class="map-pin__arrow"></div>
    </div>
  `

  return L.divIcon({
    className: 'custom-map-pin',
    html,
    iconSize: isSelected ? [42, 50] : [36, 44],
    iconAnchor: isSelected ? [21, 50] : [18, 44],
    popupAnchor: [0, -42],
  })
}

export function PetMap({ pets, selectedPetId, onSelectPet }: PetMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())

  // Inicialização única do mapa Leaflet
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: CAMPINAS_CENTER,
      zoom: 12,
      zoomControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    mapRef.current = map

    // Corrige renderização inicial de tiles em containers com animação/flex
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 250)

    return () => {
      clearTimeout(timer)
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Atualização dos markers conforme a lista de pets
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Limpa markers anteriores
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    pets.forEach((pet) => {
      const isSelected = pet.id === selectedPetId
      const icon = createPinIcon(pet, isSelected)
      const marker = L.marker([pet.location.lat, pet.location.lng], { icon })

      const meta = PET_STATUS_META[pet.status]
      const popupHtml = `
        <div class="map-popup">
          <img src="${pet.photoUrl}" alt="${pet.name}" class="map-popup__photo" />
          <div class="map-popup__body">
            <div class="map-popup__header">
              <strong>${pet.name}</strong>
              <span class="tag tag--${meta.tone}">${meta.icon} ${meta.label}</span>
            </div>
            <p class="map-popup__sub">${pet.breed} · 📍 ${pet.location.label}</p>
            <a href="#/pet/${pet.id}" class="map-popup__btn">Ver detalhes →</a>
          </div>
        </div>
      `

      marker.bindPopup(popupHtml, { maxWidth: 260 })

      marker.on('click', () => {
        onSelectPet?.(pet.id)
      })

      marker.addTo(map)
      markersRef.current.set(pet.id, marker)
    })
  }, [pets, onSelectPet, selectedPetId])

  // Centraliza e abre popup quando o pet selecionado muda via clique na lista
  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedPetId) return

    const marker = markersRef.current.get(selectedPetId)
    if (marker) {
      map.panTo(marker.getLatLng(), { animate: true, duration: 0.5 })
      marker.openPopup()
    }
  }, [selectedPetId])

  return (
    <div className="map-view__container">
      <div ref={mapContainerRef} className="map-view__map" />
    </div>
  )
}
