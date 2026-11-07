import { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router'
import DashboardIcon from '../components/DashboardIcon'
import EventPoster from '../components/EventPoster'
import EventDetailsDialog from '../components/EventDetailsDialog'

export default function EventsPage() {
  const { events, joinEvent } = useOutletContext()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All events')
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedEvent = events.find(event => event.id === searchParams.get('event'))
  const filteredEvents = events.filter(event => event.title.toLowerCase().includes(query.toLowerCase()) && (status === 'All events' || event.status === status))

  return (
    <>
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker">Discover / campus challenges</p><h1 className="dashboard-heading mt-2">ENTER THE ARENA.</h1><p className="mt-3 max-w-2xl text-[14px] leading-6 text-muted">Discover challenges, build something meaningful, and find your next opportunity to compete.</p></div><div className="dashboard-count"><strong>{String(events.length).padStart(2, '0')}</strong><span>EVENTS</span></div></div>
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-line bg-paper p-5 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Search events</span><DashboardIcon name="search" className="absolute left-4 top-3.5 size-4 text-muted" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search events" className="dashboard-input pl-11" /></label><label><span className="sr-only">Filter event status</span><select value={status} onChange={event => setStatus(event.target.value)} className="dashboard-input sm:w-48">{['All events', 'Live', 'Open', 'Upcoming'].map(option => <option key={option}>{option}</option>)}</select></label></div>
      <div className="grid gap-5 xl:grid-cols-2">{filteredEvents.map(event => <article key={event.id} className="border border-line bg-paper p-6 transition-shadow duration-300 hover:shadow-[0_12px_32px_#11111108]"><EventPoster event={event} /><div className="mt-5 flex items-center justify-between gap-4"><p className="dashboard-label text-muted">{event.category}</p><span className="dashboard-pill">{event.status}</span></div><h2 className="mt-4 text-[28px] font-bold tracking-[-1px]">{event.title}</h2><p className="mt-3 line-clamp-3 text-[13px] leading-6 text-muted">{event.description}</p><p className="mt-4 font-mono text-[10px] text-muted">{event.date} · {event.id === 'rebuild-26' ? 'Individual participation' : 'Student competition'}</p><button type="button" onClick={() => setSearchParams({ event: event.id })} className="dashboard-button mt-6">{event.joined ? 'Open event' : 'Explore event'} ↗</button></article>)}</div>
      {!filteredEvents.length && <div className="dashboard-empty"><p className="font-semibold">No events match your search.</p><button type="button" onClick={() => { setQuery(''); setStatus('All events') }} className="dashboard-text-link mt-3">Clear filters</button></div>}
      {selectedEvent && <EventDetailsDialog event={selectedEvent} onClose={() => setSearchParams({})} onJoin={joinEvent} />}
    </>
  )
}
