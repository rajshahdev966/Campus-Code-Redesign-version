import { Navigate } from 'react-router'
import StudentPage from '../features/student/UI/pages/StudentPage'
import OverviewPage from '../features/student/UI/pages/OverviewPage'
import EventsPage from '../features/student/UI/pages/EventsPage'
import MyEventsPage from '../features/student/UI/pages/MyEventsPage'
import HackMatePage from '../features/student/UI/pages/HackMatePage'
import IdeaCheckPage from '../features/student/UI/pages/IdeaCheckPage'
import DigitalCardPage from '../features/student/UI/pages/DigitalCardPage'
import CommunicationsPage from '../features/student/UI/pages/CommunicationsPage'

const dashboardRoutes = [
  {
    path: '/student',
    element: <StudentPage />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'my-events', element: <MyEventsPage /> },
      { path: 'hackmate', element: <HackMatePage /> },
      { path: 'ideacheck', element: <IdeaCheckPage /> },
      { path: 'digital-card', element: <DigitalCardPage /> },
      { path: 'communications', element: <CommunicationsPage /> },
      { path: '*', element: <Navigate to="/student" replace /> },
    ],
  },
]

export default dashboardRoutes
