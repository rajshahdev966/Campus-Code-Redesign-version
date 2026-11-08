import { useRef } from 'react'
import useHeroSimulation from '../../../hooks/useHeroSimulation'
import BrowserCard from './BrowserCard'
import StickyNote from './StickyNote'
import StepTrack from './StepTrack'

export default function HeroScene({ exploreRef }) {
  const scope = useRef(null)
  const { selectStage } = useHeroSimulation(scope, exploreRef)
  return (
    <div ref={scope} className="hero-scene" role="group" aria-label="An animated preview: discover a challenge, build with a team, and ship your idea.">
      <div className="scene-canvas" aria-hidden="true">
        <div className="scene-orbit" /><span className="scene-cross scene-cross-one">+</span><span className="scene-cross scene-cross-two">+</span>
        <BrowserCard variant="ai" /><StickyNote /><BrowserCard variant="web" />
        <div className="scene-particles">{Array.from({ length: 6 }, (_, i) => <span data-particle key={i} className={i % 2 ? 'bg-purple' : 'bg-lime'} />)}</div>
      </div>
      <StepTrack onSelect={selectStage} />
      <div className="scene-caption"><span>From “what if” to what’s next.</span><span className="scene-motion-label">Motion reduced</span></div>
    </div>
  )
}
