import { Link } from 'react-router'

export default function ArrowLink({
  href,
  children,
  dark = false,
  compact = false,
  className = "",
}) {
  const Component = href.startsWith('/') ? Link : 'a'
  const destination = href.startsWith('/') ? { to: href } : { href }

  return (
    <Component
      {...destination}
      className={`group inline-flex shrink-0 items-center justify-between whitespace-nowrap border font-mono text-[9px] uppercase tracking-[.5px] transition-[background-color,color,border-color] duration-400 ease-out ${compact ? "h-[39px] gap-4 px-[15px]" : "min-h-[50px] gap-7 px-[18px] py-[15px]"} ${dark ? "border-ink bg-ink text-paper hover:border-purple hover:bg-purple" : "border-ink/30 bg-paper/70 hover:border-purple hover:bg-purple hover:text-paper"} ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`text-[13px] leading-none transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${dark ? "text-lime" : ""}`}
      >
        ↗
      </span>
    </Component>
  );
}
