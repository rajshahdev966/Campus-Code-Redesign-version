import useViewportVideo from '../../hooks/useViewportVideo'

export default function ExperienceSection() {
  const { videoRef, playing, muted, setPlaying, togglePlayback, toggleSound } = useViewportVideo()

  return (
    <section aria-label="The CampusCode experience" className="grid-surface [background-size:50px_50px] border-b border-line bg-surface pt-12 pb-6 md:pt-16">
      <div className="page-width">
        <div className="eyebrow flex justify-between text-[8px] text-muted"><span>02 — Experience</span><span>00:30</span></div>
        <div data-reveal className="reveal mt-16 text-center">
          <p className="eyebrow mb-6 text-[8px] text-muted">The CampusCode experience</p>
          <h2 className="display-type text-[clamp(48px,7vw,100px)] leading-[.8] tracking-[-.07em]">Build<br />together.</h2>
        </div>
        <div data-reveal className="reveal mx-auto mt-10 w-full max-w-[1120px]">
          <div className="group relative isolate aspect-video overflow-hidden rounded-[20px] border border-ink bg-paper shadow-[0_28px_75px_-15px_#7665ff35] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_34px_85px_-15px_#7665ff45]">
            <video ref={videoRef} src="/videos/what-is-campuscode.mp4" muted={muted} loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} className="absolute inset-0 h-full w-full object-contain" aria-label="What is CampusCode film" />
            <button type="button" onClick={toggleSound} className="absolute bottom-3 left-3 rounded-full bg-ink/60 px-3 py-2 font-sans text-[10px] font-semibold tracking-[1.5px] text-paper transition-colors hover:bg-purple" aria-label={muted ? 'Unmute CampusCode film' : 'Mute CampusCode film'}>{muted ? 'TAP FOR SOUND' : 'MUTE SOUND'}</button>
            <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause the CampusCode film' : 'Play the CampusCode film'} className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-ink/60 text-xs text-paper opacity-0 transition-opacity hover:bg-purple focus-visible:opacity-100 group-hover:opacity-100">{playing ? 'Ⅱ' : '▶'}</button>
          </div>
        </div>
        <div className="eyebrow mt-16 flex justify-between gap-4 text-[8px] text-muted"><span>Watch the story</span><span className="text-right tracking-[2px]">Plays as you scroll ↗</span></div>
      </div>
    </section>
  )
}
