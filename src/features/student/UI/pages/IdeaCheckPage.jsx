import { useState } from 'react'
import { useOutletContext } from 'react-router'
import DashboardIcon from '../components/DashboardIcon'

export default function IdeaCheckPage() {
  const { joinedEvents } = useOutletContext()
  const [review, setReview] = useState(null)

  function checkIdea(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const description = form.get('description').trim()
    const words = description.split(/\s+/).length
    setReview({ title: form.get('title'), score: Math.min(92, 62 + Math.floor(words / 3)), detailed: words >= 60 })
  }

  return (
    <>
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker">Intelligence / IdeaCheck</p><h1 className="dashboard-heading mt-2">BUILD A BETTER IDEA.</h1><p className="mt-3 max-w-2xl text-[14px] leading-6 text-muted">Describe your idea, explore its strengths, and plan the next step before you start building.</p></div><div className="dashboard-count"><strong>AI</strong><span>IDEA WORKSPACE</span></div></div>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <form onSubmit={checkIdea} className="dashboard-panel rounded-2xl"><p className="dashboard-label mb-6 text-muted">Tell us what you’re building</p><label className="dashboard-form-label" htmlFor="idea-event">Hackathon</label><select id="idea-event" name="event" className="dashboard-input mt-2"><option value="">Explore an independent idea</option>{joinedEvents.map(event => <option key={event.id} value={event.id}>{event.title}</option>)}</select><label className="dashboard-form-label mt-5" htmlFor="idea-title">Idea title</label><input id="idea-title" name="title" required minLength={3} maxLength={100} placeholder="Give your idea a name" className="dashboard-input mt-2" /><label className="dashboard-form-label mt-5" htmlFor="idea-description">Your idea</label><textarea id="idea-description" name="description" required minLength={40} maxLength={3000} rows={8} placeholder="What problem are you solving? Who is it for, and how will your solution work?" className="dashboard-input mt-2 min-h-48 resize-y py-3 leading-6" /><p className="mt-3 text-[11px] leading-5 text-muted">Include the problem, intended users, and the smallest version you could build.</p><button type="submit" className="dashboard-button mt-6"><DashboardIcon name="sparkles" />Check idea ↗</button></form>
        {review ? <section aria-live="polite" className="dashboard-panel rounded-2xl border-lime/40 bg-linear-to-br from-[#f5fae6] to-paper"><p className="dashboard-kicker">Demo idea review</p><h2 className="mt-5 text-2xl font-bold tracking-[-1px]">{review.title}</h2><div className="mt-6 flex items-end gap-2"><strong className="text-6xl font-bold tracking-[-4px] text-purple">{review.score}</strong><span className="mb-1 text-sm text-muted">/ 100 · idea readiness</span></div><p className="mt-4 text-[12px] leading-6 text-muted">This local demo uses the level of detail in your description. It is a preview of the review interface.</p><ul className="mt-6 space-y-5">{[review.detailed ? 'Your description has a useful level of detail. Keep the first version focused.' : 'Add more detail about your users and the problem they face.', 'Choose one measurable outcome that will show your solution works.', 'List the three features you can finish during the hackathon.'].map((tip, index) => <li key={tip} className="flex gap-3 text-[13px] leading-6"><span className="font-mono text-xs text-[#778e2b]">0{index + 1}</span><span>{tip}</span></li>)}</ul></section> : <section className="dashboard-empty flex min-h-[420px] flex-col items-center justify-center rounded-2xl"><DashboardIcon name="sparkles" className="size-10 text-purple/60" /><h2 className="mt-5 text-lg font-bold">Great ideas start with a question.</h2><p className="mt-3 max-w-xs text-[12px] leading-6 text-muted">Share your idea to see a demo review with a readiness score and practical next steps.</p></section>}
      </div>
    </>
  )
}
