import { useEffect, useRef, useState } from 'react'

export const busDriveDuration = 1.2

export default function useFormBus({ errors, isDirty, isValid }) {
  const [driving, setDriving] = useState(false)
  const pending = useRef(null)

  useEffect(() => () => {
    if (pending.current) {
      window.clearTimeout(pending.current.timer)
      pending.current.resolve(false)
    }
  }, [])

  function drive() {
    setDriving(true)
    return new Promise(resolve => {
      const timer = window.setTimeout(() => {
        pending.current = null
        setDriving(false)
        resolve(true)
      }, busDriveDuration * 1000)
      pending.current = { timer, resolve }
    })
  }

  const status = driving ? 'submitting'
    : Object.keys(errors).length ? 'error'
    : isValid ? 'ready'
    : isDirty ? 'typing'
    : 'idle'

  return { status, drive }
}
