import { useId } from 'react'
import { orbitPath, orbits, studentPoints } from '../../../state/atomGeometry'

export default function AtomScene() {
  const id = useId().replaceAll(':', '')
  const points = studentPoints()

  function avatars(front) {
    return points.map((point, index) => (
      <g
        key={index}
        data-atom-avatar={index}
        data-side={front ? 'front' : 'back'}
        transform={`translate(${point.x} ${point.y}) scale(${point.scale})`}
        opacity={point.opacity}
        visibility={(point.depth >= 0) === front ? 'visible' : 'hidden'}
      >
        <circle r="24" fill="var(--white)" stroke="var(--purple)" strokeOpacity=".55" />
        <circle cy="-6" r="6" fill="none" stroke="var(--purple)" strokeWidth="1.8" />
        <path d="M-11 13 C-11 1 11 1 11 13" fill="none" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    ))
  }

  return (
    <svg className="atom-scene" viewBox="0 0 640 640" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-sphere`} cx="32%" cy="25%" r="80%">
          <stop stopColor="var(--white)" />
          <stop offset=".63" stopColor="var(--purple-soft)" />
          <stop offset="1" stopColor="var(--purple)" stopOpacity=".24" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop stopColor="var(--purple)" stopOpacity=".14" />
          <stop offset="1" stopColor="var(--purple)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-rim`}>
          <stop offset=".7" stopColor="var(--purple)" stopOpacity="0" />
          <stop offset=".85" stopColor="var(--purple)" stopOpacity=".08" />
          <stop offset="1" stopColor="var(--purple)" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}><circle cx="320" cy="320" r="91" /></clipPath>
      </defs>

      <ellipse cx="320" cy="486" rx="128" ry="29" fill={`url(#${id}-shadow)`} />
      {orbits.map((orbit, index) => <path key={index} d={orbitPath(orbit.tilt, false)} className={`atom-ring atom-ring-${index}`} />)}

      <g data-atom-connections stroke="var(--lime)" strokeWidth="1" opacity=".4">
        <polygon data-atom-triangle points={points.map(point => `${point.x},${point.y}`).join(' ')} />
        {points.map((point, index) => <line key={index} data-atom-spoke x1="320" y1="320" x2={point.x} y2={point.y} />)}
      </g>
      {avatars(false)}

      <g data-atom-core>
        <circle cx="320" cy="320" r="115" fill={`url(#${id}-rim)`} />
        <circle cx="320" cy="320" r="91" fill="var(--white)" />
        <circle cx="320" cy="320" r="91" fill={`url(#${id}-sphere)`} stroke="var(--purple)" strokeOpacity=".12" />
        <g clipPath={`url(#${id}-clip)`}>
          <text data-atom-mark x="0" y="0" transform="translate(320 337)" textAnchor="middle" fill="var(--purple)" fontFamily="Inter, sans-serif" fontSize="49" fontWeight="900" letterSpacing="-3">CC</text>
        </g>
      </g>

      {orbits.map((orbit, index) => <path key={index} d={orbitPath(orbit.tilt, true)} className={`atom-ring atom-ring-${index}`} />)}
      <circle data-atom-pulse cx="320" cy="320" r="3.5" fill="var(--lime)" />
      {avatars(true)}
    </svg>
  )
}
