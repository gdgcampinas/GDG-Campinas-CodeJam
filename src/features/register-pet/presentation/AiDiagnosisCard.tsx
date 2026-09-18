import { Tag } from '@/core/ui'
import { PET_SIZE_LABEL, PET_SPECIES_LABEL } from '@/features/pets/domain/petMeta'
import type { PetAnalysis } from '../domain/PetAnalysis'

export function AiDiagnosisCard({ analysis }: { analysis: PetAnalysis }) {
  const items: [string, string][] = [
    ['Espécie', PET_SPECIES_LABEL[analysis.species]],
    ['Raça detectada', analysis.breed],
    ['Cor aparente', analysis.color],
    ['Porte estimado', PET_SIZE_LABEL[analysis.size]],
  ]
  return (
    <div className="ai-card">
      <div className="ai-card__header">🤖 Diagnóstico Visual da IA</div>
      <div className="ai-card__grid">
        {items.map(([label, value]) => (
          <div key={label} className="ai-card__item">
            {label}: <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="ai-card__traits">
        {analysis.traits.map((trait) => (
          <Tag key={trait} label={trait} tone="info" />
        ))}
      </div>
    </div>
  )
}
