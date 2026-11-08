export default function BrowserCard({ variant }) {
  const isAI = variant === 'ai'
  return (
    <div className={`scene-position scene-${variant}`}><div className="scene-float"><div data-card className="scene-browser">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-1.5 rounded-full bg-purple" /><span className="size-1.5 rounded-full bg-line" /><span className="size-1.5 rounded-full bg-line" />
        <span className="ml-auto font-mono text-[8px] tracking-wider text-muted">{isAI ? '01 / DISCOVER' : '02 / CREATE'}</span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-muted"><span>{isAI ? 'Your next challenge' : 'Your next big thing'}</span><span>↗</span></div>
        <h2 className="text-[23px] font-extrabold leading-none tracking-[-.05em]">{isAI ? 'AI INNOVATION' : 'FUTURE WEB'}</h2>
        {isAI ? <>
          <div className="my-4 rounded-lg bg-purple-soft p-3 font-mono text-[10px] leading-[1.9]">
            {['> idea.create()', '> team.join()', '> project.build()'].map(line => <div key={line} className="overflow-hidden"><p data-code-line className="whitespace-nowrap text-purple">{line}</p></div>)}
            <span data-cursor className="inline-block h-2.5 w-1.5 bg-purple" />
          </div>
          <div className="flex items-center justify-between"><div className="flex -space-x-1.5">{['JD', 'AK', 'YOU'].map((name, i) => <span key={name} data-avatar className={`flex size-8 items-center justify-center rounded-full border-2 border-paper text-[8px] font-bold ${i === 1 ? 'bg-purple text-paper' : i === 2 ? 'bg-lime' : 'bg-surface'}`}>{name}</span>)}</div><span className="font-mono text-[8px] text-muted">Better, together.</span></div>
        </> : <>
          <div data-ui-block className="mt-4 flex h-[90px] items-center justify-center rounded-lg bg-purple-soft">
            <svg width="120" height="65" viewBox="0 0 120 65" fill="none" aria-hidden="true"><circle cx="88" cy="16" r="8" fill="var(--lime)" /><path data-mountain d="M8 57 39 12 68 57M49 57 78 28 107 57" stroke="var(--purple)" strokeWidth="3" strokeLinejoin="round" pathLength="1" /></svg>
          </div>
          <div className="mt-4 space-y-2">{['w-4/5', 'w-full', 'w-3/5'].map((width, i) => <div key={i} data-ui-line className={`h-1.5 origin-left rounded bg-line ${width}`} />)}</div>
          <div data-stamp className="scene-stamp">Your idea<br />shipped ✓</div>
        </>}
      </div>
    </div></div></div>
  )
}
