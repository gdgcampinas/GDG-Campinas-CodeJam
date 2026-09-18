import { PageHeader, PhotoPicker, Spinner } from '@/core/ui'
import { AiDiagnosisCard } from './AiDiagnosisCard'
import { PetForm } from './PetForm'
import { useRegisterPetForm } from './useRegisterPetForm'
import './register.css'

export function RegisterPetPage() {
  const state = useRegisterPetForm()

  const overlay = state.analyzing ? (
    <div className="register-loading">
      <Spinner label="✨ IA analisando foto..." />
    </div>
  ) : state.analysis ? (
    <span className="register-badge">✨ IA concluída</span>
  ) : null

  return (
    <>
      <PageHeader title="Cadastrar Pet" subtitle="Envie a foto: a IA preenche as características e você publica o anúncio em instantes" />
      <div className="register-layout">
        <div className="register-media">
          {state.photo && (
            <PhotoPicker
              selected={state.photo}
              photos={state.photos.map((p) => ({ id: p.file, url: p.url }))}
              onSelect={state.selectPhoto}
              overlay={overlay}
              alt="Pré-visualização do pet"
            />
          )}
          {state.analysis && <AiDiagnosisCard analysis={state.analysis} />}
        </div>
        <PetForm
          form={state.form}
          neighborhoods={state.neighborhoods}
          onChange={state.setField}
          onStatusChange={state.changeStatus}
          onRegenerate={state.regenerateCopy}
          onSubmit={state.submit}
          submitting={state.saving || state.analyzing}
          error={state.error}
        />
      </div>
    </>
  )
}
