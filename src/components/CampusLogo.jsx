export default function CampusLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 220 44" role="img" aria-label="CampusCode — Hackathon Arena" className={className}>
      <path d="M12 3H22L10 41H0Z" fill="currentColor" />
      <path d="M27 3H37L25 41H15Z" fill="var(--purple)" />
      <path d="M42 3H52L40 41H30Z" fill="var(--lime)" />
      <text x="61" y="21" fill="currentColor" fontFamily="Inter, sans-serif" fontSize="17" fontWeight="900" letterSpacing="1.5">CAMPUSCODE</text>
      <text x="62" y="36" fill="var(--muted)" fontFamily="DM Mono, monospace" fontSize="7" letterSpacing="2">HACKATHON ARENA</text>
    </svg>
  )
}
