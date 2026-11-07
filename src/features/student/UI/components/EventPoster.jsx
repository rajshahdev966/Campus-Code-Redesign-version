export default function EventPoster({ event }) {
  const rebuild = event.id === 'rebuild-26'
  return (
    <div className="relative isolate overflow-hidden rounded-b-xl border-b-[3px] border-lime bg-paper px-5 py-7 sm:px-7">
      <div aria-hidden="true" className="absolute -right-2 inset-y-0 -z-10 flex -skew-x-[17deg] gap-2 opacity-10"><span className="w-5 bg-lime" /><span className="w-5 bg-lime" /><span className="w-5 bg-purple" /></div>
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 90 90" aria-hidden="true" className="size-16 shrink-0 rounded-2xl sm:size-20"><rect width="90" height="90" rx="20" fill="#090b09" /><path d="M23 19h10L20 70H10Z" fill="white" /><path d="M40 19h10L37 70H27Z" fill="var(--purple)" /><path d="M57 19h10L54 70H44Z" fill="var(--lime)" /></svg>
        <div className="min-w-0"><p className="font-sans text-[7px] font-bold tracking-[1.8px] text-muted">CAMPUSCODE PRESENTS</p><p className="mt-1 text-[clamp(20px,2.4vw,40px)] font-bold leading-none tracking-[-1px]">{rebuild ? <>ReBuild <span className="text-purple">'26</span></> : event.title}</p><p className="mt-2 text-[9px] font-bold tracking-[.4px] sm:text-[11px]">{event.subtitle}</p><p className="mt-3 hidden text-[6px] font-bold tracking-wide text-muted sm:block">● CERTIFICATE FOR WINNERS　 ● INTERNSHIP OPPORTUNITY　 ● BUILD WITH CAMPUSCODE</p></div>
      </div>
    </div>
  )
}
