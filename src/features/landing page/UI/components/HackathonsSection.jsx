import { Link } from "react-router";
import { hackathons } from "../../state/landingContent";
import EventTickets from "./arena/EventTickets";
import EventCalendar from "./arena/EventCalendar";

export default function HackathonsSection({ variant = "tickets" }) {
  return (
    <section
      id="hackathons"
      className="border-b border-line bg-canvas py-20 md:py-24"
    >
      <div className="workspace-width max-w-[1120px]">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[.14em] text-purple">
          04 / The arena
        </p>
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5 md:mb-11">
          <div>
            <h2 className="arena-heading">
              Enter the arena<span className="text-purple">.</span>
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Find a challenge worth building.
            </p>
          </div>
          <Link to="/register" className="arena-view-all">
            View all <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {variant === "calendar" ? (
          <EventCalendar events={hackathons} />
        ) : (
          <EventTickets events={hackathons} />
        )}
      </div>
    </section>
  );
}
