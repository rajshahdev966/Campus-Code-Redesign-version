import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { busDriveDuration } from '../../hooks/useFormBus'

gsap.registerPlugin(useGSAP)

const labels = {
  idle: 'Take your time',
  typing: 'Waking up',
  ready: 'Ready',
  submitting: 'On the move',
  error: 'Check details',
}

export default function FormBus({ status, attempt }) {
  const scope = useRef(null)

  useGSAP(() => {
    const select = gsap.utils.selector(scope.current)
    const bus = select('[data-bus]')
    const road = select('[data-bus-road]')[0]
    const progress = select('[data-bus-progress]')
    const headlights = select('[data-bus-headlights]')
    const sleep = select('[data-bus-sleep]')
    const media = gsap.matchMedia()

    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, context => {
      const reduced = context.conditions.reduced
      gsap.set(headlights, { opacity: status === 'idle' ? 0 : 1 })
      gsap.set(sleep, { opacity: status === 'idle' ? 1 : 0 })

      if (status === 'submitting') {
        if (reduced) gsap.set(progress, { scaleX: 1 })
        else gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: busDriveDuration, ease: 'none' })
      }
      if (reduced) return

      if (status === 'idle') {
        gsap.to(sleep, { y: -10, opacity: 0, duration: 1.4, repeat: -1, repeatDelay: .2, ease: 'power1.out' })
      } else if (status === 'submitting') {
        gsap.to(bus, { x: Math.max(0, road.clientWidth - 94), duration: busDriveDuration, ease: 'power1.inOut' })
        select('[data-bus-wheel]').forEach((wheel, index) => {
          gsap.to(wheel, { rotation: 360, svgOrigin: `${index ? 66 : 20} 38`, duration: .35, repeat: -1, ease: 'none' })
        })
      } else if (status === 'error') {
        gsap.to(bus, { keyframes: [{ x: -3 }, { x: 3 }, { x: -2 }, { x: 2 }, { x: 0 }], duration: .35, ease: 'sine.inOut' })
      } else {
        gsap.fromTo(bus, { y: 2 }, { y: 0, duration: .3, ease: 'back.out(1.4)' })
      }

      if (status === 'ready') {
        gsap.to(select('[data-bus-ready]'), { scaleY: .75, opacity: .5, duration: .65, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }
    })
    return () => media.revert()
  }, { scope, dependencies: [status, attempt], revertOnUpdate: true })

  return (
    <div ref={scope} className="form-bus" data-state={status}>
      <span className="form-bus-label" role="status" aria-live="polite">{labels[status]}</span>
      <span data-bus-ready className="form-bus-ready" aria-hidden="true" />
      <div data-bus-road className="form-bus-road" aria-hidden="true">
        <div data-bus className="form-bus-vehicle">
          <svg viewBox="0 0 102 48" className="form-bus-icon" fill="none">
            <g data-bus-headlights opacity="0">
              <path d="M80 22 100 17V34L80 29Z" fill="var(--lime)" opacity=".2" />
              <rect x="78" y="23" width="5" height="7" rx="2" fill="var(--lime)" />
            </g>
            <rect x="1" y="4" width="79" height="34" rx="9" fill="var(--ink)" />
            <path d="M17 10H30L23 29H10Z" fill="var(--white)" />
            <path d="M35 10H48L41 29H28Z" fill="var(--purple)" />
            <path d="M53 10H66L59 29H46Z" fill="var(--lime)" />
            {[20, 66].map(x => (
              <g data-bus-wheel key={x}>
                <circle cx={x} cy="38" r="6" fill="var(--ink)" stroke="var(--white)" strokeWidth="2" />
                <path d={`M${x - 3} 38H${x + 3}M${x} 35V41`} stroke="var(--white)" strokeWidth="1" />
              </g>
            ))}
          </svg>
          <span data-bus-sleep className="form-bus-sleep">Zzz</span>
        </div>
      </div>
      <span data-bus-progress className="form-bus-progress" aria-hidden="true" />
    </div>
  )
}
