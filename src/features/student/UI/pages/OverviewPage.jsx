import { useState } from 'react'
import { Link, useOutletContext } from "react-router";
import DashboardIcon from "../components/DashboardIcon";

export default function OverviewPage() {
  const { events, joinedEvents, announcements, studentProfile } =
    useOutletContext();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const featuredEvent = events[0];
  const ongoing = joinedEvents.filter(
    (event) => event.status === "Live",
  ).length;
  const stats = [
    { label: "Registered", value: joinedEvents.length },
    { label: "Ongoing", value: ongoing },
    { label: "Completed", value: 0 },
    { label: "Certificates", value: 0 },
  ];
  const journey = [
    { label: "Hackathons", icon: "trophy", value: joinedEvents.length },
    { label: "Ongoing", icon: "bolt", value: ongoing },
    { label: "Completed", icon: "check", value: 0 },
    { label: "Certificates", icon: "award", value: 0 },
  ];
  const tools = [
    { label: "HACKMATE", path: "/student/hackmate", icon: "user" },
    { label: "IDEACHECK", path: "/student/ideacheck", icon: "sparkles" },
    { label: "RULEBOT", path: "/student", icon: "bot" },
  ];

  return (
    <>
      <div className="mb-7">
        <p className="dashboard-kicker">Student workspace / live</p>
        <h1 className="dashboard-heading mt-2">
          WELCOME BACK,{" "}
          <span className="border-b-[5px] border-lime text-purple">
            {studentProfile.firstName.toUpperCase()}
          </span>
          .
        </h1>
        <p className="mt-3 text-[14px] text-muted">
          Your CampusCode activity, events, and student workspace — all in one
          place.
        </p>
      </div>
      <section
        className="overview-ticket"
        aria-labelledby="featured-event-title"
      >
        <div className="overview-ticket-stub" aria-hidden="true">
          <strong>{featuredEvent.initials}</strong>
          <span>{featuredEvent.title}</span>
        </div>
        <div className="overview-ticket-body">
          <p className="dashboard-kicker mb-2">Build · learn · collaborate</p>
          <h2 id="featured-event-title">{featuredEvent.title}</h2>
          <p id="featured-event-description" className="overview-ticket-description" data-expanded={descriptionExpanded}>
            {featuredEvent.description}
          </p>
          <button type="button" className="dashboard-text-link mt-3" aria-expanded={descriptionExpanded} aria-controls="featured-event-description" onClick={() => setDescriptionExpanded(value => !value)}>{descriptionExpanded ? 'Show less' : 'Show more'}</button>
        </div>
        <div className="overview-ticket-action">
          <Link
            to="/student/events?event=rebuild-26"
            className="dashboard-button"
          >
            Open event <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <div className="overview-stats">
        {stats.map((stat) => (
          <section key={stat.label} className="overview-stat">
            <p className="overview-stat-value">{stat.value}</p>
            <div>
              <h2 className="dashboard-label">{stat.label}</h2>
              <p className="overview-stat-caption">Your activity</p>
            </div>
          </section>
        ))}
      </div>

      <div className="overview-workspace">
        <div className="overview-column">
          <section className="dashboard-panel overview-activity">
            <div className="overview-panel-heading">
              <h2>01 / Current activity</h2>
              <Link to="/student/my-events" className="dashboard-text-link">
                View events ↗
              </Link>
            </div>
            <div className="overview-activity-row">
              <h3>ReBuild '26</h3>
              <span className="overview-live">
                <span aria-hidden="true" />
                LIVE
              </span>
              <span className="overview-activity-date">06 NOV 2026</span>
            </div>
            <p className="overview-activity-id">
              e2798ce3-a1b5-4806-9147-4d9f10c52ef1
            </p>
          </section>

          <section className="dashboard-panel overview-discover">
            <div className="overview-panel-heading">
              <h2>03 / Discover events</h2>
              <Link to="/student/events" className="dashboard-text-link">
                View all ↗
              </Link>
            </div>
            <div className="overview-event-list">
              {events.map((event) => (
                <article key={event.id} className="overview-event-ticket">
                  <div className="overview-event-stub" aria-hidden="true">
                    {event.initials}
                  </div>
                  <div className="overview-event-copy">
                    <p>{event.category}</p>
                    <h3>{event.title}</h3>
                    <p>
                      {event.id === "rebuild-26" ? (
                        <>{event.date} · Individual participation</>
                      ) : (
                        "—"
                      )}
                    </p>
                  </div>
                  <div className="overview-event-action">
                    {event.joined ? (
                      <span className="overview-joined">JOINED</span>
                    ) : (
                      <Link
                        to={`/student/events?event=${event.id}`}
                        className="dashboard-outline-button"
                      >
                        JOIN NOW ↗
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="dashboard-panel overview-deadlines">
            <div className="overview-panel-heading">
              <h2>Upcoming deadlines</h2>
              <Link to="/student/events" className="dashboard-text-link">
                View all ↗
              </Link>
            </div>
            <div className="overview-deadline-row">
              <DashboardIcon name="clock" />
              <p>No deadlines yet.</p>
              <Link to="/student/events" className="dashboard-text-link">
                Browse events ↗
              </Link>
            </div>
            <p className="overview-supporting-copy">
              Join an event and your upcoming dates will appear here.
            </p>
          </section>
        </div>

        <div className="overview-column">
          <section className="dashboard-panel overview-updates">
            <div className="overview-panel-heading">
              <h2>02 / Notifications</h2>
              <Link
                to="/student/communications"
                className="dashboard-text-link"
              >
                Open all ↗
              </Link>
            </div>
            <div>
              {announcements.map((item) => (
                <details key={item.id} className="overview-announcement">
                  <summary>
                    <span className="overview-update-icon" aria-hidden="true">
                      <DashboardIcon name="bell" />
                    </span>
                    <h3>{item.title}</h3>
                    <time>{item.date}</time>
                    <span className="overview-update-toggle" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{item.body}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="dashboard-panel overview-journey">
            <div className="overview-panel-heading">
              <h2>Your journey</h2>
              <Link to="/student" className="dashboard-text-link">
                Certificates ↗
              </Link>
            </div>
            <div className="overview-journey-counts">
              {journey.map((item) => (
                <div key={item.label}>
                  <DashboardIcon name={item.icon} />
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>
          

          <section className="dashboard-panel overview-ai">
            <p className="dashboard-label text-muted">AI spotlight</p>
            <h2 className="overview-ai-title">Your AI teammates are ready.</h2>
            <p className="overview-supporting-copy">
              Check your idea, find teammates, or ask the rules — right from
              here.
            </p>
            <div className="overview-ai-tools">
              {tools.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="dashboard-tool-link"
                >
                  <DashboardIcon name={item.icon} />
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
