import CampusLogo from '../../../../components/CampusLogo'

const groups = [
  { title: 'PRODUCT', links: [
    { label: 'About', href: '#about' },
    { label: 'Hackathons', href: '#hackathons' },
    { label: 'How it works', href: '#how' },
    { label: 'Community', href: '#community' },
  ] },
  { title: 'BUILDERS', links: ['Students', 'Teams', 'Organizers', 'Developers'].map((label) => ({ label, href: '#community' })) },
  { title: 'GUIDES', links: [
    { label: 'Hackathon Rules', href: '#how' },
    { label: 'FAQ', href: '#about' },
    { label: 'Support', href: 'mailto:campuscode@gmail.com' },
    { label: 'Contact', href: 'mailto:campuscode@gmail.com' },
  ] },
]

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-canvas pt-12">
      <div className="mx-auto w-[90%] max-w-[1200px]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[2.2fr_1fr_1fr_1fr] md:gap-x-12 lg:gap-x-16">
          <div className="col-span-2 md:col-span-1">
            <a href="#home" aria-label="Back to CampusCode home" className="inline-block"><CampusLogo className="w-[165px]" /></a>
            <p className="mt-6 text-[14px] leading-6 text-muted">The student hackathon arena.<br />You build the idea,<br />we run the competition.</p>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title.toLowerCase()}>
              <h3 className="eyebrow mb-6 text-[9px] tracking-[1px] text-purple">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => <li key={link.label}><a href={link.href} className="text-[14px] leading-5 text-muted transition-colors duration-300 hover:text-purple">{link.label}</a></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[8px] uppercase tracking-[.5px] text-muted">
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-2 rounded-full bg-status shadow-[0_0_0_4px_var(--status-halo)]" />All systems operational</span>
          <span>Terms</span>
          <span>Privacy</span>
          <a href="mailto:campuscode@gmail.com" className="transition-colors hover:text-purple">Contact</a>
        </div>
      </div>
      <a href="#home" aria-label="CampusCode — back to top" className="mt-7 block w-max whitespace-nowrap pl-[7vw] text-[17vw] font-black leading-[.85] tracking-[-.075em] text-footer-wordmark">CampusCode</a>
      <div className="relative mx-auto mt-5 flex w-[90%] max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-line py-6 font-mono text-[8px] uppercase tracking-[.5px] text-muted">
        <span>© 2026 CampusCode</span><span>Learn · Build · Complete · Ship</span><span>Chennai · India</span>
      </div>
    </footer>
  )
}
