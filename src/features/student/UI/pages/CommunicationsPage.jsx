import { useState } from 'react'
import { useOutletContext } from 'react-router'
import DashboardIcon from '../components/DashboardIcon'

export default function CommunicationsPage() {
  const { announcements, notificationsRead, setNotificationsRead } = useOutletContext()
  const [category, setCategory] = useState('All updates')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState('round-live')
  const filtered = announcements.filter(item => (category === 'All updates' || item.category === category) && (item.title + item.body).toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker">CampusCode / official updates</p><h1 className="dashboard-heading mt-2">STAY IN THE LOOP.</h1><p className="mt-3 max-w-2xl text-[14px] leading-6 text-muted">Event announcements, team updates, and important messages from the CampusCode community.</p></div><div className="dashboard-count"><strong>{notificationsRead ? '00' : '02'}</strong><span>UNREAD UPDATES</span></div></div>
      <section className="dashboard-panel rounded-2xl"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div className="flex flex-wrap gap-2">{['All updates', 'Event update', 'Team update'].map(option => <button type="button" key={option} onClick={() => setCategory(option)} className={`rounded-lg border px-4 py-2.5 text-[11px] font-semibold transition-colors ${category === option ? 'border-lime bg-lime text-ink' : 'border-line text-muted hover:border-purple'}`}>{option}</button>)}</div><button type="button" onClick={() => setNotificationsRead(true)} className="dashboard-text-link">{notificationsRead ? 'All caught up ✓' : 'Mark all as read'}</button></div><label className="relative mt-5 block"><span className="sr-only">Search announcements</span><DashboardIcon name="search" className="absolute left-4 top-3.5 size-4 text-muted" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search official communication" className="dashboard-input pl-11" /></label></section>
      <div className="mt-5 space-y-4">{filtered.map(item => <article key={item.id} className="overflow-hidden rounded-xl border border-line bg-paper"><button type="button" aria-expanded={expanded === item.id} aria-controls={'announcement-' + item.id} onClick={() => setExpanded(expanded === item.id ? '' : item.id)} className="flex w-full items-start justify-between gap-5 p-6 text-left"><span><span className="dashboard-label text-[#829b2e]">{item.category} / {item.event}</span><span className="mt-3 block text-xl font-bold tracking-[-.5px]">{!notificationsRead && <span className="mr-2 inline-block size-1.5 rounded-full bg-[#adf57a]" />}{item.title}</span><time className="mt-2 block font-mono text-[10px] text-muted">{item.date}</time></span><span aria-hidden="true" className="text-xl text-muted">{expanded === item.id ? '−' : '+'}</span></button>{expanded === item.id && <div id={'announcement-' + item.id} className="border-t border-line px-6 py-5"><p className="max-w-3xl text-[13px] leading-7 text-muted">{item.body}</p><p className="mt-5 font-mono text-[9px] uppercase tracking-[1px] text-muted/60">CampusCode team · Student workspace</p></div>}</article>)}</div>
      {!filtered.length && <p className="dashboard-empty mt-5 text-sm text-muted">No updates match your search.</p>}
    </>
  )
}
