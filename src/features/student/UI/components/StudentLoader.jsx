import { useEffect } from 'react'
import CampusLogo from '../../../../components/CampusLogo'
import useLoaderProgress from '../../hooks/useLoaderProgress'

export default function StudentLoader({ onComplete }) {
  const { progress, restart } = useLoaderProgress()
  const ready = progress === 100

  useEffect(() => {
    if (ready && onComplete) onComplete()
  }, [ready, onComplete])
  const status = ready ? 'READY TO BUILD' : progress < 30 ? 'VERIFYING IDENTITY...' : progress < 66 ? 'AUTHENTICATING SESSION...' : progress < 86 ? 'LOADING USER PROFILE...' : 'SYNCING CAMPUSCODE...'

  return (
    <section aria-label="Student workspace initialization" className="student-loader relative isolate flex min-h-svh flex-col overflow-hidden bg-loader-bg text-paper">
      <div aria-hidden="true" className="student-loader-grid pointer-events-none absolute inset-0 -z-10" />
      <header className="relative flex items-center justify-between gap-6 px-6 py-6 sm:px-10">
        <CampusLogo className="w-[180px] sm:w-[210px]" />
        <span className="hidden items-center gap-2 font-sans text-[9px] font-bold tracking-[2px] text-paper/50 sm:inline-flex"><span className="size-2 rounded-full bg-loader-lime/60 shadow-[0_0_12px_#a8e62e50]" />SECURE CONNECTION</span>
      </header>
      <div className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-[380px] translate-y-4 text-center sm:translate-y-7">
          <div aria-hidden="true" className={`student-loader-mark mx-auto flex h-16 w-[100px] items-end justify-center gap-3 ${ready ? 'is-ready' : ''}`}>
            <span className="student-loader-bar bg-paper" />
            <span className="student-loader-bar bg-purple [animation-delay:150ms]" />
            <span className="student-loader-bar bg-loader-lime [animation-delay:300ms]" />
          </div>
          <h1 className="mt-7 font-sans text-[15px] font-extrabold tracking-[6px]">CAMPUSCODE</h1>
          <p role="status" aria-live="polite" className="mt-3 min-h-4 font-mono text-[10px] tracking-[3px] text-loader-lime">{status}</p>
          <div className="mt-11">
            <div className="mb-2 flex items-center justify-between gap-4">
              <span id="student-progress-label" className="font-sans text-[9px] font-bold tracking-[2px] text-paper/40">SYSTEM INITIALIZATION</span>
              <span aria-hidden="true" className="font-mono text-[13px] font-bold tabular-nums tracking-[-1px]">{String(progress).padStart(3, '0')}%</span>
            </div>
            <div role="progressbar" aria-labelledby="student-progress-label" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="h-[3px] overflow-hidden rounded-full bg-paper/10">
              <div className="h-full origin-left rounded-full bg-linear-to-r from-purple to-loader-lime transition-transform duration-[60ms] ease-linear" style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="font-sans text-[9px] font-bold tracking-[2px] text-paper/40">ACCESS LEVEL</span>
            <span className="rounded-full border border-loader-lime/35 bg-loader-lime/[.04] px-4 py-1.5 font-sans text-[10px] font-extrabold tracking-[2px] text-loader-lime">STUDENT</span>
          </div>
          <div className="mt-6 h-5">{ready && <button type="button" onClick={restart} className="font-mono text-[8px] tracking-[1.5px] text-paper/40 transition-colors hover:text-loader-lime">REPLAY INITIALIZATION ↻</button>}</div>
        </div>
      </div>
      <footer className="relative flex flex-wrap items-center justify-between gap-4 px-6 py-6 font-sans text-[8px] font-bold tracking-[2px] text-paper/35 sm:px-10">
        <span>CAMPUSCODE © 2026</span><span className="flex items-center gap-2"><span aria-hidden="true" className="size-1.5 rounded-full bg-loader-lime/60 shadow-[0_0_10px_#a8e62e40]" />ALL SYSTEMS OPERATIONAL</span>
      </footer>
    </section>
  )
}
