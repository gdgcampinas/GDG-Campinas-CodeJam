import type { UseCase } from '@/core/types/UseCase'
import type { AdCopyGenerator, AdCopyParams } from '../AdCopyGenerator'

export class GenerateAdCopy implements UseCase<AdCopyParams, string> {
  private readonly generator: AdCopyGenerator

  constructor(generator: AdCopyGenerator) {
    this.generator = generator
  }

  execute(params: AdCopyParams): Promise<string> {
    return this.generator.generate(params)
  }
}
