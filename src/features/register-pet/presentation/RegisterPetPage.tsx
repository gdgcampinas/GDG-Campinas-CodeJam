import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInject } from '@/core/di/DiProvider'
import { Button, PageHeader, Spinner, Tag } from '@/core/ui'
import { assetUrl } from '@/core/utils/assetUrl'
import type { NewPet, PetSize, PetSpecies, PetStatus } from '@/features/pets/domain/Pet'
import {
  PET_SIZE_LABEL,
  PET_SPECIES_LABEL,
  PET_STATUS_META,
  SIZE_OPTIONS,
  SPECIES_OPTIONS,
} from '@/features/pets/domain/petMeta'
import { CAMPINAS_NEIGHBORHOODS } from '../data/campinasNeighborhoods'
import type { PetAnalysis } from '../domain/PetAnalysis'
import { ANALYZE_PET_PHOTO, GENERATE_AD_COPY, REGISTER_PET } from '../domain/tokens'
import './register.css'

const MOCK_PHOTOS = [
  'dog1.jpg',
  'dog2.jpg',
  'dog3.jpg',
  'dog4.jpg',
  'dog5.jpg',
  'dog6.jpg',
  'dog7.jpg',
  'dog8.jpg',
  'cat1.jpg',
  'cat2.jpg',
  'cat3.png',
  'cat4.jpg',
].map((file) => ({
  file,
  url: assetUrl(`mock/${file}`),
}))

const REGISTRATION_STATUS_OPTIONS: { value: PetStatus; label: string }[] = [
  { value: 'abandoned', label: '🆘 Abandonado / Resgatado' },
  { value: 'lost', label: '🔎 Perdido (procurando tutor)' },
  { value: 'adoption', label: '💛 Para adoção' },
]

export function RegisterPetPage() {
  const analyzePhotoUseCase = useInject(ANALYZE_PET_PHOTO)
  const generateAdCopyUseCase = useInject(GENERATE_AD_COPY)
  const registerPetUseCase = useInject(REGISTER_PET)
  const navigate = useNavigate()

  const [selectedPhoto, setSelectedPhoto] = useState(MOCK_PHOTOS[0].url)
  const [analyzing, setAnalyzing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [analysis, setAnalysis] = useState<PetAnalysis | null>(null)

  // Campos do formulário
  const [name, setName] = useState('')
  const [species, setSpecies] = useState<PetSpecies>('dog')
  const [breed, setBreed] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState<PetSize>('medium')
  const [ageLabel, setAgeLabel] = useState('')
  const [status, setStatus] = useState<PetStatus>('abandoned')
  const [neighborhood, setNeighborhood] = useState(CAMPINAS_NEIGHBORHOODS[0].name)
  const [traitsString, setTraitsString] = useState('')
  const [contactName, setContactName] = useState('Protetor Independente')
  const [description, setDescription] = useState('')

  // Dispara a análise com IA e o preenchimento automático
  const handlePhotoSelect = useCallback(
    async (photoUrl: string) => {
      setSelectedPhoto(photoUrl)
      setAnalyzing(true)
      try {
        const result = await analyzePhotoUseCase.execute(photoUrl)
        setAnalysis(result)
        setSpecies(result.species)
        setBreed(result.breed)
        setColor(result.color)
        setSize(result.size)
        setAgeLabel(result.ageLabel)
        setTraitsString(result.traits.join(', '))

        const copy = await generateAdCopyUseCase.execute({
          analysis: result,
          status,
          name: name.trim() || undefined,
        })
        setDescription(copy)
      } finally {
        setAnalyzing(false)
      }
    },
    [analyzePhotoUseCase, generateAdCopyUseCase, status, name],
  )

  // Carrega a primeira foto e executa análise inicial
  useEffect(() => {
    let active = true
    analyzePhotoUseCase.execute(MOCK_PHOTOS[0].url).then(async (result) => {
      if (!active) return
      setAnalysis(result)
      setSpecies(result.species)
      setBreed(result.breed)
      setColor(result.color)
      setSize(result.size)
      setAgeLabel(result.ageLabel)
      setTraitsString(result.traits.join(', '))
      const copy = await generateAdCopyUseCase.execute({
        analysis: result,
        status: 'abandoned',
      })
      if (active) setDescription(copy)
    })
    return () => {
      active = false
    }
  }, [analyzePhotoUseCase, generateAdCopyUseCase])

  // Upload local via input file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    handlePhotoSelect(objectUrl)
  }

  // Regerar texto com IA
  const handleRegenerateCopy = async () => {
    if (!analysis) return
    const currentAnalysis: PetAnalysis = {
      species,
      breed: breed || analysis.breed,
      color: color || analysis.color,
      size,
      ageLabel: ageLabel || analysis.ageLabel,
      traits: traitsString
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }
    const copy = await generateAdCopyUseCase.execute({
      analysis: currentAnalysis,
      status,
      name: name.trim() || undefined,
    })
    setDescription(copy)
  }

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const selectedNeighborhood =
      CAMPINAS_NEIGHBORHOODS.find((n) => n.name === neighborhood) ?? CAMPINAS_NEIGHBORHOODS[0]

    const newPet: NewPet = {
      name: name.trim() || (species === 'dog' ? 'Cãozinho resgatado' : 'Gatinho resgatado'),
      species,
      breed: breed.trim() || 'SRD',
      color: color.trim() || 'Misto',
      size,
      ageLabel: ageLabel.trim() || 'Jovem',
      status,
      description: description.trim(),
      traits: traitsString
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      photoUrl: selectedPhoto,
      location: {
        lat: selectedNeighborhood.lat,
        lng: selectedNeighborhood.lng,
        label: selectedNeighborhood.name,
      },
      contactName: contactName.trim() || 'Protetor em Campinas',
    }

    try {
      const created = await registerPetUseCase.execute(newPet)
      navigate(`/pet/${created.id}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Cadastrar Pet"
        subtitle="Envie a foto: a IA preenche as características e você publica o anúncio em instantes"
      />

      <div className="register-layout">
        {/* Coluna da Esquerda: Foto + Análise da IA */}
        <div className="register-media">
          <div className="register-preview">
            <img src={selectedPhoto} alt="Pré-visualização do pet" className="register-preview__img" />
            {analyzing && (
              <div className="register-preview__loading">
                <Spinner />
                <span>✨ IA analisando foto...</span>
              </div>
            )}
            {!analyzing && analysis && (
              <span className="register-preview__badge">✨ IA Concluída</span>
            )}
          </div>

          <div className="register-upload">
            <label className="register-upload__btn">
              📷 Enviar foto do dispositivo
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="mock-gallery">
            <span className="mock-gallery__title">Ou escolha da galeria rápida:</span>
            <div className="mock-gallery__grid">
              {MOCK_PHOTOS.map(({ file, url }) => (
                <button
                  type="button"
                  key={file}
                  className={`mock-gallery__thumb ${selectedPhoto === url ? 'is-active' : ''}`}
                  onClick={() => handlePhotoSelect(url)}
                  title={file}
                >
                  <img src={url} alt={file} />
                </button>
              ))}
            </div>
          </div>

          {analysis && (
            <div className="ai-card">
              <div className="ai-card__header">
                <span>🤖 Diagnóstico Visual da IA</span>
              </div>
              <div className="ai-card__grid">
                <div className="ai-card__item">
                  Espécie: <strong>{PET_SPECIES_LABEL[analysis.species]}</strong>
                </div>
                <div className="ai-card__item">
                  Raça detectada: <strong>{analysis.breed}</strong>
                </div>
                <div className="ai-card__item">
                  Cor aparente: <strong>{analysis.color}</strong>
                </div>
                <div className="ai-card__item">
                  Porte estimado: <strong>{PET_SIZE_LABEL[analysis.size]}</strong>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                {analysis.traits.map((trait) => (
                  <Tag key={trait} label={trait} tone="info" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coluna da Direita: Formulário Editável */}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pet-name">Nome do Pet (se souber)</label>
            <input
              id="pet-name"
              className="form-input"
              type="text"
              placeholder="Ex.: Pipoca, Thor, ou deixe em branco"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pet-status">Situação / Status *</label>
              <select
                id="pet-status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as PetStatus)}
              >
                {REGISTRATION_STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pet-neighborhood">Bairro em Campinas *</label>
              <select
                id="pet-neighborhood"
                className="form-select"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              >
                {CAMPINAS_NEIGHBORHOODS.map((n) => (
                  <option key={n.name} value={n.name}>
                    📍 {n.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row--3 form-row">
            <div className="form-group">
              <label htmlFor="pet-species">Espécie *</label>
              <select
                id="pet-species"
                className="form-select"
                value={species}
                onChange={(e) => setSpecies(e.target.value as PetSpecies)}
              >
                {SPECIES_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pet-size">Porte *</label>
              <select
                id="pet-size"
                className="form-select"
                value={size}
                onChange={(e) => setSize(e.target.value as PetSize)}
              >
                {SIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pet-age">Idade Estimada</label>
              <input
                id="pet-age"
                className="form-input"
                type="text"
                value={ageLabel}
                onChange={(e) => setAgeLabel(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pet-breed">Raça (detectada pela IA)</label>
              <input
                id="pet-breed"
                className="form-input"
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pet-color">Cor da Pelagem</label>
              <input
                id="pet-color"
                className="form-input"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pet-traits">Características & Sinais (separadas por vírgula)</label>
            <input
              id="pet-traits"
              className="form-input"
              type="text"
              placeholder="Dócil, Coleira vermelha, Castrado"
              value={traitsString}
              onChange={(e) => setTraitsString(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="form-copy-header">
              <label htmlFor="pet-desc">Texto do Anúncio (gerado com carinho pela IA)</label>
              <button
                type="button"
                className="form-btn-regen"
                onClick={handleRegenerateCopy}
                title="Regerar descrição com base nos dados atuais"
              >
                ✨ Regerar texto com IA
              </button>
            </div>
            <textarea
              id="pet-desc"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pet-contact">Nome do Contato ou ONG *</label>
            <input
              id="pet-contact"
              className="form-input"
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            block
            disabled={saving || analyzing}
          >
            {saving ? 'Publicando...' : `Publicar Anúncio (${PET_STATUS_META[status].label})`}
          </Button>
        </form>
      </div>
    </>
  )
}
