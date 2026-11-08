const students = [
  { x: 91, y: 185, shirt: 'var(--lime)', hair: 'M-27 1Q-42 -24 -22 -39Q-14 -53 4 -45Q26 -51 32 -28L29 16L16 10L-17 12Z', style: 'long' },
  { x: 274, y: 72, shirt: 'var(--purple)', hair: 'M-25 -9Q-39 -16 -27 -28Q-32 -44 -13 -43Q-6 -57 8 -45Q28 -51 32 -33Q44 -20 25 -8L16 -21L-14 -16Z', style: 'short' },
  { x: 455, y: 185, shirt: 'var(--purple-soft)', hair: 'M-26 -9Q-34 -31 -15 -37Q-10 -48 3 -40Q23 -48 26 -31Q38 -25 25 -9L16 -18L-18 -16Z', style: 'glasses' },
]

export default function SharedCanvas() {
  return (
    <svg viewBox="0 0 550 550" className="mission-art" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-labelledby="mission-art-title">
      <title id="mission-art-title">Students connect their ideas and turn them into something they can build.</title>
      <g className="mission-connections" stroke="var(--purple)">
        <path data-mission-path d="M120 220C126 275 182 253 213 282" />
        <path data-mission-path d="M274 118C248 166 294 172 274 217" />
        <path data-mission-path d="M425 222C409 269 366 254 337 283" />
        <path data-mission-path d="M275 354C284 374 267 385 273 413" />
      </g>
      <g>{students.map(student => <g key={student.x} transform={`translate(${student.x} ${student.y})`}><g data-mission-student>
        <circle r="53" fill="var(--white)" />
        <path d={student.hair} fill="var(--ink)" />
        <path d="M-39 35Q-27 17 -12 19L-8 9H8L12 19Q29 18 39 35Q0 68 -39 35Z" fill={student.shirt} />
        <path d="M-11 18Q0 30 11 18M-24 32L-25 43M24 32L25 43" />
        <path d="M-22 -17Q-24 4 -14 12Q0 23 15 10Q25 1 22 -20Q10 -10 0 -27Q-7 -12 -22 -17Z" fill="var(--white)" />
        {student.style === 'glasses' ? <g><circle cx="-10" cy="-5" r="7" /><circle cx="10" cy="-5" r="7" /><path d="M-3 -5H3M-22 -8L-17 -5M17 -5L22 -8" /></g> : <path d="M-9 -4V-2M9 -4V-2" strokeWidth="2.5" />}
        <path d="M0 -1L-2 5H1M-5 10Q0 14 6 9" />
        <path d="M42 -47L47 -57M50 -39L60 -44" stroke="var(--lime)" strokeWidth="4" />
      </g></g>)}</g>
      <g data-mission-idea>
        <circle data-mission-glow cx="275" cy="280" r="66" fill="var(--purple-soft)" stroke="none" />
        <path d="M247 318C247 305 230 296 230 273A45 45 0 0 1 320 273C320 296 303 305 303 318Z" fill="var(--white)" stroke="var(--purple)" strokeWidth="3" />
        <path d="M266 318L259 274Q251 256 248 270Q245 286 275 284Q305 286 302 270Q299 256 291 274L284 318" stroke="var(--purple)" strokeWidth="2.5" />
        <rect x="247" y="318" width="56" height="11" rx="5" fill="var(--purple-soft)" />
        <rect x="250" y="329" width="50" height="10" rx="4" fill="var(--purple-soft)" />
        <path d="M260 339Q275 358 290 339" fill="var(--white)" />
        <g stroke="var(--purple)" strokeWidth="3"><path d="M275 211V200M237 223L230 214M221 251L209 247M314 223L321 214M329 251L341 247" /></g>
      </g>
      <g data-mission-prototype>
        <rect x="169" y="428" width="245" height="109" rx="13" fill="var(--purple-soft)" transform="rotate(3 290 480)" />
        <g transform="rotate(-3 275 470)"><rect x="148" y="410" width="250" height="112" rx="13" fill="var(--white)" />
          <rect x="165" y="426" width="76" height="48" rx="8" fill="var(--purple-soft)" />
          <path d="M273 434L259 447L273 460M308 434L322 447L308 460M297 430L285 464" stroke="var(--purple)" strokeWidth="3" />
          <rect x="165" y="487" width="54" height="21" rx="10.5" fill="var(--lime)" /><circle cx="207" cy="497.5" r="10" fill="var(--white)" />
          <path d="M259 487H370M259 499H339" stroke="var(--muted)" strokeWidth="4" opacity=".4" />
        </g>
      </g>
      <g fill="var(--lime)">{Array.from({ length: 4 }, (_, i) => <circle key={i} data-mission-pulse r="4.5" />)}</g>
      <g stroke="var(--lime)" strokeWidth="3"><path d="M113 438V452M106 445H120M432 383V397M425 390H439M442 504L453 495M447 514L461 510" /></g>
    </svg>
  )
}
