import { useRef } from 'react'
import AtomScene from './about/AtomScene'
import useAtomScene from '../../hooks/useAtomScene'

export default function AboutSection() {
  const section = useRef(null)
  const { paused, togglePlayback, setEngaged, boost } = useAtomScene(section)

  return (
    <section ref={section} id="about" className="ecosystem-section overflow-hidden border-y border-line">
      <div className="workspace-width py-20 lg:py-28">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[.12em]">
          <span className="text-purple">01 / The ecosystem</span>
          <p className="flex items-center gap-2 text-muted"><span className="size-1.5 rounded-full bg-lime" />What is CampusCode?</p>
        </div>

        <div className="ecosystem-layout">
          <div className="relative z-10">
            <h2 className="ecosystem-heading">
              <span className="ecosystem-word"><span data-about-word>Where</span></span>
              <span className="ecosystem-word"><span data-about-word>Students</span></span>
              <span className="ecosystem-word">
                <button
                  type="button"
                  data-about-word
                  className="ecosystem-build"
                  aria-label="Build: energize the student network"
                  onPointerEnter={event => { if (event.pointerType === 'mouse') setEngaged(true) }}
                  onPointerLeave={event => { if (event.pointerType === 'mouse') setEngaged(false) }}
                  onFocus={() => setEngaged(true)}
                  onBlur={() => setEngaged(false)}
                  onClick={boost}
                >Build.</button>
              </span>
            </h2>
            <p className="mt-8 text-xl font-semibold tracking-[-.035em] sm:text-2xl">Big ideas. Connected people.</p>
            <p className="mt-4 max-w-[460px] text-[14px] leading-[1.8] text-muted sm:text-[15px]">CampusCode brings students, teams, organizers and hackathons into one connected ecosystem.</p>
          </div>

          <div className="ecosystem-visual">
            <AtomScene />
            <div className="flex items-center justify-between px-4 font-mono text-[9px] text-muted">
              <span>Built around connection.</span>
              <button type="button" className="atom-playback" onClick={togglePlayback} aria-label={paused ? 'Play network animation' : 'Pause network animation'}>{paused ? '▶ Play' : 'Ⅱ Pause'}</button>
              <span className="atom-reduced-label">Motion reduced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
