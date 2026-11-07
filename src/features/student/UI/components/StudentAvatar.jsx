export default function StudentAvatar({ className = 'size-10' }) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="Raj Shah avatar" className={className}>
      <circle cx="50" cy="50" r="48" fill="#d4f0f4" stroke="#e9e9dc" strokeWidth="4" />
      <path d="M23 42c0-33 55-33 55 0L70 28 33 25Z" fill="#a7ada9" />
      <path d="M31 75q19-8 38 0l-3 22H34Z" fill="var(--purple)" />
      <ellipse cx="50" cy="49" rx="24" ry="26" fill="#965d24" />
      <path d="M27 37q3-24 23-15 16-7 24 15l-9-7-8 4-10-7-10 7Z" fill="#805120" />
      <circle cx="41" cy="48" r="2.4" fill="#25281a" /><circle cx="59" cy="48" r="2.4" fill="#25281a" />
      <ellipse cx="35" cy="55" rx="4" ry="2.5" fill="#b88645" /><ellipse cx="65" cy="55" rx="4" ry="2.5" fill="#b88645" />
      <path d="M44 60q6 5 12 0" fill="none" stroke="#382c1b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
