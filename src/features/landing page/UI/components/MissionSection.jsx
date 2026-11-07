export default function MissionSection() {
  return (
    <section id="mission" className="relative overflow-hidden border-b border-line bg-surface/40 py-24 md:py-[104px]">
      <div aria-hidden="true" className="pointer-events-none absolute right-[12%] top-[14%] size-[520px] rounded-full bg-purple/[.07] blur-[90px]" />
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] whitespace-nowrap text-[25vw] font-black tracking-[-.08em] text-ink/[.025]">CAMPUSCODE</span>
      <div data-reveal className="reveal relative mx-auto w-[80%]">
        <p className="eyebrow mb-12 text-[8px] text-purple">05 — The mission</p>
        <h2 className="display-type md:tracking-[-9px] text-[clamp(34px,11vw,170px)]">Great<br />ideas<br /><span className="outline-type whitespace-nowrap">need builders.</span></h2>
        <p className="mt-12 max-w-[440px] text-[14px] leading-[1.8] text-muted">Your university is full of people with ideas. CampusCode gives those ideas somewhere to go.</p>
      </div>
    </section>
  )
}
