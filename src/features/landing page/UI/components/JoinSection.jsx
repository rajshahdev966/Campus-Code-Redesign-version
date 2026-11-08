import { useRef } from "react";
import { Link } from "react-router";
import useRotatingWord, { buildWords } from "../../hooks/useRotatingWord";

export default function JoinSection() {
  const scope = useRef(null);
  const {
    word,
    index,
    selectWord,
    nextWord,
    paused,
    togglePaused,
    reducedMotion,
    setInteracting,
  } = useRotatingWord(scope);

  return (
    <section
      ref={scope}
      id="join"
      className="join-section grid-surface border-b border-line"
      aria-labelledby="join-heading"
    >
      <div className="join-orbit" aria-hidden="true">
        {[0, 1, 2].map((person) => (
          <span key={person} className={`join-avatar join-avatar--${person}`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
            </svg>
          </span>
        ))}
      </div>
      <div
        className="workspace-width join-content"
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setInteracting(false);
        }}
      >
        <p className="eyebrow text-purple">READY? / MAKE IT YOURS</p>
        <h2 id="join-heading" className="join-title">
          <span>Your next</span>
          <button
            type="button"
            className="join-word-slot"
            onClick={nextWord}
            aria-label={`${word}. Tap to choose the next idea.`}
          >
            <span
              key={word}
              className="join-word"
              data-word={word}
              aria-hidden="true"
            >
              {word}
            </span>
          </button>
          <span>starts here.</span>
        </h2>
        <Link to={`/register?track=${word}`} className="join-primary mt-3">
          Start your {word}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
