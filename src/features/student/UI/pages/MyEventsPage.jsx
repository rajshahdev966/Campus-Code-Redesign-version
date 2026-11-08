import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import DashboardIcon from "../components/DashboardIcon";

export default function MyEventsPage() {
  const { joinedEvents, studentProfile } = useOutletContext();
  const [copyMessage, setCopyMessage] = useState("");
  const registrationId = "7dd3ca81-b975-48b0-ab13-43fb678a1504";

  async function copyRegistration() {
    try {
      await navigator.clipboard.writeText(registrationId);
      setCopyMessage("Registration copied.");
    } catch {
      setCopyMessage(
        "Copy is unavailable. Select the registration ID to copy it.",
      );
    }
  }

  return (
    <>
      <div className="dashboard-page-heading">
        <div>
          <p className="dashboard-kicker">My activity / student workspace</p>
          <h1 className="dashboard-heading mt-2">MY EVENTS.</h1>
          <p className="mt-3 text-[14px] leading-6 text-muted">
            Every event you joined, in one place. Open one to see its rounds,
            team, results and certificates.
          </p>
        </div>
        <div className="dashboard-count">
          <strong>{String(joinedEvents.length).padStart(2, "0")}</strong>
          <span>YOUR EVENTS</span>
        </div>
      </div>
      <div className="personal-event-shelf">
        {joinedEvents.map((event) => (
          <article key={event.id} className="personal-event">
            <div className="personal-event-heading">
              <span className="personal-event-symbol" aria-hidden="true">
                {event.initials}
              </span>
              <div>
                <p className="dashboard-label text-purple">{event.category}</p>
                <h2>{event.title}</h2>
              </div>
              <span className="challenge-status" data-status={event.status}>
                {event.status}
              </span>
            </div>
            <p className="personal-event-subtitle">{event.subtitle}</p>
            <dl className="personal-event-facts">
              <div>
                <dt>STATUS:</dt>
                <dd>REGISTERED</dd>
              </div>
              <div>
                <dt>TEAM:</dt>
                <dd>{studentProfile.team}</dd>
              </div>
              <div>
                <dt>
                  <DashboardIcon name="clock" />
                  <span className="sr-only">Date</span>
                </dt>
                <dd>{event.date}</dd>
              </div>
            </dl>
            <div className="personal-event-footer">
              <Link
                to={`/student/events?event=${event.id}`}
                className="dashboard-button"
              >
                Open journey ↗
              </Link>
              <details className="registration-details">
                <summary>
                  REGISTRATION <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <code>{registrationId}</code>
                  <button
                    type="button"
                    onClick={copyRegistration}
                    aria-label="Copy registration ID"
                  >
                    <DashboardIcon name="copy" />
                  </button>
                </div>
              </details>
            </div>
          </article>
        ))}
      </div>
      <p role="status" className="mt-3 text-xs text-purple">
        {copyMessage}
      </p>
      {!joinedEvents.length && (
        <div className="dashboard-empty">
          <h2 className="font-bold">Your next event is waiting.</h2>
          <Link to="/student/events" className="dashboard-button mt-5">
            Browse events ↗
          </Link>
        </div>
      )}
    </>
  );
}
