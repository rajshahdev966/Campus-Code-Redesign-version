import { Link, NavLink, useParams } from 'react-router'
import CampusLogo from '../../../../components/CampusLogo'
import HackathonsSection from '../components/HackathonsSection'

export default function ArenaPreviewPage() {
  const { variant } = useParams()
  const current = variant === 'calendar' ? 'calendar' : 'tickets'

  return (
    <main className="min-h-screen bg-canvas">
      <header className="border-b border-line bg-paper">
        <div className="workspace-width flex flex-wrap items-center justify-between gap-5 py-6">
          <Link to="/" aria-label="CampusCode home"><CampusLogo className="w-[165px]" /></Link>
          <nav aria-label="Arena design previews" className="flex flex-wrap gap-2">
            <NavLink to="/preview/arena/tickets" className={({ isActive }) => `arena-preview-tab ${isActive ? 'bg-purple-soft text-purple' : 'text-muted'}`}>01 / Ticket edge</NavLink>
            <NavLink to="/preview/arena/calendar" className={({ isActive }) => `arena-preview-tab ${isActive ? 'bg-purple-soft text-purple' : 'text-muted'}`}>02 / Calendar pin</NavLink>
          </nav>
          <Link to="/#hackathons" className="text-xs text-muted hover:text-purple">Back to landing ↗</Link>
        </div>
      </header>
      <HackathonsSection variant={current} />
    </main>
  )
}
