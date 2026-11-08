import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function useAuthEntrance(scope, pathname) {
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-auth-word]', { yPercent: 110, stagger: .08, duration: .75 }, 0)
        .from('[data-auth-detail]', { opacity: 0, y: 10, stagger: .06, duration: .6 }, .15)
        .from('[data-auth-step]', { opacity: 0, y: 12, stagger: .08, duration: .5 }, .3)
        .from('[data-auth-form]', { opacity: 0, y: 18, duration: .7 }, .15)
    })
    return () => media.revert()
  }, { scope, dependencies: [pathname], revertOnUpdate: true })
}
