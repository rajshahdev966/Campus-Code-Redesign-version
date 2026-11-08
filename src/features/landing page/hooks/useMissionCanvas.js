import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(useGSAP, MotionPathPlugin)

export default function useMissionCanvas(scope) {
  useGSAP(() => {
    const select = gsap.utils.selector(scope.current)
    const pulses = select('[data-mission-pulse]')
    gsap.set(pulses, { opacity: 0 })
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const loop = gsap.timeline({ repeat: -1, paused: true })
      select('[data-mission-path]').forEach((path, i) => {
        const time = i === 3 ? 3.2 : i * .5
        loop.set(pulses[i], { motionPath: { path, start: 0, end: 0 }, opacity: 0 }, time)
          .to(pulses[i], { opacity: 1, duration: .25 }, time)
          .to(pulses[i], { motionPath: { path, start: 0, end: 1 }, duration: 1.8, ease: 'sine.inOut' }, time)
          .to(pulses[i], { opacity: 0, duration: .25 }, time + 1.55)
      })
      loop.to({}, { duration: 1.5 })
      const float = gsap.to(select('[data-mission-student]'), { y: -3, duration: 2.6, stagger: .3, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true })
      const prototype = gsap.to(select('[data-mission-prototype]'), { y: -3, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true })
      const glow = gsap.to(select('[data-mission-glow]'), { scale: 1.05, opacity: .6, transformOrigin: '50% 50%', duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true })
      const animations = [loop, float, prototype, glow]
      let visible = false
      const sync = () => animations.forEach(animation => visible && !document.hidden ? animation.resume() : animation.pause())
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }, { threshold: .15 })
      observer.observe(scope.current)
      document.addEventListener('visibilitychange', sync)
      return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); animations.forEach(animation => animation.kill()) }
    })
    return () => media.revert()
  }, { scope })
}
