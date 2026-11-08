import { useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import CampusLogo from '../../../../components/CampusLogo'
import useAuthEntrance from '../../hooks/useAuthEntrance'

export default function AuthLayout() {
  const { pathname } = useLocation()
  const isRegister = pathname === '/register'
  const scope = useRef(null)
  useAuthEntrance(scope, pathname)

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${isRegister ? 'Register' : 'Login'} — CampusCode`
    return () => { document.title = previousTitle }
  }, [isRegister])

  const steps = isRegister
    ? [
        { title: 'Create', label: 'Identity', description: 'Build your student profile and enter the CampusCode ecosystem.' },
        { title: 'Collaborate', label: 'Team', description: 'Find teammates and build projects together.' },
        { title: 'Compete', label: 'Arena', description: 'Join hackathons and turn ideas into submissions.' },
      ]
    : [{ title: 'Build' }, { title: 'Complete' }, { title: 'Ship' }]

  return (
    <div ref={scope} className="auth-shell grid-surface" data-register={isRegister}>
      <header className="workspace-header relative z-10 flex items-center justify-between gap-5">
        <Link to="/" aria-label="CampusCode home"><CampusLogo className="w-[150px] sm:w-[167px]" /></Link>
        <Link to="/" className="auth-home-link"><span aria-hidden="true">←</span> Back to home</Link>
      </header>

      <main className="workspace-width auth-layout-grid">
        <section className="auth-story" aria-label={isRegister ? 'Join CampusCode' : 'Welcome back to CampusCode'}>
          <p data-auth-detail className="auth-kicker"><span className="size-1.5 rounded-full bg-lime" />CampusCode / {isRegister ? 'Registration' : 'Authentication'}</p>
          <div data-auth-detail className="auth-story-index"><span>{isRegister ? 'Create your place' : 'Your next chapter'}</span><span>{isRegister ? '02' : '01'} / 02</span></div>
          <h1 className="auth-heading">
            <span className="auth-word"><span data-auth-word>{isRegister ? 'Join' : 'Enter'}</span></span>
            <span className="auth-word"><span data-auth-word>The</span></span>
            <span className="auth-word"><span data-auth-word className="text-purple">Arena.</span></span>
          </h1>
          <p data-auth-detail className="auth-story-copy">
            {isRegister
              ? 'Create your CampusCode identity and become part of a student ecosystem designed around ideas, teams, technology and competition.'
              : 'Sign in to continue building, collaborating and competing with the CampusCode community.'}
          </p>

          <div className="auth-steps">
            {steps.map((step, index) => (
              <article key={step.title} data-auth-step className="auth-step">
                <div className="auth-step-index"><span>0{index + 1}</span>{step.label && <span>{step.label}</span>}</div>
                <h2>{step.title}</h2>
                {step.description && <p>{step.description}</p>}
              </article>
            ))}
          </div>
          <div data-auth-detail className="auth-story-footer">
            <span className="flex items-center gap-2"><span className="size-1 rounded-full bg-lime" />{isRegister ? 'Registration open' : 'Ready when you are'}</span>
            <span>CampusCode / 2026</span>
          </div>
        </section>

        <div data-auth-form className="min-w-0"><Outlet /></div>
      </main>

      <footer className="workspace-width auth-footer">
        <span>CampusCode © 2026</span><span>Build · Complete · Ship</span>
        <span className="flex items-center gap-2"><span className="size-1 rounded-full bg-lime" />All systems operational</span>
      </footer>
    </div>
  )
}
