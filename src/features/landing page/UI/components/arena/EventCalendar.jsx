import { Link } from 'react-router'

export default function EventCalendar({ events }) {
  return (
    <div>
      <p className="mb-6 font-mono text-[10px] uppercase tracking-[.1em] text-muted">Explore challenges</p>
      <div className="arena-calendar">
        {events.map(event => (
          <article key={event.title} className="arena-calendar-event" data-status={event.status.toLowerCase()}>
            <div className="arena-calendar-marker" aria-hidden="true">
              <svg viewBox="0 0 48 60" fill="none">
                <path d="M43 23C43 37 24 54 24 54S5 37 5 23a19 19 0 1 1 38 0Z" fill="var(--bg)" stroke="currentColor" strokeWidth="1.2" />
                <rect x="14" y="15" width="20" height="21" rx="3" fill="var(--white)" stroke="currentColor" strokeWidth="1.2" />
                <path d="M14 22h20M19 11v8M29 11v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle className="arena-calendar-pin-dot" cx="24" cy="28" r="2.5" fill="currentColor" />
              </svg>
            </div>

            <div className="arena-calendar-card">
              <div>
                <p className="arena-category mb-2">{event.category}</p>
                <h3 className="arena-event-title">{event.title}</h3>
              </div>
              <p className="arena-calendar-description">{event.description}</p>
              <div className="arena-calendar-status">
                <span className="arena-status">
                  {event.status === 'LIVE' && <span className="arena-status-dot" />}
                  {event.status}
                </span>
              </div>
              <Link to="/register" className="arena-calendar-link" aria-label={`Explore ${event.title}`}>
                <span className="arena-calendar-arrow" aria-hidden="true">↗</span>
                <span>Explore <span aria-hidden="true">↗</span></span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
