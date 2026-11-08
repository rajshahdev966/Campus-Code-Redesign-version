import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(useGSAP, MotionPathPlugin)

// Memory survives route changes, but a page reload starts a new journey.
let journeyPlayed = false

export default function useJourneyAnimation(scope) {
  useGSAP(() => {
    const section = scope.current
    const select = gsap.utils.selector(section)
    const cards = select('[data-journey-step]')
    const coloured = selector => select(`[data-colour] ${selector}`)
    const finish = () => {
      journeyPlayed = true
      section.dataset.complete = 'true'
      gsap.set(select('[data-highlight]'), { clearProps: 'opacity' })
    }
    const tl = gsap.timeline({ paused: true, defaults: { duration: .35, ease: 'power2.out' }, onComplete: finish })

    tl.from(select('[data-journey-cta]'), { y: 16, autoAlpha: 0, duration: .45 }, 5.4)
    gsap.set(select('[data-sparkles] path'), { scale: 0, transformOrigin: '50% 50%' })
    gsap.set(select('[data-colour]'), { opacity: 0 })
    gsap.set(select('[data-traveler]'), { opacity: 0 })
    gsap.set(select('[data-connector-mask]'), { strokeDasharray: 1, strokeDashoffset: 1 })

    ;[.4, 1.6, 2.9, 4.2].forEach((time, index) => {
      const card = cards[index]
      tl.to(card.querySelector('[data-colour]'), { opacity: 1, duration: .2 }, time)
        .to(card.querySelector('[data-highlight]'), { opacity: 1, duration: .25 }, time)
        .to(card.querySelector('[data-highlight]'), { opacity: 0, duration: .3 }, time + 1)
        .to(card.querySelectorAll('[data-sparkles] path'), { scale: 1, stagger: .06, ease: 'back.out(2)' }, time + .65)
    })

    tl.from(coloured('[data-ticket]'), { x: -24, rotation: -8, transformOrigin: '50% 50%', duration: .5, ease: 'back.out(1.3)' }, .4)
      .from(coloured('[data-mountain]'), { fill: 'transparent', duration: .4 }, .65)
      .from(coloured('[data-flag]'), { scaleY: 0, transformOrigin: '50% 100%', ease: 'back.out(2)' }, .8)
      .from(coloured('[data-ticket] [data-lines] path'), { scaleX: 0, transformOrigin: 'left', stagger: .08 }, .9)
      .fromTo(coloured('[data-scan]'), { x: 0, opacity: 0 }, { x: 106, opacity: .8, duration: .35 }, 1.05)
      .set(coloured('[data-scan]'), { opacity: 0 }, 1.4)
      .from(coloured('[data-avatar]'), { x: i => [-28, 0, 28][i], y: i => i === 1 ? -26 : 10, opacity: 0, scale: .8, transformOrigin: '50% 50%', stagger: .12, duration: .45, ease: 'back.out(1.8)' }, 1.6)
      .to(coloured('[data-avatar-ring]'), { stroke: 'var(--lime)', strokeWidth: 3, stagger: .12, duration: .15 }, 1.95)
      .to(coloured('[data-avatar-ring]'), { stroke: 'var(--ink)', strokeWidth: 1.8, stagger: .12, duration: .25 }, 2.2)
      .fromTo(coloured('[data-ping]'), { opacity: 0, scale: .5, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: .2 }, 2.15)
      .to(coloured('[data-ping]'), { opacity: 0 }, 2.6)
      .from(coloured('[data-frame]'), { strokeDasharray: 1, strokeDashoffset: 1, duration: .5 }, 2.9)
      .from(coloured('[data-browser-fill]'), { opacity: 0, duration: .6 }, 3.1)
      .from(coloured('[data-browser-dot]'), { opacity: 0, stagger: .1 }, 3.2)
      .from(coloured('[data-code]'), { x: -10, opacity: 0 }, 3.4)
      .from(cards[2].querySelectorAll('[data-colour] [data-lines] path'), { scaleX: 0, transformOrigin: 'left', stagger: .1 }, 3.55)
      .from(coloured('[data-stamp]'), { scale: 1.8, rotation: -15, opacity: 0, transformOrigin: '50% 50%', duration: .4, ease: 'back.out(1.5)' }, 4.2)
      .to(cards[3], { keyframes: [{ x: -2 }, { x: 2 }, { x: -1 }, { x: 0 }], duration: .2 }, 4.6)
      .fromTo(coloured('[data-ripple]'), { opacity: .7, scale: .6, transformOrigin: '50% 50%' }, { opacity: 0, scale: 1.5, duration: .5 }, 4.6)
      .from(coloured('[data-check]'), { strokeDasharray: 1, strokeDashoffset: 1, duration: .35 }, 4.7)
    gsap.set(coloured('[data-ripple], [data-ping], [data-scan]'), { opacity: 0 })

    ;[1.3, 2.6, 3.9].forEach((time, index) => {
      select(`[data-connector="${index}"]`).forEach(connector => {
        const path = connector.querySelector('[data-connector-path]')
        const dot = connector.querySelector('[data-traveler]')
        tl.to(connector.querySelector('[data-connector-mask]'), { strokeDashoffset: 0, duration: .4 }, time)
          .set(dot, { opacity: 1 }, time)
          .fromTo(dot, { motionPath: { path, start: 0, end: 0 } }, { motionPath: { path, start: 0, end: 1 }, duration: .4, ease: 'power2.inOut' }, time)
      })
    })

    // Keep the same sequence, stretched evenly to seven seconds.
    tl.timeScale(tl.duration() / 7)

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const showFinal = () => {
      tl.progress(1).pause()
      finish()
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      journeyPlayed = true
      tl.play()
      observer.disconnect()
    }, { threshold: .2 })
    const onMotionChange = () => {
      if (media.matches) {
        observer.disconnect()
        showFinal()
      }
    }

    if (journeyPlayed || media.matches) showFinal()
    else observer.observe(section)
    media.addEventListener('change', onMotionChange)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', onMotionChange)
    }
  }, { scope })
}
