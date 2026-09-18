import type { ChangeEvent, ReactNode } from 'react'
import './photoPicker.css'

export interface PickerPhoto {
  id: string
  url: string
}

interface PhotoPickerProps {
  selected: string
  photos: readonly PickerPhoto[]
  onSelect: (url: string) => void
  /** camada sobre a prévia (ex.: "analisando...", selo de resultado) */
  overlay?: ReactNode
  alt?: string
  uploadLabel?: string
  galleryTitle?: string
}

/** Prévia + upload local + galeria rápida. Só emite a URL escolhida. */
export function PhotoPicker({
  selected,
  photos,
  onSelect,
  overlay,
  alt = 'Pré-visualização',
  uploadLabel = '📷 Enviar foto do dispositivo',
  galleryTitle = 'Ou escolha da galeria rápida:',
}: PhotoPickerProps) {
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onSelect(URL.createObjectURL(file))
  }

  return (
    <div className="photo-picker">
      <div className="photo-picker__preview">
        <img src={selected} alt={alt} />
        {overlay}
      </div>

      <label className="photo-picker__upload">
        {uploadLabel}
        <input type="file" accept="image/*" onChange={handleUpload} />
      </label>

      <div className="photo-picker__gallery">
        <span className="photo-picker__title">{galleryTitle}</span>
        <div className="photo-picker__grid">
          {photos.map((photo) => (
            <button
              type="button"
              key={photo.id}
              className={`photo-picker__thumb ${selected === photo.url ? 'is-active' : ''}`}
              onClick={() => onSelect(photo.url)}
              title={photo.id}
            >
              <img src={photo.url} alt={photo.id} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
