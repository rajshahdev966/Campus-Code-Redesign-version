import { Link } from 'react-router'
import useViewportVideo from '../../hooks/useViewportVideo'

export default function ExperienceSection() {
  const { videoRef, playing, muted, setPlaying, startPlayback, toggleSound } = useViewportVideo()

  return (
    <section aria-label="The CampusCode experience" className="experience-section grid-surface border-b border-line bg-surface landing-section">
      <div className="workspace-width">
        <div className="flex justify-between font-mono text-[9px] uppercase tracking-[.12em] text-muted">
          <span>02 / Experience</span><span>00:30</span>
        </div>

        <div data-reveal className="reveal mt-10 text-center md:mt-12">
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[.16em] text-muted">The CampusCode experience</p>
          <h2 className="experience-heading">Build<br /><span>Together.</span></h2>
        </div>

        <div data-reveal className="experience-stage reveal">
          <div className="experience-window">
            <div className="experience-toolbar">
              <div aria-hidden="true" className="flex shrink-0 gap-1.5 sm:gap-2">
                <span className="size-2 rounded-full bg-purple sm:size-2.5" />
                <span className="size-2 rounded-full bg-lime sm:size-2.5" />
                <span className="size-2 rounded-full bg-line sm:size-2.5" />
              </div>
              <span className="experience-address">campuscode.app/arena</span>
              <Link to="/register" className="experience-join">Join CampusCode <span aria-hidden="true">↗</span></Link>
            </div>

            <div className="experience-video group">
              <video
                ref={videoRef}
                src="/videos/what-is-campuscode.mp4"
                muted={muted}
                loop
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                className="absolute inset-0 h-full w-full object-contain"
                aria-label="What is CampusCode film"
              />
              <button type="button" onClick={toggleSound} className="experience-sound" aria-label={muted ? 'Unmute CampusCode film' : 'Mute CampusCode film'}>{muted ? 'Tap for sound' : 'Mute sound'}</button>
              {!playing && <button type="button" onClick={startPlayback} aria-label="Play the CampusCode film" className="experience-play"><svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor" aria-hidden="true"><path d="M4 2L13 8L4 14Z" /></svg></button>}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between gap-4 font-mono text-[9px] uppercase tracking-[.12em] text-muted md:mt-14">
          <span>Watch the story</span><span className="text-right">Plays as you scroll ↗</span>
        </div>
      </div>
    </section>
  )
}
