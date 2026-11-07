export default function PageBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[7%] top-[12%] size-[480px] rounded-full bg-purple/15 blur-[100px]" />
      <div className="absolute bottom-0 left-[23%] size-[430px] rounded-full bg-lime/10 blur-[100px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 1000" preserveAspectRatio="none" fill="none">
        <g stroke="var(--ink)" strokeOpacity=".07" strokeDasharray="7 10">
          <path d="M-50 800C160 590 240 700 430 650S660 140 830 270 1080 810 1470 170" />
          <path d="M80 150C290 400 370 100 530 330S700 810 910 680 1290 340 1440 900" />
          <path d="M200 1050C560 700 690 850 850 540S1110 200 1200 100" />
        </g>
        {[[390,480],[530,300],[840,300],[1005,550],[1080,90]].map(([x,y],i) => <circle key={x} cx={x} cy={y} r="5" fill="var(--purple)" opacity=".25" className="float-dot" style={{ animationDelay: `-${i * 2}s` }} />)}
      </svg>
    </div>
  )
}
