import { useEffect, useState } from 'react'

export default function useLoaderProgress() {
  const [progress, setProgress] = useState(0)
  const [run, setRun] = useState(0)

  useEffect(() => {
    let value = 0
    // Demo timing: 50 small steps take three seconds. No requests are made.
    const timer = window.setInterval(() => {
      value = Math.min(value + 2, 100)
      setProgress(value)
      if (value === 100) window.clearInterval(timer)
    }, 60)

    return () => window.clearInterval(timer)
  }, [run])

  function restart() {
    setProgress(0)
    setRun(previous => previous + 1)
  }

  return { progress, restart }
}
