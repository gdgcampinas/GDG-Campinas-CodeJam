import type { Container } from '@/core/di/container'
import { PET_REPOSITORY } from '@/features/pets/domain/tokens'
import { MockAdCopyGenerator } from './data/MockAdCopyGenerator'
import { MockNeighborhoodRepository } from './data/MockNeighborhoodRepository'
import { MockPetAnalyzer } from './data/MockPetAnalyzer'
import { MockPhotoGalleryRepository } from './data/MockPhotoGalleryRepository'
import {
  AD_COPY_GENERATOR,
  ANALYZE_PET_PHOTO,
  GENERATE_AD_COPY,
  LIST_GALLERY_PHOTOS,
  LIST_NEIGHBORHOODS,
  NEIGHBORHOOD_REPOSITORY,
  PET_ANALYZER,
  PHOTO_GALLERY_REPOSITORY,
  REGISTER_PET,
} from './domain/tokens'
import { AnalyzePetPhoto } from './domain/usecases/AnalyzePetPhoto'
import { GenerateAdCopy } from './domain/usecases/GenerateAdCopy'
import { ListGalleryPhotos } from './domain/usecases/ListGalleryPhotos'
import { ListNeighborhoods } from './domain/usecases/ListNeighborhoods'
import { RegisterPet } from './domain/usecases/RegisterPet'

/** Módulo DI da feature register-pet. */
export function registerRegisterPetModule(container: Container) {
  container
    .register(PET_ANALYZER, () => new MockPetAnalyzer())
    .register(AD_COPY_GENERATOR, () => new MockAdCopyGenerator())
    .register(NEIGHBORHOOD_REPOSITORY, () => new MockNeighborhoodRepository())
    .register(PHOTO_GALLERY_REPOSITORY, () => new MockPhotoGalleryRepository())
    .register(LIST_NEIGHBORHOODS, (c) => new ListNeighborhoods(c.resolve(NEIGHBORHOOD_REPOSITORY)))
    .register(LIST_GALLERY_PHOTOS, (c) => new ListGalleryPhotos(c.resolve(PHOTO_GALLERY_REPOSITORY)))
    .register(ANALYZE_PET_PHOTO, (c) => new AnalyzePetPhoto(c.resolve(PET_ANALYZER)))
    .register(GENERATE_AD_COPY, (c) => new GenerateAdCopy(c.resolve(AD_COPY_GENERATOR)))
    .register(REGISTER_PET, (c) => new RegisterPet(c.resolve(PET_REPOSITORY)))
}
