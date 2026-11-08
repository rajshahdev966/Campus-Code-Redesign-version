import { useEffect } from 'react'
import gsap from 'gsap'

const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))

export default function useBadgeMotion(scope) {
  useEffect(() => {
    const stage = scope.current
    const swing = stage.querySelector('[data-badge-swing]')
    const card = stage.querySelector('[data-badge-card]')
    const handle = stage.querySelector('[data-badge-handle]')
    const shadow = stage.querySelector('[data-badge-shadow]')
    const foil = stage.querySelector('[data-badge-foil]')
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setSwing = gsap.quickSetter(swing, 'transform')
    const setShadow = gsap.quickSetter(shadow, 'transform')
    const setFoil = gsap.quickSetter(foil, 'transform')
    const motion = { angle: 0, x: 0, y: 0 }
    let visible = false
    let dragging = null
    let tween = null
    let amplitude = 2.5
    let horizontalRoom = 0
    let rotationLimit = 4

    const canPlay = () => visible && !document.hidden
    const draw = () => {
      setSwing(`translate3d(${motion.x}px, ${motion.y}px, 0) rotate(${motion.angle}deg)`)
      setShadow(`translate3d(${motion.x - motion.angle * 5}px, 0, 0) scale(${1 - Math.abs(motion.angle) * .025}, ${1 + Math.abs(motion.angle) * .015})`)
      setFoil(`translate3d(${motion.angle * 5}%, 0, 0)`)
    }
    const startIdle = () => {
      tween?.kill()
      tween = gsap.fromTo(motion, { angle: -amplitude, x: 0, y: 0 }, {
        angle: amplitude, duration: 2.3, repeat: -1, yoyo: true,
        ease: 'sine.inOut', paused: !canPlay(), onUpdate: draw,
      })
    }
    const springBack = () => {
      tween?.kill()
      tween = gsap.to(motion, {
        angle: -amplitude, x: 0, y: 0,
        duration: media.matches ? .4 : .95,
        ease: media.matches ? 'power2.out' : 'elastic.out(1, .5)',
        paused: !canPlay(), onUpdate: draw, onComplete: startIdle,
      })
    }
    const measure = () => {
      horizontalRoom = Math.max(0, (stage.clientWidth - card.offsetWidth) / 2 - 6)
      const safeAngle = Math.atan(horizontalRoom * .9 / Math.max(swing.offsetHeight, 1)) * 180 / Math.PI
      amplitude = Math.min(media.matches ? .25 : 2.5, safeAngle)
      rotationLimit = Math.min(media.matches ? .5 : 5, safeAngle * .7)
      if (!dragging) startIdle()
    }
    const syncPlayback = () => {
      if (canPlay() && !dragging) tween?.resume()
      else tween?.pause()
    }
    const onDown = event => {
      if (!canPlay() || event.button !== 0) return
      tween?.pause()
      dragging = { id: event.pointerId, x: event.clientX, y: event.clientY, angle: motion.angle, startX: motion.x, startY: motion.y }
      handle.setPointerCapture(event.pointerId)
      handle.dataset.dragging = 'true'
    }
    const onMove = event => {
      if (dragging?.id !== event.pointerId || !canPlay()) return
      const dx = event.clientX - dragging.x
      const dy = event.clientY - dragging.y
      motion.x = clamp(dragging.startX + dx * .35, Math.min(media.matches ? 3 : 22, horizontalRoom * .25))
      motion.y = clamp(dragging.startY + dy * .2, media.matches ? 2 : 10)
      motion.angle = clamp(dragging.angle + dx * .12, rotationLimit)
      draw()
    }
    const onUp = event => {
      if (dragging?.id !== event.pointerId) return
      dragging = null
      delete handle.dataset.dragging
      if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId)
      springBack()
    }
    const onKeyDown = event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || !canPlay()) return
      event.preventDefault()
      motion.angle = (event.key === 'ArrowLeft' ? -1 : 1) * rotationLimit
      draw()
      springBack()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    }, { threshold: .1 })
    const resizeObserver = new ResizeObserver(measure)
    measure()
    observer.observe(stage)
    resizeObserver.observe(stage)
    resizeObserver.observe(card)
    handle.addEventListener('pointerdown', onDown)
    handle.addEventListener('pointermove', onMove)
    handle.addEventListener('pointerup', onUp)
    handle.addEventListener('pointercancel', onUp)
    handle.addEventListener('lostpointercapture', onUp)
    handle.addEventListener('keydown', onKeyDown)
    document.addEventListener('visibilitychange', syncPlayback)
    media.addEventListener('change', measure)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      tween?.kill()
      gsap.killTweensOf(motion)
      handle.removeEventListener('pointerdown', onDown)
      handle.removeEventListener('pointermove', onMove)
      handle.removeEventListener('pointerup', onUp)
      handle.removeEventListener('pointercancel', onUp)
      handle.removeEventListener('lostpointercapture', onUp)
      handle.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('visibilitychange', syncPlayback)
      media.removeEventListener('change', measure)
    }
  }, [scope])
}
