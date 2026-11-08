import { useState } from "react";
import { useOutletContext, useSearchParams } from "react-router";
import DashboardIcon from "../components/DashboardIcon";
import EventDetailsDialog from "../components/EventDetailsDialog";

export default function EventsPage() {
  const { events, joinEvent } = useOutletContext();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All events");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedEvent = events.find(
    (event) => event.id === searchParams.get("event"),
  );
  const filteredEvents = events.filter(
    (event) =>
      (event.title + " " + event.category)
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (status === "All events" || event.status === status),
  );
  const [featured, ...remaining] = filteredEvents;

  return (
    <>
      <div className="dashboard-page-heading">
        <div>
          <p className="dashboard-kicker">Discover / campus challenges</p>
          <h1 className="dashboard-heading mt-2">ENTER THE ARENA.</h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-muted">
            Discover challenges, build something meaningful, and find your next
            opportunity to compete.
          </p>
        </div>
        <div className="dashboard-count">
          <strong>{String(events.length).padStart(2, "0")}</strong>
          <span>EVENTS</span>
        </div>
      </div>
      <div className="catalogue-controls">
        <div
          className="dashboard-segments"
          role="group"
          aria-label="Filter event status"
        >
          {["All events", "Live", "Open", "Upcoming"].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={status === option}
              onClick={() => setStatus(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <label className="dashboard-search">
          <span className="sr-only">Search events</span>
          <DashboardIcon name="search" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events"
            className="dashboard-input"
          />
        </label>
      </div>
      <p className="dashboard-result-count" role="status">
        {filteredEvents.length} / {events.length} events
      </p>
      {featured && (
        <section
          className="challenge-feature"
          aria-labelledby="challenge-title"
        >
          <div className="challenge-art" aria-hidden="true">
            <div className="challenge-art-grid" />
            <span>{featured.initials}</span>
            <i />
            <i />
            <i />
            <small>{featured.category}</small>
          </div>
          <div className="challenge-feature-copy">
            <div className="flex flex-wrap items-center gap-2">
              <span className="challenge-status" data-status={featured.status}>
                {featured.status}
              </span>
              {featured.joined && (
                <span className="dashboard-pill">JOINED</span>
              )}
            </div>
            <p className="dashboard-label mt-5 text-purple">
              {featured.category}
            </p>
            <h2 id="challenge-title">{featured.title}</h2>
            <p className="challenge-excerpt">{featured.description}</p>
            <p className="challenge-meta">
              {featured.date} ·{" "}
              {featured.id === "rebuild-26"
                ? "Individual participation"
                : "Student competition"}
            </p>
            <button
              type="button"
              onClick={() => setSearchParams({ event: featured.id })}
              className="dashboard-button"
            >
              {featured.joined ? "Open event" : "Explore event"} ↗
            </button>
          </div>
        </section>
      )}
      <div className="challenge-list">
        {remaining.map((event) => (
          <article key={event.id} className="challenge-row">
            <span className="challenge-row-mark" aria-hidden="true">
              {event.initials}
            </span>
            <div className="challenge-row-copy">
              <p className="dashboard-label text-purple">{event.category}</p>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
            <div className="challenge-row-meta">
              <span className="challenge-status" data-status={event.status}>
                {event.status}
              </span>
              <time>{event.date}</time>
              {event.joined && (
                <span className="text-[10px] text-muted">JOINED</span>
              )}
              <button
                type="button"
                onClick={() => setSearchParams({ event: event.id })}
                className="dashboard-outline-button"
              >
                {event.joined ? "Open event" : "Explore event"} ↗
              </button>
            </div>
          </article>
        ))}
      </div>
      {!filteredEvents.length && (
        <div className="dashboard-empty">
          <DashboardIcon
            name="search"
            className="mx-auto mb-3 size-6 text-purple"
          />
          <p className="font-semibold">No events match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatus("All events");
            }}
            className="dashboard-text-link mt-3"
          >
            Clear filters
          </button>
        </div>
      )}
      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          onClose={() => setSearchParams({})}
          onJoin={joinEvent}
        />
      )}
    </>
  );
}
