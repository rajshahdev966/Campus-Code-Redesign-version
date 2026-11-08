import { useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { demoTeammates } from '../../state/dashboardData'
import DashboardIcon from '../components/DashboardIcon'

export default function HackMatePage() {
  const { joinedEvents } = useOutletContext()
  const [selectedEvent, setSelectedEvent] = useState('')
  const [query, setQuery] = useState('')
  const [invited, setInvited] = useState([])
  const [filter, setFilter] = useState('All matches')
  const [message, setMessage] = useState('')
  const isInvited = person => invited.includes(`${selectedEvent}:${person.name}`)
  const teammates = demoTeammates.filter(person => (person.name + ' ' + person.skills).toLowerCase().includes(query.trim().toLowerCase()) && (filter === 'All matches' || (filter === 'Invited' ? isInvited(person) : !isInvited(person))))

  function invite(person) {
    setInvited(previous => [...previous, `${selectedEvent}:${person.name}`])
    setMessage(`Demo invite sent to ${person.name}.`)
  }

  return (
    <>
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker">Intelligence / HackMate</p><h1 className="dashboard-heading mt-2">FIND YOUR TEAM.</h1><p className="mt-3 max-w-[630px] text-[14px] leading-6 text-muted">Find registered students from the same hackathon using HackMate match scores. Search by name and discover people to build with.</p></div><div className="dashboard-count"><strong>{selectedEvent ? String(teammates.length).padStart(2, '0') : '00'}</strong><span>STUDENTS</span></div></div>
      <section className="dashboard-toolbar teammate-event-selector"><label htmlFor="hackmate-event" className="dashboard-form-label">Select registered hackathon</label><select id="hackmate-event" value={selectedEvent} onChange={event => { setSelectedEvent(event.target.value); setQuery(''); setFilter('All matches'); setMessage('') }} className="dashboard-input sm:max-w-[440px]"><option value="">Choose a registered hackathon</option>{joinedEvents.map(event => <option key={event.id} value={event.id}>{event.title}</option>)}</select></section>
      {!selectedEvent ? <section className="teammate-empty dashboard-empty"><div className="teammate-empty-icons" aria-hidden="true">{['user', 'sparkles', 'user'].map((icon, i) => <span key={i}><DashboardIcon name={icon} /></span>)}</div><h2>{joinedEvents.length ? 'SELECT A REGISTERED HACKATHON' : 'NO REGISTERED HACKATHONS'}</h2><p>{joinedEvents.length ? 'Choose an event above to explore your demo teammate matches.' : 'Register for a hackathon first. HackMate only works with your registered hackathons.'}</p>{!joinedEvents.length && <Link to="/student/events" className="dashboard-text-link mt-4 inline-block">Browse events ↗</Link>}</section> : <section className="mt-5">
        <div className="catalogue-controls"><div className="dashboard-segments" role="group" aria-label="Filter teammates">{['All matches', 'Available', 'Invited'].map(option => <button type="button" key={option} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>)}</div><label className="dashboard-search"><span className="sr-only">Search teammates</span><DashboardIcon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search teammates by name" className="dashboard-input" /></label></div>
        <p className="dashboard-result-count">Demo matches for your selected event.</p>
        <div className="teammate-grid">{teammates.map(person => <article key={person.name} className="teammate-card" data-invited={isInvited(person)}><div className="flex items-center justify-between gap-3"><span className="teammate-avatar">{person.initials}</span><span className="dashboard-pill">{person.score}% match</span></div><h2>{person.name}</h2><p className="teammate-skills">{person.skills}</p><button type="button" onClick={() => invite(person)} disabled={isInvited(person)} className="dashboard-outline-button">{isInvited(person) ? <><DashboardIcon name="check" />Demo invite sent</> : <>Invite to team ↗</>}</button></article>)}</div>
        {!teammates.length && <div className="dashboard-empty mt-4"><p className="text-sm text-muted">No students match your search.</p><button type="button" className="dashboard-text-link mt-3" onClick={() => { setQuery(''); setFilter('All matches') }}>Clear filters</button></div>}
      </section>}
      <p role="status" className="mt-3 text-xs text-purple">{message}</p>
    </>
  )
}
