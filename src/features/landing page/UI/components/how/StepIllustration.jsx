function Drawing({ step }) {
  if (step === 0) return (
    <g data-ticket transform="rotate(-8 110 70)">
      <path d="M35 40H180V52Q166 60 180 68V86Q166 94 180 102H35V90Q49 82 35 74V56Q49 48 35 40Z" fill="var(--white)" />
      <path data-mountain d="M48 101L69 76L82 88L96 66L124 101Z" fill="var(--purple)" />
      <g data-flag><path d="M96 66V46" /><path d="M96 46H114L108 52L114 58H96Z" fill="var(--lime)" /></g>
      <g data-lines><path d="M129 56H162" /><path d="M129 68H158" /><path d="M129 80H163" /></g>
      <path data-scan d="M53 44L75 98" stroke="var(--white)" strokeWidth="9" opacity=".8" />
    </g>
  )
  if (step === 1) return (
    <>
      {[55, 110, 165].map((x, i) => <g data-avatar key={x} transform={`translate(${x} 74)`}>
        <circle data-avatar-ring r="29" fill="var(--white)" />
        <path d="M-23 18Q0 1 23 18L20 23Q0 35 -20 23Z" fill={i === 1 ? 'var(--purple)' : 'var(--lime)'} />
        <path d="M-13 -5Q-14 -23 0 -23Q16 -23 14 -4L9 5H-9Z" fill="var(--ink)" />
        <ellipse cy="-4" rx="11" ry="14" fill="var(--white)" />
        <path d="M-11 -10Q-4 -7 0 -16Q5 -7 11 -10M-4 5Q0 8 4 5" />
        <path d="M-4 -3H-3M4 -3H5" strokeWidth="2.5" />
      </g>)}
      <path data-ping d="M79 39V49M74 44H84M140 103V113M135 108H145" stroke="var(--purple)" />
    </>
  )
  if (step === 2) return (
    <>
      <rect data-browser-fill x="43" y="38" width="139" height="76" rx="5" fill="var(--purple-soft)" stroke="none" />
      <path data-frame pathLength="1" d="M48 38H177Q182 38 182 43V109Q182 114 177 114H48Q43 114 43 109V43Q43 38 48 38ZM43 56H182" fill="none" />
      {[57, 69, 81].map((x, i) => <circle data-browser-dot key={x} cx={x} cy="47" r="3" fill={['var(--lime)', 'var(--purple)', 'var(--muted)'][i]} />)}
      <g data-code stroke="var(--purple)" strokeWidth="3"><path d="M73 73L62 83L73 93M95 73L106 83L95 93M88 69L80 97" /></g>
      <g data-lines><path d="M124 73H166" /><path d="M124 84H161" /><path d="M124 95H151" /></g>
    </>
  )
  return (
    <>
      <circle data-ripple cx="110" cy="75" r="45" stroke="var(--lime)" fill="none" />
      <g data-stamp transform="rotate(-10 110 75)" stroke="var(--purple)">
        <rect x="32" y="48" width="157" height="51" rx="6" fill="var(--white)" strokeWidth="3" />
        <text x="43" y="82" fill="var(--purple)" stroke="none" fontSize="23" fontWeight="900" fontFamily="Inter, sans-serif" letterSpacing="-1">SHIPPED</text>
        <path data-check pathLength="1" d="M158 75L166 83L179 65" strokeWidth="4" />
      </g>
    </>
  )
}

export default function StepIllustration({ step }) {
  return (
    <svg className="journey-illustration" viewBox="0 0 220 140" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g className="journey-ghost" data-ghost><Drawing step={step} /></g>
      <g data-colour><Drawing step={step} /></g>
      <g data-sparkles><path d="M186 30L190 20" /><path d="M194 36L204 29" /><path d="M198 44L209 43" /></g>
    </svg>
  )
}
