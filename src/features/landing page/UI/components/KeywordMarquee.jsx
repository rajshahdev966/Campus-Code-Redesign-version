const words = ['IDEAS', 'PEOPLE', 'PRODUCTS', 'INNOVATION', 'COMMUNITY']

export default function KeywordMarquee() {
  return (
    <div aria-label="Ideas, people, products, innovation, community" className="overflow-hidden border-y border-line bg-surface/40 py-5">
      <div aria-hidden="true" className="marquee-track flex w-max">
        {[0, 1].map((copy) => <div key={copy} className="flex shrink-0 items-center">{[...words, ...words].map((word, index) => <span key={index} className="flex items-center gap-9 pr-9 font-mono text-[10px] text-muted">{word}<span className="text-sm text-purple">✦</span></span>)}</div>)}
      </div>
    </div>
  )
}
