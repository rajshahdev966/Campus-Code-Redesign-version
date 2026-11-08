import { Link } from "react-router";
import { useRef } from "react";
import SiteHeader from "./SiteHeader";
import HeroScene from "./hero/HeroScene";

export default function HeroSection() {
  const exploreRef = useRef(null);
  return (
    <section id="home" className="workspace-hero relative overflow-hidden">
      <SiteHeader />
      <div className="workspace-width relative">
        <div className="flex items-center justify-between gap-6 pt-9 font-mono text-[9px] uppercase tracking-[.13em] text-muted">
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-lime" />
            The digital home for student innovation
          </p>
          <span className="hidden sm:block">Chennai · India</span>
        </div>
        <div className="workspace-layout">
          <div className="relative z-10">
            <p className="mb-7 font-mono text-[10px] uppercase tracking-[.18em] text-muted">
              CampusCode / 001
            </p>
            <h1 className="workspace-title">
              <span>Build</span>
              <span className="outline-fill" tabIndex={0}>Compete</span>
              <span>
                Ship<span className="text-purple">.</span>
              </span>
            </h1>
            <p className="mt-7 max-w-[340px] text-[15px] leading-relaxed text-muted sm:text-base">
              A digital arena for students who don’t just have ideas.{" "}
              <span className="font-medium text-ink">They build them.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                ref={exploreRef}
                href="#hackathons"
                className="workspace-cta bg-lime"
              >
                Explore hackathons <span aria-hidden="true">↗</span>
              </a>
              <Link
                to="/register"
                className="workspace-cta border border-line bg-paper"
              >
                Join CampusCode <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <HeroScene exploreRef={exploreRef} />
        </div>
        <div className="flex items-center justify-between border-t border-line/70 py-6 font-mono text-[9px] uppercase tracking-[.15em] text-muted">
          <a
            href="#about"
            className="flex items-center gap-3 hover:text-purple"
          >
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
          <span className="hidden sm:block">
            An idea is just the beginning.
          </span>
          <span>01 / 05</span>
        </div>
      </div>
    </section>
  );
}
