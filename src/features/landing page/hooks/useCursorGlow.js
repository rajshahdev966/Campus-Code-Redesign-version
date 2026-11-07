import { useEffect, useRef } from 'react'

export default function useCursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const mouseInput = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let x = 0
    let y = 0
    let visible = false

    function draw() {
      // Read the latest pointer position once per frame, without React state.
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      glow.style.opacity = visible ? '1' : '0'
      frame = 0
    }

    function scheduleDraw() {
      if (!frame) frame = window.requestAnimationFrame(draw)
    }

    function move(event) {
      if (event.pointerType !== 'mouse' || !mouseInput.matches || reducedMotion.matches) return
      x = event.clientX
      y = event.clientY
      visible = true
      scheduleDraw()
    }

    function hide() {
      visible = false
      scheduleDraw()
    }

    function handleVisibility() {
      if (document.hidden) hide()
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    document.addEventListener('visibilitychange', handleVisibility)
    mouseInput.addEventListener('change', hide)
    reducedMotion.addEventListener('change', hide)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      document.removeEventListener('visibilitychange', handleVisibility)
      mouseInput.removeEventListener('change', hide)
      reducedMotion.removeEventListener('change', hide)
    }
  }, [])

  return glowRef
}
