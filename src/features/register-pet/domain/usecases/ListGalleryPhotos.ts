import type { UseCase } from '@/core/types/UseCase'
import type { GalleryPhoto, PhotoGalleryRepository } from '../PhotoGalleryRepository'

export class ListGalleryPhotos implements UseCase<void, GalleryPhoto[]> {
  private readonly repository: PhotoGalleryRepository

  constructor(repository: PhotoGalleryRepository) {
    this.repository = repository
  }

  execute(): Promise<GalleryPhoto[]> {
    return this.repository.findAll()
  }
}
