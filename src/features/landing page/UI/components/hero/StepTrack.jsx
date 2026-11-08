export default function StepTrack({ onSelect }) {
  return (
    <div className="scene-track">
      <svg viewBox="0 0 540 70" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path data-track d="M65 35 C135 0 195 70 270 35 S405 0 475 35" fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 5" />
        <circle data-pulse r="5" fill="var(--lime)" cx="0" cy="0" />
      </svg>
      {['Discover', 'Build', 'Ship'].map((step, index) => <button key={step} type="button" data-pill={index} onClick={() => onSelect(step.toLowerCase())} className="scene-step" aria-label={`Preview ${step.toLowerCase()} stage`}><span className="mr-2 text-[9px] opacity-60">0{index + 1}</span>{step}{index === 2 && <span data-check className="ml-1">✓</span>}</button>)}
    </div>
  )
}
