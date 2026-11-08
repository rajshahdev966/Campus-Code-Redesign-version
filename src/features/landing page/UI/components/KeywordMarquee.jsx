import { useEffect, useRef } from 'react'

const words = ['IDEAS', 'PEOPLE', 'PRODUCTS', 'INNOVATION', 'COMMUNITY']
const repeatedWords = [...words, ...words, ...words]

export default function KeywordMarquee() {
  const scope = useRef(null)

  useEffect(() => {
    const section = scope.current
    let visible = false
    const sync = () => { section.dataset.visible = String(visible && !document.hidden) }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
    sync()
    observer.observe(section)
    document.addEventListener('visibilitychange', sync)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])

  return (
    <section ref={scope} className="keyword-marquee" aria-label="Ideas, people, products, innovation, community">
      <div className="keyword-marquee-window" aria-hidden="true">
        <div className="keyword-marquee-track">
          {[0, 1].map(copy => <div key={copy} className="keyword-marquee-group">{repeatedWords.map((word, index) => <span key={index} className="keyword-marquee-item"><span className={word === 'INNOVATION' ? 'text-purple' : ''}>{word}</span><svg viewBox="0 0 20 20" className={index % 2 ? 'text-lime' : 'text-purple'} fill="currentColor"><path d="M10 1C11 7 13 9 19 10C13 11 11 13 10 19C9 13 7 11 1 10C7 9 9 7 10 1Z" /></svg></span>)}</div>)}
        </div>
      </div>

    </section>
  )
}
