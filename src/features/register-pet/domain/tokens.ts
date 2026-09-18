import { createToken } from '@/core/di/container'
import type { UseCase } from '@/core/types/UseCase'
import type { NewPet, Pet } from '@/features/pets/domain/Pet'
import type { AdCopyGenerator, AdCopyParams } from './AdCopyGenerator'
import type { PetAnalysis } from './PetAnalysis'
import type { PetAnalyzer } from './PetAnalyzer'

export const PET_ANALYZER = createToken<PetAnalyzer>('PetAnalyzer')
export const AD_COPY_GENERATOR = createToken<AdCopyGenerator>('AdCopyGenerator')
export const ANALYZE_PET_PHOTO = createToken<UseCase<string, PetAnalysis>>('AnalyzePetPhoto')
export const GENERATE_AD_COPY = createToken<UseCase<AdCopyParams, string>>('GenerateAdCopy')
export const REGISTER_PET = createToken<UseCase<NewPet, Pet>>('RegisterPet')
