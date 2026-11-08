export const orbits = [
  { tilt: 0 },
  { tilt: Math.PI * 2 / 3 },
  { tilt: Math.PI * 4 / 3 },
]

export const orbitDuration = 30

export function studentPoints(time = 0) {
  const angle = .25 + time * Math.PI * 2 / orbitDuration
  return orbits.map(orbit => orbitPoint(angle, orbit.tilt))
}

export function orbitPoint(angle, tilt) {
  const x = Math.cos(angle) * 190
  const y = Math.sin(angle) * 62
  const depth = Math.sin(angle) * 145
  const perspective = 700 / (700 - depth)

  return {
    x: 320 + (x * Math.cos(tilt) - y * Math.sin(tilt)) * perspective,
    y: 320 + (x * Math.sin(tilt) + y * Math.cos(tilt)) * perspective,
    depth,
    scale: .88 + (depth / 145) * .16,
    opacity: .76 + (depth / 145) * .24,
  }
}

export function orbitPath(tilt, front) {
  const start = front ? 0 : Math.PI
  return Array.from({ length: 65 }, (_, index) => {
    const point = orbitPoint(start + (index / 64) * Math.PI, tilt)
    return `${index ? 'L' : 'M'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`
  }).join(' ')
}
