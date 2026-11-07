import ArrowLink from "./ArrowLink";
import HeroBackground from "../../../../components/PageBackground";
import SiteHeader from "./SiteHeader";

export default function HeroSection() {
  return (
    <section id="home" className="grid-surface relative overflow-hidden pb-8">
      <HeroBackground />
      <SiteHeader />
      <div className="page-width relative flex justify-between gap-6 py-[21px]">
        <p className="eyebrow text-[8px] text-muted">
          <span
            aria-hidden="true"
            className="mr-2 inline-block size-1.5 rounded-full bg-lime shadow-[0_0_10px_var(--lime)]"
          />
          The digital home for student innovation
        </p>
        <span className="eyebrow hidden text-[8px] text-muted sm:block">
          Chennai · India
        </span>
      </div>
      <div className="relative mx-auto w-[84%] pb-[65px] pt-[48px]">
        <p
          className="eyebrow hero-enter mb-10 text-[9px] leading-3 tracking-[2px] text-muted"
          style={{ animationDelay: ".1s" }}
        >
          CampusCode / 001
        </p>
        <h1 className="display-type font-black leading-[.76] tracking-[-.0625em] text-[clamp(44px,15vw,230px)]">
          <span className="hero-enter block" style={{ animationDelay: ".18s" }}>
            Build
          </span>
          <span
            className="hero-enter outline-type hero-outline block w-fit"
            style={{ animationDelay: ".3s" }}
          >
            Complete
          </span>
          <span className="hero-enter block" style={{ animationDelay: ".42s" }}>
            Ship.
          </span>
        </h1>
        <div
          className="hero-enter mt-10 flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-[60px]"
          style={{ animationDelay: ".6s" }}
        >
          <p className="text-[14px] leading-[1.75] text-muted">
            A digital arena for students
            <br />
            who don’t just have ideas.
            <br />
            <span className="text-ink">They build them.</span>
          </p>
          <ArrowLink href="#hackathons">Explore hackathons</ArrowLink>
        </div>
      </div>
      <div className="page-width relative flex items-center justify-between text-muted">
        <a href="#about" className="eyebrow text-[8px] transition-colors duration-400 hover:text-purple">
          Scroll to explore
        </a>
        <span aria-hidden="true" className="h-px w-28 bg-line">
          <span className="block h-px w-9 bg-ink" />
        </span>
        <span className="eyebrow text-[8px]">01 / 05</span>
      </div>
    </section>
  );
}
