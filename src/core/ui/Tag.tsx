export type Tone = 'neutral' | 'danger' | 'warning' | 'success' | 'info'

interface TagProps {
  label: string
  tone?: Tone
}

export function Tag({ label, tone = 'neutral' }: TagProps) {
  return <span className={`tag tag--${tone}`}>{label}</span>
}
