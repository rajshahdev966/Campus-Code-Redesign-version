export default function CommunitySection() {
  return (
    <section id="community" className="overflow-hidden border-b border-line bg-paper/30">
      <div className="section-width grid md:grid-cols-2">
        <div data-reveal className="reveal py-20 md:py-28">
          <p className="eyebrow mb-14 text-muted">The network</p>
          <h2 className="display-type text-[clamp(54px,9vw,140px)]">Find<br />your<br /><span className="outline-type">people.</span></h2>
        </div>
        <div data-reveal className="reveal flex flex-col items-center justify-center border-t border-line py-16 md:border-l md:border-t-0 md:py-20">
          <div aria-hidden="true" className="relative flex aspect-square w-[70%] max-w-[330px] items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-line" />
            <div className="absolute inset-[14%] rounded-full border border-line" />
            <div className="orbit-spin absolute inset-[10%]">{[0,90,180,270].map((angle) => <span key={angle} className="absolute left-1/2 top-1/2 size-2 rounded-full bg-purple shadow-[0_0_14px_#7665ff40]" style={{ transform: `rotate(${angle}deg) translateY(clamp(80px, 10vw, 125px))` }} />)}</div>
            <strong className="flex size-20 items-center justify-center border border-purple bg-paper text-xl text-purple">CC</strong>
          </div>
          <p className="mt-10 text-center text-[14px] leading-7 text-muted">Build with developers.<br />Think with designers.<br />Compete with builders.</p>
        </div>
      </div>
    </section>
  )
}
