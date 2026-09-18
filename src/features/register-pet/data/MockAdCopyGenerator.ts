import { delay } from '@/core/utils/delay'
import type { AdCopyGenerator, AdCopyParams } from '../domain/AdCopyGenerator'

export class MockAdCopyGenerator implements AdCopyGenerator {
  private readonly latencyMs: number

  constructor(latencyMs = 300) {
    this.latencyMs = latencyMs
  }

  async generate({ analysis, status, name }: AdCopyParams): Promise<string> {
    await delay(this.latencyMs)

    const petName = name?.trim() || (analysis.species === 'dog' ? 'Cãozinho' : 'Gatinho')
    const traitsText = analysis.traits.length > 0 ? analysis.traits.join(', ') : 'muito carinhoso'

    if (status === 'lost') {
      return `Procura-se urgente! ${petName}, ${analysis.breed} de cor ${analysis.color.toLowerCase()} (${analysis.ageLabel}). Características marcantes: ${traitsText}. Qualquer informação sobre seu paradeiro será imensamente bem-vinda!`
    }

    if (status === 'abandoned') {
      return `Pet resgatado precisando de acolhimento: ${petName}, um(a) ${analysis.breed} (${analysis.size === 'small' ? 'porte pequeno' : analysis.size === 'medium' ? 'porte médio' : 'porte grande'}). Encontrado precisando de cuidados. É ${traitsText}. Ajude a encontrar o tutor ou um lar temporário!`
    }

    // adoption / adopted
    return `Disponível para adoção responsável: ${petName}! Um amor de ${analysis.breed}, pelagem ${analysis.color.toLowerCase()} e com cerca de ${analysis.ageLabel}. É ${traitsText}. Pronto para encher seu lar de amor e companheirismo!`
  }
}
