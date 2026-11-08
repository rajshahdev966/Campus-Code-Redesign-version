import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(useGSAP, MotionPathPlugin)

export default function useHeroSimulation(scope, exploreRef) {
  const timeline = useRef(null)
  const playback = useRef(null)

  useGSAP(() => {
    const scene = scope.current
    const select = gsap.utils.selector(scene)
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const colors = getComputedStyle(scene)
      const lime = colors.getPropertyValue('--lime').trim()
      const purple = colors.getPropertyValue('--purple').trim()
      const white = colors.getPropertyValue('--white').trim()
      const ink = colors.getPropertyValue('--ink').trim()
      const pills = select('[data-pill]')
      const path = select('[data-track]')[0]
      let visible = false
      const entrance = gsap.from(select('[data-card]'), { y: 24, scale: .96, opacity: 0, stagger: .12, duration: .7, ease: 'back.out(1.4)', paused: true })
      const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: 'power2.inOut' } })
      timeline.current = tl

      tl.addLabel('discover', 0)
        .set(pills, { backgroundColor: white, color: ink }, 0)
        .set(pills[0], { backgroundColor: lime }, 0)
        .set(select('[data-code-line]'), { clipPath: 'inset(0 100% 0 0)' }, 0)
        .set(select('[data-avatar], [data-ui-block], [data-stamp], [data-check], [data-particle]'), { opacity: 0, scale: .85 }, 0)
        .set(select('[data-ui-line], [data-note-line]'), { scaleX: 0 }, 0)
        .set(select('[data-mountain]'), { strokeDasharray: 1, strokeDashoffset: 1 }, 0)
        .set(select('[data-pulse]'), { opacity: 1, motionPath: { path, align: path, start: 0, end: 0 } }, 0)
        .fromTo(select('[data-pin]'), { y: -12 }, { y: 0, duration: .5, ease: 'bounce.out' }, .1)
        .to(select('[data-code-line]'), { clipPath: 'inset(0 0% 0 0)', duration: .45, stagger: .3 }, .8)
        .to(select('[data-avatar]'), { scale: 1, opacity: 1, stagger: .12, duration: .35, ease: 'back.out(1.4)' }, 1.3)
        .to(select('[data-pulse]'), { motionPath: { path, align: path, start: 0, end: .5 }, duration: 1.7 }, .8)
        .addLabel('build', 2.5)
        .to(pills[1], { backgroundColor: purple, color: white, duration: .25 }, 'build')
        .to(select('[data-ui-block]'), { opacity: 1, scale: 1, duration: .4 }, 'build')
        .to(select('[data-mountain]'), { strokeDashoffset: 0, duration: .6 }, 2.8)
        .to(select('[data-ui-line], [data-note-line]'), { scaleX: 1, stagger: .1, duration: .4 }, 3.2)
        .to(select('[data-pulse]'), { motionPath: { path, align: path, start: .5, end: 1 }, duration: 1.2 }, 3.3)
        .to(pills[2], { backgroundColor: lime, duration: .25 }, 4.5)
        .to(select('[data-check]'), { opacity: 1, scale: 1, duration: .2 }, 4.5)
        .fromTo(select('[data-stamp]'), { scale: 1.25, rotation: -12, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: .35, ease: 'back.out(1.6)' }, 4.65)
        .fromTo(select('[data-particle]'), { x: 0, y: 0, opacity: 1, scale: 1 }, { x: i => Math.cos(i * Math.PI / 3) * 65, y: i => Math.sin(i * Math.PI / 3) * 55, opacity: 0, scale: .3, duration: .65 }, 4.7)
        .addLabel('ship', 5.2)
        .to(select('[data-code-line], [data-avatar], [data-ui-block], [data-ui-line], [data-note-line], [data-stamp], [data-check], [data-pulse]'), { opacity: 0, duration: .4 }, 6.6)
        .set(select('[data-code-line], [data-ui-line], [data-note-line]'), { opacity: 1 }, 7)

      // The CTA gets one quiet accent, rather than flashing on every loop.
      const cta = gsap.fromTo(exploreRef.current, { boxShadow: '0 0 0 0px transparent' }, { boxShadow: `0 0 0 5px ${lime}`, duration: .4, repeat: 1, yoyo: true, paused: true })
      let accented = false
      tl.call(() => { if (!accented) { accented = true; cta.play() } }, [], 4.65)

      const syncPlayback = () => {
        const running = visible && !document.hidden
        tl.paused(!running)
        entrance.paused(!running)
        if (accented && cta.totalProgress() < 1) cta.paused(!running)
        scene.dataset.running = String(running)
      }
      playback.current = syncPlayback
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncPlayback() }, { threshold: .15 })
      observer.observe(scene)
      document.addEventListener('visibilitychange', syncPlayback)
      return () => {
        observer.disconnect()
        document.removeEventListener('visibilitychange', syncPlayback)
        timeline.current = null
        playback.current = null
        delete scene.dataset.running
      }
    })
    return () => media.revert()
  }, { scope })

  function selectStage(stage) {
    if (!timeline.current) return
    const preview = { discover: .8, build: 4.1, ship: 5.2 }
    timeline.current.totalTime(preview[stage], true)
    playback.current?.()
  }

  return { selectStage }
}
