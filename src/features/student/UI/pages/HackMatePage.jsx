import { useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { demoTeammates } from '../../state/dashboardData'
import DashboardIcon from '../components/DashboardIcon'

export default function HackMatePage() {
  const { joinedEvents } = useOutletContext()
  const [selectedEvent, setSelectedEvent] = useState('')
  const [query, setQuery] = useState('')
  const [invited, setInvited] = useState([])
  const teammates = demoTeammates.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker">Intelligence / HackMate</p><h1 className="dashboard-heading mt-2">FIND YOUR TEAM.</h1><p className="mt-3 max-w-[630px] text-[14px] leading-6 text-muted">Find registered students from the same hackathon using HackMate match scores. Search by name and discover people to build with.</p></div><div className="dashboard-count"><strong>{selectedEvent ? '03' : '00'}</strong><span>STUDENTS</span></div></div>
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-line bg-paper p-5 shadow-[0_10px_35px_#11111104] sm:flex-row sm:items-center"><label htmlFor="hackmate-event" className="font-mono text-[10px] font-bold uppercase tracking-[.8px] text-muted">Select registered hackathon</label><select id="hackmate-event" value={selectedEvent} onChange={event => setSelectedEvent(event.target.value)} className="dashboard-input sm:max-w-[440px]"><option value="">Choose a registered hackathon</option>{joinedEvents.map(event => <option key={event.id} value={event.id}>{event.title}</option>)}</select></section>
      {!selectedEvent ? <section className="dashboard-empty mt-4"><svg viewBox="0 0 52 44" aria-hidden="true" className="mx-auto mb-3 w-10 opacity-60"><path d="M12 3H22L10 41H0Z" fill="#111" /><path d="M27 3H37L25 41H15Z" fill="var(--purple)" /><path d="M42 3H52L40 41H30Z" fill="var(--lime)" /></svg><h2 className="text-[12px] font-semibold tracking-[.4px] text-muted">{joinedEvents.length ? 'SELECT A REGISTERED HACKATHON' : 'NO REGISTERED HACKATHONS'}</h2><p className="mx-auto mt-2 max-w-[400px] text-[11px] leading-5 text-muted">{joinedEvents.length ? 'Choose an event above to explore your demo teammate matches.' : 'Register for a hackathon first. HackMate only works with your registered hackathons.'}</p>{!joinedEvents.length && <Link to="/student/events" className="dashboard-text-link mt-4 inline-block">Browse events ↗</Link>}</section> : <section className="mt-5"><label className="relative block"><span className="sr-only">Search teammates</span><DashboardIcon name="search" className="absolute left-4 top-3.5 size-4 text-muted" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search teammates by name" className="dashboard-input bg-paper pl-11" /></label><p className="mt-3 text-[11px] text-muted">Demo matches for your selected event.</p><div className="mt-4 grid gap-4 md:grid-cols-3">{teammates.map(person => <article key={person.name} className="dashboard-panel"><div className="flex justify-between gap-4"><span className="event-monogram size-12">{person.initials}</span><span className="dashboard-pill">{person.score}% match</span></div><h2 className="mt-5 font-bold">{person.name}</h2><p className="mt-2 text-xs text-muted">{person.skills}</p><button type="button" onClick={() => setInvited(previous => [...previous, person.name])} disabled={invited.includes(person.name)} className="dashboard-outline-button mt-6 w-full disabled:opacity-50">{invited.includes(person.name) ? 'Demo invite sent' : 'Invite to team ↗'}</button></article>)}</div>{!teammates.length && <p className="dashboard-empty mt-4 text-sm text-muted">No students match your search.</p>}</section>}
    </>
  )
}
