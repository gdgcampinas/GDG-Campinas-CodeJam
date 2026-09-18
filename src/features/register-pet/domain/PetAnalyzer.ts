import type { PetAnalysis } from './PetAnalysis'

export interface PetAnalyzer {
  analyze(photo: string): Promise<PetAnalysis>
}
