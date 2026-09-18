import { delay } from '@/core/utils/delay'
import type { PetAnalysis } from '../domain/PetAnalysis'
import type { PetAnalyzer } from '../domain/PetAnalyzer'

const MOCK_ANALYSES: Record<string, PetAnalysis> = {
  'dog1.jpg': {
    species: 'dog',
    breed: 'Vira-lata caramelo',
    color: 'Caramelo',
    size: 'medium',
    ageLabel: '2 anos',
    traits: ['Brincalhão', 'Dócil', 'Castrado'],
  },
  'dog2.jpg': {
    species: 'dog',
    breed: 'Labrador Retriever',
    color: 'Preto',
    size: 'large',
    ageLabel: '4 anos',
    traits: ['Coleira vermelha', 'Carinhoso', 'Porte grande'],
  },
  'dog3.jpg': {
    species: 'dog',
    breed: 'Poodle',
    color: 'Branco',
    size: 'small',
    ageLabel: '6 anos',
    traits: ['Manso', 'Pequeno porte', 'Pelagem encaracolada'],
  },
  'dog4.jpg': {
    species: 'dog',
    breed: 'Beagle',
    color: 'Tricolor (branco, preto e marrom)',
    size: 'medium',
    ageLabel: '1 ano',
    traits: ['Enérgico', 'Curioso', 'Orelhas caídas'],
  },
  'dog5.jpg': {
    species: 'dog',
    breed: 'Pastor Alemão',
    color: 'Preto e marrom',
    size: 'large',
    ageLabel: '5 anos',
    traits: ['Atento', 'Porte grande', 'Pelagem densa'],
  },
  'dog6.jpg': {
    species: 'dog',
    breed: 'Vira-lata',
    color: 'Branca e caramelo',
    size: 'small',
    ageLabel: '3 anos',
    traits: ['Dócil', 'Sociável', 'Porte pequeno'],
  },
  'dog7.jpg': {
    species: 'dog',
    breed: 'Husky Siberiano',
    color: 'Cinza e branco',
    size: 'large',
    ageLabel: '3 anos',
    traits: ['Ativo', 'Pelagem volumosa', 'Olhos expressivos'],
  },
  'dog8.jpg': {
    species: 'dog',
    breed: 'Shih Tzu',
    color: 'Dourado e branco',
    size: 'small',
    ageLabel: '7 anos',
    traits: ['Calmo', 'Ideal para apartamento', 'Pelagem longa'],
  },
  'cat1.jpg': {
    species: 'cat',
    breed: 'SRD',
    color: 'Cinza rajado',
    size: 'small',
    ageLabel: '8 meses',
    traits: ['Carinhoso', 'Olhos verdes', 'Usa caixa de areia'],
  },
  'cat2.jpg': {
    species: 'cat',
    breed: 'SRD',
    color: 'Laranja',
    size: 'medium',
    ageLabel: '2 anos',
    traits: ['Pelagem ruiva', 'Ágil', 'Alerta'],
  },
  'cat3.png': {
    species: 'cat',
    breed: 'Siamês',
    color: 'Creme e marrom',
    size: 'small',
    ageLabel: '4 anos',
    traits: ['Olhos azuis', 'Dócil', 'Tranquilo'],
  },
  'cat4.jpg': {
    species: 'cat',
    breed: 'Frajola SRD',
    color: 'Preto e branco',
    size: 'medium',
    ageLabel: '5 anos',
    traits: ['Ronronador', 'Tranquilo', 'Dócil'],
  },
}

/** Implementação mock da IA. Trocar por Gemini = nova classe + novo registro no DI. */
export class MockPetAnalyzer implements PetAnalyzer {
  private readonly latencyMs: number

  constructor(latencyMs = 600) {
    this.latencyMs = latencyMs
  }

  async analyze(photo: string): Promise<PetAnalysis> {
    await delay(this.latencyMs)

    for (const [filename, analysis] of Object.entries(MOCK_ANALYSES)) {
      if (photo.includes(filename)) {
        return { ...analysis }
      }
    }

    // Inferência para fotos enviadas via upload (blob ou base64)
    return {
      species: 'dog',
      breed: 'Vira-lata (SRD)',
      color: 'Caramelo mesclado',
      size: 'medium',
      ageLabel: 'Aprox. 2 anos',
      traits: ['Dócil', 'Sociável', 'Esperto'],
    }
  }
}
