export interface GalleryPhoto {
  file: string
  url: string
}

export interface PhotoGalleryRepository {
  findAll(): Promise<GalleryPhoto[]>
}
