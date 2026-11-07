import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import CampusLogo from '../../../../components/CampusLogo'
import DashboardIcon from '../components/DashboardIcon'
import StudentAvatar from '../components/StudentAvatar'
import { announcements, initialEvents, studentProfile, workspaceNavigation } from '../../state/dashboardData'

export default function DashboardLayout({ onRefresh }) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsRead, setNotificationsRead] = useState(false)
  const [events, setEvents] = useState(initialEvents)
  const activePage = workspaceNavigation.find(item => !item.pending && item.path === pathname) || workspaceNavigation[0]
  const joinedEvents = events.filter(event => event.joined)

  useEffect(() => { document.title = activePage.label + ' — CampusCode' }, [activePage.label])

  function joinEvent(id) {
    setEvents(previous => previous.map(event => event.id === id ? { ...event, joined: true } : event))
  }

  return (
    <div className="min-h-svh bg-canvas" onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); setNotificationsOpen(false) } }}>
      {menuOpen && <button type="button" aria-label="Close sidebar" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-ink/25 lg:hidden" />}
      <aside id="student-sidebar" aria-label="Student workspace navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-line bg-canvas px-[18px] pt-7 pb-7 transition-transform duration-300 lg:visible lg:translate-x-0 ${menuOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'}`}>
        <div className="mb-10 flex items-center justify-between gap-3"><Link to="/" aria-label="CampusCode home"><CampusLogo className="w-[170px]" /></Link><button type="button" aria-label="Close sidebar" onClick={() => setMenuOpen(false)} className="p-1 lg:hidden"><DashboardIcon name="close" /></button></div>
        <p className="dashboard-label mb-3 px-2.5 text-muted/80">Workspace</p>
        <nav className="min-h-0 flex-1 overflow-y-auto pb-6">
          <ul className="space-y-1">
            {workspaceNavigation.map(item => <li key={item.label}>{item.pending
              ? <Link to="/student" onClick={() => setMenuOpen(false)} className="dashboard-nav-link text-muted hover:bg-ink/[.035]"><DashboardIcon name={item.icon} /><span>{item.label}</span>{item.badge && <span className="ml-auto font-mono text-[8px] text-purple">{item.badge}</span>}</Link>
              : <NavLink to={item.path} end onClick={() => setMenuOpen(false)} className={({ isActive }) => `dashboard-nav-link ${isActive ? 'bg-lime text-ink shadow-[0_8px_22px_#a8e62e20]' : 'text-muted hover:bg-ink/[.035]'}`}><DashboardIcon name={item.icon} /><span>{item.label}</span>{pathname === item.path && <span aria-hidden="true" className="ml-auto font-normal">→</span>}</NavLink>}
            </li>)}
          </ul>
        </nav>
        <div className="shrink-0 border-t border-line pt-7 sm:pt-10">
          <p className="dashboard-label mb-3 px-2.5 text-muted/80">Account</p>
          <Link to="/student" onClick={() => setMenuOpen(false)} className="mb-3 flex items-center gap-2.5"><span className="flex size-8 items-center justify-center rounded-full border border-line bg-paper text-[10px] font-bold">{studentProfile.initials}</span><span><span className="block text-[12px] font-bold">{studentProfile.name}</span><span className="block text-[11px] text-muted">STUDENT</span></span></Link>
          <Link to="/login" className="flex h-[38px] items-center justify-center rounded-lg border border-line text-[11px] font-extrabold text-muted transition-colors hover:border-purple hover:text-purple"><DashboardIcon name="logout" className="size-3.5" />LOG OUT</Link>
        </div>
      </aside>
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[75px] items-center justify-between gap-4 border-b border-line bg-canvas/95 px-5 backdrop-blur-sm sm:px-10">
          <div className="flex items-center gap-4"><button type="button" aria-label="Open sidebar" aria-controls="student-sidebar" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="rounded-lg border border-line bg-paper p-2 lg:hidden"><DashboardIcon name="menu" /></button><div><p className="font-mono text-[10px] tracking-[1.3px] text-muted">CAMPUSCODE / STUDENT</p><p className="mt-1 text-[13px] font-bold uppercase tracking-[1.4px]">{activePage.label}</p></div></div>
          <div className="flex items-center gap-2.5">
            <div className="relative"><button type="button" aria-label="Notifications" aria-expanded={notificationsOpen} aria-controls="dashboard-notifications" onClick={() => setNotificationsOpen(!notificationsOpen)} className="relative flex size-[38px] items-center justify-center rounded-lg border border-line bg-paper text-muted shadow-xs"><DashboardIcon name="bell" />{!notificationsRead && <span className="absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-[#adf57a] text-[10px] font-bold text-ink">2</span>}</button>
              {notificationsOpen && <section id="dashboard-notifications" aria-label="Recent notifications" className="absolute right-0 top-12 w-[min(340px,85vw)] rounded-xl border border-line bg-paper p-5 shadow-xl"><div className="flex items-center justify-between gap-4"><h2 className="text-sm font-bold">Notifications</h2><button type="button" onClick={() => setNotificationsRead(true)} className="text-[10px] text-purple">Mark all read</button></div>{announcements.map(item => <Link key={item.id} to="/student/communications" onClick={() => setNotificationsOpen(false)} className="mt-4 block border-t border-line pt-3"><p className="text-xs font-bold">{item.title}</p><p className="mt-1 text-[11px] leading-5 text-muted">{item.body}</p></Link>)}</section>}
            </div>
            <button type="button" onClick={onRefresh} className="flex h-[38px] items-center gap-2 rounded-lg border border-line bg-paper px-3 text-[9px] font-extrabold tracking-[1px] text-muted shadow-xs transition-colors hover:border-purple hover:text-purple"><DashboardIcon name="refresh" /><span className="hidden sm:inline">REFRESH</span></button>
            <Link to="/student" aria-label="Student profile" className="ml-1 flex items-center gap-2"><StudentAvatar className="size-10" /><span className="hidden text-[12px] font-bold text-muted sm:inline">{studentProfile.name}</span></Link>
          </div>
        </header>
        <main className="dashboard-content">
          <div key={pathname} className="dashboard-enter"><Outlet context={{ events, joinedEvents, joinEvent, announcements, studentProfile, notificationsRead, setNotificationsRead }} /></div>
        </main>
      </div>
    </div>
  )
}
