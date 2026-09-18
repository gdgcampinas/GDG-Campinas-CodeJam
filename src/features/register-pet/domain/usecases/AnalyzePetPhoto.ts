import type { UseCase } from '@/core/types/UseCase'
import type { PetAnalysis } from '../PetAnalysis'
import type { PetAnalyzer } from '../PetAnalyzer'

export class AnalyzePetPhoto implements UseCase<string, PetAnalysis> {
  private readonly analyzer: PetAnalyzer

  constructor(analyzer: PetAnalyzer) {
    this.analyzer = analyzer
  }

  execute(photo: string): Promise<PetAnalysis> {
    return this.analyzer.analyze(photo)
  }
}
