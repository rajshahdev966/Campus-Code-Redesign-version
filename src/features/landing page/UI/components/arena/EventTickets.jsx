import { Link } from 'react-router'

export default function EventTickets({ events }) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <article key={event.title} className="arena-ticket" data-status={event.status.toLowerCase()}>
          <div className="arena-ticket-stub" aria-hidden="true">
            <span className="arena-ticket-number">{String(index + 1).padStart(2, '0')}</span>
          </div>

          <div className="arena-ticket-copy">
            <p className="arena-category">{event.category}</p>
            <h3 className="arena-event-title">{event.title}</h3>
            <p className="arena-description">{event.description}</p>
          </div>

          <div className="arena-ticket-action">
            <span className="arena-ticket-status">
              {event.status === 'LIVE' && <span aria-hidden="true" className="arena-status-dot" />}
              {event.status}
            </span>
            <Link to="/register" className="arena-explore" aria-label={`Explore ${event.title}`}>Explore <span aria-hidden="true">↗</span></Link>
          </div>
        </article>
      ))}
    </div>
  )
}
