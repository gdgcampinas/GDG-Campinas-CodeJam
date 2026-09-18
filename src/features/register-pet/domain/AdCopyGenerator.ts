import type { PetStatus } from '@/features/pets/domain/Pet'
import type { PetAnalysis } from './PetAnalysis'

export interface AdCopyParams {
  analysis: PetAnalysis
  status: PetStatus
  name?: string
}

export interface AdCopyGenerator {
  generate(params: AdCopyParams): Promise<string>
}
