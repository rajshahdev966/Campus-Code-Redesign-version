export default function StickyNote() {
  return (
    <div className="scene-position scene-note"><div className="scene-float"><div data-card className="relative rounded-sm bg-purple p-5 text-paper shadow-floating">
      <span data-pin className="absolute -top-2 left-[47%] size-4 rounded-full border-4 border-lime shadow-md" />
      <span className="font-mono text-[8px] uppercase tracking-widest text-paper/70">Good things take a team</span>
      <p className="my-3 text-[28px] font-bold leading-none tracking-[-.05em]">Team up.<br />Go further.</p>
      <div className="space-y-2"><div data-note-line className="h-1 w-4/5 origin-left rounded bg-paper/40" /><div data-note-line className="h-1 w-3/5 origin-left rounded bg-paper/25" /></div>
      <span className="absolute bottom-4 right-4 text-xl text-lime" aria-hidden="true">✳</span>
    </div></div></div>
  )
}
