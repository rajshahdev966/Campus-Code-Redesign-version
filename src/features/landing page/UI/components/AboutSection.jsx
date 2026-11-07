export default function AboutSection() {
  return (
    <section id="about" className="overflow-hidden border-b border-line bg-paper/30 py-24 md:py-[120px]">
      <div className="mx-auto grid w-[84%] gap-10 lg:grid-cols-[80px_1.35fr_1fr] lg:gap-8">
        <span className="eyebrow text-[9px] text-purple">01</span>
        <div data-reveal className="reveal relative z-10">
          <p className="eyebrow mb-14 text-[8px] text-muted"><span className="mr-2 inline-block size-1.5 rounded-full bg-lime" />What is CampusCode?</p>
          <h2 className="display-type text-[clamp(48px,9vw,140px)]">Where<br />students<br /><span className="outline-type">build.</span></h2>
          <p className="mt-10 max-w-[480px] text-[14px] leading-[1.8] text-muted">CampusCode brings students, teams, organizers and hackathons into one connected ecosystem.</p>
        </div>
        <div data-reveal aria-hidden="true" className="reveal relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center self-center">
          <div className="absolute inset-0 rounded-full border border-lime/20" />
          <div className="absolute inset-[16%] rounded-full border border-purple/20" />
          <div className="absolute inset-[31%] rounded-full border border-purple/20 bg-purple/[.02] shadow-[0_10px_60px_#7665ff0a]" />
          <div className="orbit-spin absolute -inset-[12%]">
            {[{ number: '01', position: 'left-[14%] top-[16%]' }, { number: '02', position: 'right-0 top-[47%]' }, { number: '03', position: 'bottom-[12%] left-[27%]' }].map(({ number, position }) => (
              <span key={number} className={`absolute ${position}`}><span className="orbit-counterspin block font-mono text-[8px] text-muted">{number}</span></span>
            ))}
          </div>
          <span className="flex size-25 items-center justify-center border border-purple bg-canvas text-[32px] font-black lowercase text-purple">CC</span>
        </div>
      </div>
    </section>
  )
}
