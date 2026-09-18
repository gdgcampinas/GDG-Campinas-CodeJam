import type { Container } from '@/core/di/container'
import { PET_REPOSITORY } from '@/features/pets/domain/tokens'
import { MockAdCopyGenerator } from './data/MockAdCopyGenerator'
import { MockPetAnalyzer } from './data/MockPetAnalyzer'
import {
  AD_COPY_GENERATOR,
  ANALYZE_PET_PHOTO,
  GENERATE_AD_COPY,
  PET_ANALYZER,
  REGISTER_PET,
} from './domain/tokens'
import { AnalyzePetPhoto } from './domain/usecases/AnalyzePetPhoto'
import { GenerateAdCopy } from './domain/usecases/GenerateAdCopy'
import { RegisterPet } from './domain/usecases/RegisterPet'

/** Módulo DI da feature register-pet. */
export function registerRegisterPetModule(container: Container) {
  container
    .register(PET_ANALYZER, () => new MockPetAnalyzer())
    .register(AD_COPY_GENERATOR, () => new MockAdCopyGenerator())
    .register(ANALYZE_PET_PHOTO, (c) => new AnalyzePetPhoto(c.resolve(PET_ANALYZER)))
    .register(GENERATE_AD_COPY, (c) => new GenerateAdCopy(c.resolve(AD_COPY_GENERATOR)))
    .register(REGISTER_PET, (c) => new RegisterPet(c.resolve(PET_REPOSITORY)))
}
