import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import DashboardIcon from './DashboardIcon'

export default function EventDetailsDialog({ event, onClose, onJoin }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog ref={dialogRef} aria-labelledby="event-detail-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} className="dashboard-dialog event-drawer">
      <div className="event-drawer-header"><p className="dashboard-kicker">CampusCode / Event details</p><button type="button" onClick={onClose} aria-label="Close event details" className="rounded-lg border border-line p-2"><DashboardIcon name="close" /></button></div>
      <div className="event-drawer-mark" aria-hidden="true">{event.initials}<span>{event.category}</span></div>
      <h2 id="event-detail-title" className="mt-6 text-3xl font-bold tracking-[-1px]">{event.title}</h2>
      <div className="mt-3 flex flex-wrap gap-2"><span className="dashboard-pill">{event.category}</span><span className="dashboard-pill">{event.date}</span><span className="dashboard-pill">{event.status}</span></div>
      <p className="mt-5 text-[13px] leading-6 text-muted">{event.description}</p>
      {event.joined && <section className="mt-6 rounded-xl border border-line bg-canvas p-5"><p className="dashboard-label text-muted">Your journey</p><div className="mt-3 flex flex-wrap justify-between gap-4"><p className="text-sm font-bold">Team Clif</p><span className="text-xs font-semibold text-purple">REGISTERED</span></div><p className="mt-3 text-xs leading-5 text-muted">You are ready to build. Find teammates in HackMate, check your idea, or read the event announcements.</p></section>}
      <div className="event-drawer-actions">{event.joined ? <Link to="/student/hackmate" className="dashboard-button">Find your team ↗</Link> : <button type="button" onClick={() => onJoin(event.id)} className="dashboard-button">Join event ↗</button>}<Link to="/student/communications" className="dashboard-outline-button">Official updates</Link></div>
    </dialog>
  )
}
