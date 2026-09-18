import { assetUrl } from '@/core/utils/assetUrl'
import { delay } from '@/core/utils/delay'
import type { GalleryPhoto, PhotoGalleryRepository } from '../domain/PhotoGalleryRepository'

const FILES = [
  'dog1.jpg', 'dog2.jpg', 'dog3.jpg', 'dog4.jpg', 'dog5.jpg', 'dog6.jpg', 'dog7.jpg', 'dog8.jpg',
  'cat1.jpg', 'cat2.jpg', 'cat3.png', 'cat4.jpg',
]

export class MockPhotoGalleryRepository implements PhotoGalleryRepository {
  private readonly latencyMs: number

  constructor(latencyMs = 100) {
    this.latencyMs = latencyMs
  }

  async findAll(): Promise<GalleryPhoto[]> {
    await delay(this.latencyMs)
    return FILES.map((file) => ({ file, url: assetUrl(`mock/${file}`) }))
  }
}
