import { useState } from 'react'
import StudentLoader from '../components/StudentLoader'
import DashboardLayout from '../layouts/DashboardLayout'

export default function StudentPage() {
  const [initializing, setInitializing] = useState(true)

  if (initializing) {
    return <StudentLoader onComplete={() => setInitializing(false)} />
  }

  return <DashboardLayout />
}
