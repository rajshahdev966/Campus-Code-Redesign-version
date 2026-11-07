import { steps } from '../../state/landingContent'

export default function HowItWorksSection() {
  return (
    <section id="how" className="border-b border-line py-20 md:py-28">
      <div className="section-width">
        <div data-reveal className="reveal mb-14 flex items-start justify-between gap-5">
          <h2 className="text-2xl font-bold tracking-[-.05em] md:text-[27px]"><span className="eyebrow mr-5 text-purple">03</span>HOW IT WORKS</h2>
          <p className="eyebrow text-right text-muted">From idea<br />to impact.</p>
        </div>
        <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => <article key={step.title} data-reveal style={{ '--reveal-delay': `${index * 80}ms` }} className="reveal group relative flex min-h-[290px] flex-col border-b border-r border-line p-7 transition-colors hover:bg-paper md:min-h-[350px]">
            <span className="eyebrow text-muted">0{index + 1}</span>
            <div className="mb-8 mt-7 h-px bg-line" />
            <h3 className="text-[32px] font-bold leading-normal tracking-[-2px] md:text-[35px]">{step.title}</h3>
            <p className="mt-6 text-[13px] leading-6 text-muted">{step.description}</p>
            <span aria-hidden="true" className="mt-auto self-end pt-10 text-lg text-purple transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
          </article>)}
        </div>
      </div>
    </section>
  )
}
