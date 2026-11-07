import { useState } from 'react'

function createChallenge() {
  const code = String(Math.floor(10000 + Math.random() * 90000))
  const colors = ['#e3a452', '#a8d54c', '#7665ff', '#e663a1', '#43cfb8']
  const digits = [...code].map((digit, index) => `<text x="${17 + index * 27}" y="38" transform="rotate(${index % 2 ? 9 : -8} ${17 + index * 27} 28)" fill="none" stroke="${colors[index]}" stroke-width=".8" font-size="36" font-family="Georgia,serif">${digit}</text>`).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="152" height="52" viewBox="0 0 152 52"><rect width="152" height="52" rx="7" fill="#f7f7f4"/>${digits}<path d="M8 39L141 16M13 20Q75 45 143 27M10 46Q87 3 141 31" stroke="#7665ff" stroke-width=".5" fill="none" opacity=".6"/></svg>`
  return { code, image: `data:image/svg+xml,${encodeURIComponent(svg)}` }
}

// This local challenge is for the UI demo; it does not provide bot protection.
export default function useDemoCaptcha() {
  const [challenge, setChallenge] = useState(createChallenge)
  return { ...challenge, refreshCaptcha: () => setChallenge(createChallenge()) }
}
