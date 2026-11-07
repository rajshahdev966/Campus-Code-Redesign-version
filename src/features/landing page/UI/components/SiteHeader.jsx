import { Link } from 'react-router'
import { useState } from "react";
import CampusLogo from "../../../../components/CampusLogo";
import ArrowLink from "./ArrowLink";
import { navigation } from "../../state/landingContent";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="page-width relative z-20 flex h-[89px] items-center justify-between gap-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
      <a
        href="#home"
        aria-label="CampusCode home"
        className="flex h-[35px] w-[167px] shrink-0 items-center justify-center rounded-[2px] border-2 border-ink/45 bg-canvas px-1 transition-colors duration-400 hover:border-purple lg:justify-self-start"
      >
        <CampusLogo className="w-full" />
      </a>
      <nav
        aria-label="Main navigation"
        className="hidden items-center gap-5 lg:flex xl:gap-8"
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-1.5 font-mono text-[9px] uppercase tracking-[1px] text-muted transition-colors duration-400 hover:text-purple"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="ml-auto hidden items-center gap-[18px] md:flex lg:justify-self-end">
        <Link
          to="/login"
          className="px-1.5 font-mono text-[9px] uppercase tracking-[1px] text-muted transition-colors duration-400 hover:text-purple"
        >
          Login
        </Link>
        <ArrowLink href="/register" compact className="w-[143px]">
          Join CampusCode
        </ArrowLink>
      </div>
      <button
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex size-10 shrink-0 items-center justify-center border border-line text-xl lg:hidden"
      >
        {menuOpen ? "×" : "☰"}
      </button>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-20 flex flex-col gap-6 border border-line bg-canvas p-6 shadow-lg lg:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="eyebrow transition-colors duration-400 hover:text-purple"
            >
              {item.label}
            </a>
          ))}
          <Link to="/login" className="eyebrow">
            Login
          </Link>
          <ArrowLink href="/register">Join CampusCode</ArrowLink>
        </nav>
      )}
    </header>
  );
}
