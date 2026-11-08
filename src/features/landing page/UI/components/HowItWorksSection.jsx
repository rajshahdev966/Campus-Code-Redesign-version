import { useId, useRef } from 'react'
import { Link } from 'react-router'
import { steps } from '../../state/landingContent'
import useJourneyAnimation from '../../hooks/useJourneyAnimation'
import StepIllustration from './how/StepIllustration'

export default function HowItWorksSection() {
  const scope = useRef(null)
  const id = useId().replaceAll(':', '')
  useJourneyAnimation(scope)

  return (
    <section ref={scope} id="how" className="journey-section border-b border-line">
      <div className="workspace-width">
        <header className="journey-heading">
          <div data-journey-heading>
            <p className="eyebrow text-purple">03 / THE JOURNEY</p>
            <h2>HOW IT WORKS<span className="text-purple">.</span></h2>
            <p className="text-muted">From idea to impact.</p>
          </div>
        </header>
        <div className="journey-steps">
          {steps.map((step, index) => (
            <article key={step.title} className="journey-step" data-journey-step tabIndex={0}>
              <span className="journey-highlight" data-highlight aria-hidden="true" />
              <span className="journey-number" aria-hidden="true">0{index + 1}</span>
              <StepIllustration step={index} />
              <h3>0{index + 1} {step.title}</h3>
              <p>{step.description}</p>
              {index < 3 && ['horizontal', 'vertical'].map(direction => {
                const maskId = `${id}-${index}-${direction}`
                const path = direction === 'horizontal' ? 'M 2 20 Q 50 -8 98 20' : 'M 20 2 Q 44 50 20 98'
                return (
                  <svg key={direction} className={`journey-connector journey-connector--${direction}`} data-connector={index} viewBox={direction === 'horizontal' ? '0 0 100 40' : '0 0 40 100'} aria-hidden="true">
                    <defs><mask id={maskId}><path data-connector-mask d={path} fill="none" stroke="white" strokeWidth="5" pathLength="1" /></mask></defs>
                    <path data-connector-path d={path} fill="none" stroke="var(--purple)" strokeWidth="1.5" strokeDasharray="5 5" mask={`url(#${maskId})`} />
                    <circle data-traveler cx="0" cy="0" r="3.5" fill="var(--lime)" stroke="var(--ink)" strokeWidth=".7" />
                  </svg>
                )
              })}
            </article>
          ))}
        </div>
        <div className="journey-cta" data-journey-cta><Link to="/register">Start your journey <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  )
}
