import type { GeoPoint } from '@/core/utils/geo'

export interface Neighborhood extends GeoPoint {
  name: string
}

export const CAMPINAS_NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Cambuí', lat: -22.8967, lng: -47.0503 },
  { name: 'Barão Geraldo', lat: -22.8186, lng: -47.0697 },
  { name: 'Centro', lat: -22.9056, lng: -47.0608 },
  { name: 'Taquaral', lat: -22.8768, lng: -47.0489 },
  { name: 'Sousas', lat: -22.87, lng: -46.97 },
  { name: 'Nova Campinas', lat: -22.889, lng: -47.033 },
  { name: 'Vila Industrial', lat: -22.915, lng: -47.045 },
  { name: 'Chapadão', lat: -22.883, lng: -47.027 },
  { name: 'Guanabara', lat: -22.894, lng: -47.048 },
  { name: 'Bosque', lat: -22.9022, lng: -47.055 },
  { name: 'Ponte Preta', lat: -22.91, lng: -47.065 },
  { name: 'Mansões Santo Antônio', lat: -22.862, lng: -47.043 },
  { name: 'Swiss Park', lat: -22.964, lng: -47.062 },
  { name: 'Parque Prado', lat: -22.938, lng: -47.047 },
]
