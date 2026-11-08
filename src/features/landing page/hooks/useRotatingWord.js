import { useEffect, useState } from 'react'

export const buildWords = ['project', 'startup', 'app', 'game', 'model']

export default function useRotatingWord(scope) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    const updateVisibility = () => {
      if (document.hidden) setVisible(false)
      else {
        observer.unobserve(scope.current)
        observer.observe(scope.current)
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && !document.hidden)
    }, { threshold: .25 })
    updateMotion()
    observer.observe(scope.current)
    media.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      observer.disconnect()
      media.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [scope])

  useEffect(() => {
    if (!visible || paused || interacting || reducedMotion) return
    const timer = window.setInterval(() => setIndex(value => (value + 1) % buildWords.length), 2400)
    return () => window.clearInterval(timer)
  }, [index, visible, paused, interacting, reducedMotion])

  return {
    word: buildWords[index], index, selectWord: setIndex,
    nextWord: () => setIndex(value => (value + 1) % buildWords.length),
    paused, togglePaused: () => setPaused(value => !value),
    reducedMotion, setInteracting,
  }
}
