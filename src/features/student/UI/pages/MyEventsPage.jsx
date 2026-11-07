import { Link, useOutletContext } from 'react-router'
import EventPoster from '../components/EventPoster'

export default function MyEventsPage() {
  const { joinedEvents, studentProfile } = useOutletContext()

  return (
    <>
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker">My activity / student workspace</p><h1 className="dashboard-heading mt-2">MY EVENTS.</h1><p className="mt-3 text-[14px] leading-6 text-muted">Every event you joined, in one place. Open one to see its rounds, team, results and certificates.</p></div><div className="dashboard-count"><strong>{String(joinedEvents.length).padStart(2, '0')}</strong><span>YOUR EVENTS</span></div></div>
      <div className="grid gap-5 xl:grid-cols-2">{joinedEvents.map(event => <article key={event.id} className="border border-line bg-paper p-6 sm:p-7"><EventPoster event={event} /><div className="mt-4 flex flex-wrap justify-between gap-3 font-mono text-[9px]"><span>REGISTRATION</span><span className="font-bold text-[#9beb62]">7dd3ca81-b975-48b0-ab13-43fb678a1504</span></div><div className="mt-7 flex items-center justify-between gap-6"><span className="event-monogram size-14 text-lg">{event.initials}</span><h2 className="text-right font-mono text-[clamp(20px,2vw,32px)] font-bold tracking-[-2px] text-[#595959]">{event.title}</h2></div><p className="mt-4 text-[13px] text-muted">STATUS: <strong className="text-muted/60">REGISTERED</strong></p><p className="mt-3 text-[13px] text-muted">TEAM: <strong className="text-muted/60">{studentProfile.team}</strong></p><Link to={`/student/events?event=${event.id}`} className="dashboard-button mt-9">Open journey ↗</Link></article>)}</div>
      {!joinedEvents.length && <div className="dashboard-empty"><h2 className="font-bold">Your next event is waiting.</h2><Link to="/student/events" className="dashboard-button mt-5">Browse events ↗</Link></div>}
    </>
  )
}
