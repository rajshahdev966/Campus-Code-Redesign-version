import { Link } from 'react-router'
export default function JoinSection() {
  return (
    <section id="join" className="grid-surface [background-size:60px_60px] relative isolate overflow-hidden border-b border-line bg-surface py-16 md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute size-[min(520px,75vw)] rounded-full border border-purple/15 bg-purple/[.025] shadow-[0_0_100px_#7665ff0c]" />
        <div className="absolute bottom-16 right-[20%] size-56 rounded-full bg-purple/[.06] blur-[65px]" />
      </div>
      <div data-reveal className="reveal mx-auto w-[90%] text-center">
        <p className="eyebrow mb-10 text-[9px] tracking-[2px] text-purple">Ready?</p>
        <h2 className="display-type md:tracking-[-9px] text-[clamp(36px,11vw,170px)] leading-[.8]">
          Your next<br /><span className="outline-type">project</span><br />starts here.
        </h2>
        <Link to="/register" className="group mt-10 inline-flex min-h-[50px] items-center justify-center gap-8 bg-ink px-6 text-[13px] font-bold tracking-[-.4px] text-paper transition-colors duration-400 hover:bg-purple">JOIN CAMPUSCODE<span aria-hidden="true" className="text-base text-lime transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span></Link>
      </div>
    </section>
  )
}
