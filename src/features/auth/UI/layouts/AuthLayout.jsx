import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import CampusLogo from "../../../../components/CampusLogo";
import PageBackground from "../../../../components/PageBackground";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isRegister = pathname === "/register";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${isRegister ? "Register" : "Login"} — CampusCode`;
    return () => {
      document.title = previousTitle;
    };
  }, [isRegister]);
  const steps = isRegister
    ? [
        {
          title: "CREATE",
          label: "IDENTITY",
          description:
            "Build your student profile and enter the CampusCode ecosystem.",
        },
        {
          title: "COLLABORATE",
          label: "TEAM",
          description: "Find teammates and build projects together.",
        },
        {
          title: "COMPETE",
          label: "ARENA",
          description: "Join hackathons and turn ideas into submissions.",
        },
      ]
    : [{ title: "BUILD" }, { title: "COMPETE" }, { title: "SHIP" }];

  return (
    <div className="grid-surface relative isolate flex min-h-svh flex-col overflow-hidden [background-size:65px_65px]">
      <PageBackground />
      <header className="relative z-10 mx-auto flex h-[89px] w-[90%] shrink-0 items-center justify-between gap-5">
        <Link to="/" aria-label="CampusCode home">
          <CampusLogo className="w-[155px]" />
        </Link>
        <Link
          to="/"
          className="eyebrow text-[9px] text-muted transition-colors duration-400 hover:text-purple"
        >
          ← Back to home
        </Link>
      </header>
      <main className="relative z-10 mx-auto grid w-[84%] flex-1 items-center gap-14 pt-8 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,475px)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_530px] xl:gap-24">
        <section
          key={pathname}
          className="hero-enter w-full max-w-[520px] py-6 lg:py-12"
          aria-label={
            isRegister ? "Join CampusCode" : "Welcome back to CampusCode"
          }
        >
          <p className="eyebrow text-[9px] text-muted">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-lime shadow-[0_0_10px_var(--lime)]" />
            CampusCode / {isRegister ? "Registration" : "Authentication"}
          </p>
          <div className="mt-5 mb-10 flex max-w-[450px] justify-between font-mono text-[8px] uppercase tracking-[1px] text-muted/70">
            <span>{isRegister ? "Create" : "Access"}</span>
            <span>{isRegister ? "02" : "01"} / 02</span>
          </div>
          <h1 className="display-type text-[clamp(64px,9vw,144px)] font-black leading-[.78] tracking-[-.075em]">
            {isRegister ? "Join" : "Enter"}
            <br />
            the
            <br />
            <span className="outline-type hero-outline">arena.</span>
          </h1>
          <p className="mt-9 max-w-[465px] text-[14px] leading-[1.8] text-muted">
            {isRegister
              ? "Create your CampusCode identity and become part of a student ecosystem designed around ideas, teams, technology and competition."
              : "Sign in to continue building, collaborating and competing with the CampusCode community."}
          </p>
          <div className="mt-9 grid grid-cols-3 gap-2">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className={`border border-line bg-paper/25 p-3.5 transition-colors duration-500 hover:bg-purple/[.04] ${isRegister ? "min-h-[145px]" : "min-h-[92px]"}`}
              >
                <div className="flex justify-between gap-2 font-mono text-[7px] text-muted/70">
                  <span>0{index + 1}</span>
                  {step.label && <span>{step.label}</span>}
                </div>
                <h2
                  className={`font-bold tracking-[-.6px] ${isRegister ? "mt-6 text-[clamp(11px,1vw,16px)]" : "mt-7 text-[14px]"}`}
                >
                  {step.title}
                </h2>
                {step.description && (
                  <p className="mt-2 text-[9px] leading-[1.5] text-muted">
                    {step.description}
                  </p>
                )}
                {isRegister && index === 0 && (
                  <div aria-hidden="true" className="mt-5 h-px bg-line">
                    <div className="h-px w-1/3 bg-lime" />
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className="mt-5 flex justify-between gap-4 border-t border-line pt-4 font-mono text-[7px] uppercase text-muted/70">
            <span className="text-[#83a330]">
              <span className="mr-1.5 inline-block size-1 rounded-full bg-lime" />
              {isRegister ? "Registration open" : "Authentication ready"}
            </span>
            <span className="hidden sm:block">
              {isRegister ? "Student innovation network" : "Secure access"}
            </span>
            <span>2026</span>
          </div>
        </section>
        <div
          key={pathname + "-form"}
          className="hero-enter min-w-0 self-start [animation-delay:120ms]"
        >
          <Outlet />
        </div>
      </main>
      <footer className="relative z-10 mx-auto flex w-[90%] flex-wrap justify-between gap-4 pb-6 font-mono text-[7px] uppercase tracking-[.3px] text-muted/70">
        <span>CampusCode © 2026</span>
        <span>Learn · Build · Compete · Ship</span>
        <span className="text-[#83a330]">All systems operational</span>
      </footer>
    </div>
  );
}
