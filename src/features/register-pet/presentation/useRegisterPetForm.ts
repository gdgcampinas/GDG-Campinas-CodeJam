import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInject } from '@/core/di/DiProvider'
import { useAsync } from '@/core/hooks/useAsync'
import type { PetAnalysis } from '../domain/PetAnalysis'
import {
  fromAnalysis,
  INITIAL_FORM,
  toAnalysis,
  toNewPet,
  type RegisterPetFormState,
} from '../domain/RegisterPetForm'
import {
  ANALYZE_PET_PHOTO,
  GENERATE_AD_COPY,
  LIST_GALLERY_PHOTOS,
  LIST_NEIGHBORHOODS,
  REGISTER_PET,
} from '../domain/tokens'

const errorMessage = (e: unknown, fallback: string) => (e instanceof Error ? e.message : fallback)

/** Orquestra foto → análise → formulário → anúncio → publicação. */
export function useRegisterPetForm() {
  const analyzePhoto = useInject(ANALYZE_PET_PHOTO)
  const generateCopy = useInject(GENERATE_AD_COPY)
  const registerPet = useInject(REGISTER_PET)
  const listPhotos = useInject(LIST_GALLERY_PHOTOS)
  const listNeighborhoods = useInject(LIST_NEIGHBORHOODS)
  const navigate = useNavigate()

  const photos = useAsync(() => listPhotos.execute(), [])
  const neighborhoods = useAsync(() => listNeighborhoods.execute(), [])

  const [form, setForm] = useState<RegisterPetFormState>(INITIAL_FORM)
  const [photo, setPhoto] = useState('')
  const [analysis, setAnalysis] = useState<PetAnalysis | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const descriptionEdited = useRef(false)
  const latestRequest = useRef(0)

  const setField = useCallback(<K extends keyof RegisterPetFormState>(key: K, value: RegisterPetFormState[K]) => {
    if (key === 'description') descriptionEdited.current = true
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const selectPhoto = useCallback(
    async (url: string) => {
      const requestId = ++latestRequest.current
      const isStale = () => requestId !== latestRequest.current
      setPhoto(url)
      setAnalyzing(true)
      setError(null)
      try {
        const result = await analyzePhoto.execute(url)
        if (isStale()) return
        setAnalysis(result)
        const patch = fromAnalysis(result)
        setForm((prev) => ({ ...prev, ...patch }))
        const description = await generateCopy.execute({ analysis: result, status: form.status, name: form.name.trim() || undefined })
        if (isStale()) return
        descriptionEdited.current = false
        setForm((prev) => ({ ...prev, description }))
      } catch (e) {
        if (!isStale()) setError(errorMessage(e, 'Não foi possível analisar a foto.'))
      } finally {
        if (!isStale()) setAnalyzing(false)
      }
    },
    [analyzePhoto, generateCopy, form.status, form.name],
  )

  const regenerateCopy = useCallback(
    async (overrides: Partial<RegisterPetFormState> = {}) => {
      const current = { ...form, ...overrides }
      try {
        const description = await generateCopy.execute({
          analysis: toAnalysis(current),
          status: current.status,
          name: current.name.trim() || undefined,
        })
        descriptionEdited.current = false
        setForm((prev) => ({ ...prev, description }))
      } catch (e) {
        setError(errorMessage(e, 'Não foi possível gerar o texto.'))
      }
    },
    [form, generateCopy],
  )

  /** Trocar o status atualiza o anúncio, exceto se a pessoa já editou o texto. */
  const changeStatus = useCallback(
    (status: RegisterPetFormState['status']) => {
      setField('status', status)
      if (analysis && !descriptionEdited.current) void regenerateCopy({ status })
    },
    [analysis, regenerateCopy, setField],
  )

  // Primeira foto da galeria já dispara a análise ao abrir a página.
  const firstPhoto = photos.data?.[0]?.url
  useEffect(() => {
    if (firstPhoto) void selectPhoto(firstPhoto)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPhoto])

  // Bairro padrão assim que a lista chega.
  const firstNeighborhood = neighborhoods.data?.[0]?.name
  useEffect(() => {
    if (firstNeighborhood) setForm((prev) => (prev.neighborhood ? prev : { ...prev, neighborhood: firstNeighborhood }))
  }, [firstNeighborhood])

  const submit = useCallback(async () => {
    const place = neighborhoods.data?.find((n) => n.name === form.neighborhood) ?? neighborhoods.data?.[0]
    if (!place) return
    setSaving(true)
    setError(null)
    try {
      const created = await registerPet.execute(toNewPet(form, photo, place))
      navigate(`/pet/${created.id}`)
    } catch (e) {
      setError(errorMessage(e, 'Não foi possível publicar o anúncio.'))
    } finally {
      setSaving(false)
    }
  }, [form, navigate, neighborhoods.data, photo, registerPet])

  return {
    form,
    setField,
    changeStatus,
    photo,
    photos: photos.data ?? [],
    neighborhoods: neighborhoods.data ?? [],
    analysis,
    analyzing,
    saving,
    error,
    selectPhoto,
    regenerateCopy: () => regenerateCopy(),
    submit,
  }
}
