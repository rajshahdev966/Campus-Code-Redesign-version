import { useRef } from 'react'
import SharedCanvas from './mission/SharedCanvas'
import useMissionCanvas from '../../hooks/useMissionCanvas'

export default function MissionSection() {
  const scope = useRef(null)
  useMissionCanvas(scope)

  return (
    <section ref={scope} id="mission" className="mission-section border-b border-line" aria-labelledby="mission-heading">
      <div className="workspace-width mission-layout">
        <div data-reveal className="reveal mission-copy">
          <p className="eyebrow text-purple">05 — The mission</p>
          <h2 id="mission-heading" className="mission-heading"><span>Great <em className="outline-fill" tabIndex={0}>ideas</em></span><span>need</span><span className="mission-builders">builders.<svg viewBox="0 0 460 16" preserveAspectRatio="none" aria-hidden="true"><path d="M5 11Q225 -1 455 8" /></svg></span></h2>
          <p className="mission-description">Your university is full of people with ideas. CampusCode gives those ideas somewhere to go.</p>
        </div>
        <div data-reveal className="reveal mission-canvas"><SharedCanvas /></div>
      </div>
    </section>
  )
}
