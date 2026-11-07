import useCursorGlow from '../../hooks/useCursorGlow'

export default function CursorGlow() {
  const glowRef = useCursorGlow()

  return <div ref={glowRef} aria-hidden="true" className="cursor-glow" />
}
