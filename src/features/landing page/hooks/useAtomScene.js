import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { orbitDuration, studentPoints } from '../state/atomGeometry'

gsap.registerPlugin(useGSAP)

export default function useAtomScene(scope) {
  const controls = useRef(null)
  const userPaused = useRef(false)
  const [paused, setPaused] = useState(false)

  const { contextSafe } = useGSAP(() => {
    const section = scope.current
    const select = gsap.utils.selector(section)
    const media = gsap.matchMedia()

    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, context => {
      const reduced = context.conditions.reduced
      const scene = select('.atom-scene')[0]
      const avatarLayers = select('[data-atom-avatar]')
      const spokes = select('[data-atom-spoke]')
      const triangle = select('[data-atom-triangle]')[0]
      const pulse = select('[data-atom-pulse]')[0]
      const clock = { time: 0 }
      let visible = false
      let tapReset
      let held = false
      let tapActive = false

      function draw() {
        const points = studentPoints(clock.time)

        avatarLayers.forEach(avatar => {
          const point = points[Number(avatar.dataset.atomAvatar)]
          const front = avatar.dataset.side === 'front'
          avatar.setAttribute('visibility', (point.depth >= 0) === front ? 'visible' : 'hidden')
          avatar.setAttribute('transform', `translate(${point.x} ${point.y}) scale(${point.scale})`)
          avatar.setAttribute('opacity', point.opacity)
        })
        spokes.forEach((line, index) => {
          line.setAttribute('x2', points[index].x)
          line.setAttribute('y2', points[index].y)
        })
        triangle.setAttribute('points', points.map(point => `${point.x},${point.y}`).join(' '))

        const travel = (clock.time % 4) / 4
        pulse.setAttribute('cx', points[0].x + (320 - points[0].x) * travel)
        pulse.setAttribute('cy', points[0].y + (320 - points[0].y) * travel)
        pulse.setAttribute('opacity', reduced ? 0 : Math.sin(travel * Math.PI))
      }

      draw()
      const orbit = reduced ? null : gsap.to(clock, {
        time: orbitDuration * 4,
        duration: orbitDuration * 4,
        repeat: -1,
        ease: 'none',
        paused: true,
        onUpdate: draw,
      })
      const entrance = reduced ? null : gsap.from(select('[data-about-word]'), {
        yPercent: 110,
        duration: .8,
        stagger: .1,
        ease: 'power3.out',
        paused: true,
      })

      function syncPlayback() {
        const running = visible && !document.hidden && !userPaused.current
        orbit?.paused(!running)
      }

      function engage(active) {
        section.dataset.engaged = String(active)
        if (orbit) gsap.to(orbit, { timeScale: active ? 2.2 : 1, duration: .4, overwrite: true })
        gsap.to(select('[data-atom-connections]'), { opacity: active ? .85 : .4, duration: reduced ? 0 : .3, overwrite: true })
      }

      controls.current = {
        syncPlayback,
        engage(active) {
          held = active
          engage(held || tapActive)
        },
        boost() {
          tapReset?.kill()
          tapActive = true
          engage(true)
          tapReset = gsap.delayedCall(1.6, () => {
            tapActive = false
            engage(held)
          })
        },
      }

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.target === section && entry.isIntersecting) entrance?.play()
          if (entry.target === scene) visible = entry.isIntersecting
        })
        syncPlayback()
      }, { threshold: .12 })
      observer.observe(section)
      observer.observe(scene)
      document.addEventListener('visibilitychange', syncPlayback)

      return () => {
        observer.disconnect()
        document.removeEventListener('visibilitychange', syncPlayback)
        tapReset?.kill()
        if (orbit) gsap.killTweensOf(orbit)
        gsap.killTweensOf(select('[data-atom-connections]'))
        controls.current = null
        delete section.dataset.engaged
      }
    })
    return () => media.revert()
  }, { scope })

  const setEngaged = contextSafe(active => controls.current?.engage(active))
  const boost = contextSafe(() => controls.current?.boost())

  function togglePlayback() {
    userPaused.current = !userPaused.current
    setPaused(userPaused.current)
    controls.current?.syncPlayback()
  }

  return { paused, togglePlayback, setEngaged, boost }
}
