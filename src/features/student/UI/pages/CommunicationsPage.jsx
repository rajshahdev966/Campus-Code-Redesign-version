import { useState } from 'react'
import { useOutletContext } from 'react-router'
import DashboardIcon from '../components/DashboardIcon'

export default function CommunicationsPage() {
  const { announcements, notificationsRead, setNotificationsRead } = useOutletContext()
  const [category, setCategory] = useState('All updates')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('round-live')
  const filtered = announcements.filter(item => (category === 'All updates' || item.category === category) && (item.title + item.body).toLowerCase().includes(query.trim().toLowerCase()))
  const selected = filtered.find(item => item.id === selectedId) || filtered[0]

  return (
    <>
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker">CampusCode / official updates</p><h1 className="dashboard-heading mt-2">STAY IN THE LOOP.</h1><p className="mt-3 max-w-2xl text-[14px] leading-6 text-muted">Event announcements, team updates, and important messages from the CampusCode community.</p></div><div className="dashboard-count"><strong>{notificationsRead ? '00' : String(announcements.length).padStart(2, '0')}</strong><span>UNREAD UPDATES</span></div></div>
      <div className="catalogue-controls"><div className="dashboard-segments" role="group" aria-label="Filter announcements">{['All updates', 'Event update', 'Team update'].map(option => <button type="button" key={option} onClick={() => setCategory(option)} aria-pressed={category === option}>{option}</button>)}</div><button type="button" onClick={() => setNotificationsRead(true)} className="dashboard-text-link">{notificationsRead ? 'All caught up ✓' : 'Mark all as read'}</button></div>
      <div className="communication-inbox">
        <section className="communication-list" aria-label="Announcements"><label className="dashboard-search"><span className="sr-only">Search announcements</span><DashboardIcon name="search" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search official communication" className="dashboard-input" /></label><p className="dashboard-result-count" role="status">{filtered.length} / {announcements.length}</p>
          {filtered.map(item => <button type="button" key={item.id} onClick={() => setSelectedId(item.id)} aria-pressed={selected?.id === item.id} aria-controls="communication-message" className="communication-preview"><span className="communication-preview-meta"><span>{item.category}</span><time>{item.date}</time></span><strong>{!notificationsRead && <i aria-label="Unread" />}{item.title}</strong><span className="communication-snippet">{item.body}</span><span className="communication-event">{item.event}</span></button>)}
          {!filtered.length && <div className="dashboard-empty"><p className="text-xs text-muted">No updates match your search.</p><button type="button" onClick={() => { setQuery(''); setCategory('All updates') }} className="dashboard-text-link mt-3">Clear filters</button></div>}
        </section>
        <section id="communication-message" className="communication-message" aria-label="Selected announcement">
          {selected ? <article key={selected.id}><div className="communication-message-icon"><DashboardIcon name="bell" /></div><p className="dashboard-kicker">{selected.category} / {selected.event}</p><h2>{selected.title}</h2><time>{selected.date}</time><div className="communication-message-body"><p>{selected.body}</p></div><p className="dashboard-label text-muted">CampusCode team · Student workspace</p></article> : <div className="communication-no-message"><DashboardIcon name="bell" className="size-8 text-purple" /><p>No updates match your search.</p></div>}
        </section>
      </div>
    </>
  )
}
