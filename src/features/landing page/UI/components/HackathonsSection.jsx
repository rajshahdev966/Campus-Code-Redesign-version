import { Link } from 'react-router'
import { hackathons } from '../../state/landingContent'

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="border-b border-line py-20 md:py-28">
      <div className="section-width">
        <div data-reveal className="reveal mb-8 flex items-center justify-between gap-5">
          <h2 className="text-2xl font-bold tracking-[-.05em] md:text-[27px]"><span className="eyebrow mr-5 text-purple">04</span>ENTER THE ARENA</h2>
          <Link to="/register" className="eyebrow shrink-0 text-muted hover:text-purple">View all ↗</Link>
        </div>
        <div className="border-t border-line">
          {hackathons.map((event, index) => <article key={event.title} data-reveal className="reveal group border-b border-line transition-colors hover:bg-paper/70">
            <a href="/register" aria-label={`Join ${event.title}`} className="grid grid-cols-[30px_1fr_20px] items-center gap-x-5 gap-y-5 py-9 md:min-h-40 md:grid-cols-[70px_1.1fr_1.25fr_100px_24px] md:gap-7">
              <span className="eyebrow text-muted">0{index + 1}</span>
              <div><p className="eyebrow mb-3 text-muted">{event.category}</p><h3 className="text-[26px] font-bold leading-none tracking-[-1px] md:text-[29px]">{event.title}</h3></div>
              <p className="col-start-2 row-start-2 text-[13px] leading-6 text-muted md:col-auto md:row-auto">{event.description}</p>
              <span className="eyebrow col-start-2 flex items-center gap-2 text-muted md:col-auto"><span className={`size-1.5 rounded-full ${event.status === 'LIVE' ? 'bg-lime' : 'bg-muted/50'}`} />{event.status}</span>
              <span aria-hidden="true" className="col-start-3 row-start-1 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple md:col-auto md:row-auto">↗</span>
            </a>
          </article>)}
        </div>
      </div>
    </section>
  )
}
