export const studentProfile = {
  name: 'Raj Shah', firstName: 'Raj', initials: 'RS', email: 'raj@example.com', campusId: 'CC-NRX7Q5', team: 'Clif',
}

export const workspaceNavigation = [
  { label: 'Overview', path: '/student', icon: 'grid' },
  { label: 'Events', path: '/student/events', icon: 'trophy' },
  { label: 'My Events', path: '/student/my-events', icon: 'clock' },
  { label: 'HackMate AI', path: '/student/hackmate', icon: 'sparkles' },
  { label: 'IdeaCheck AI', path: '/student/ideacheck', icon: 'sparkles' },
  { label: 'Certificates', path: '/student', icon: 'award', pending: true },
  { label: 'Digital Card', path: '/student/digital-card', icon: 'card' },
  { label: 'RuleBot AI', path: '/student', icon: 'bot', pending: true, badge: 'AI' },
  { label: 'Student Guide', path: '/student', icon: 'bot', pending: true },
  { label: 'Official Communication', path: '/student/communications', icon: 'bell' },
  { label: 'Notifications', path: '/student', icon: 'bell', pending: true },
  { label: 'Help & Support', path: '/student', icon: 'bot', pending: true },
  { label: 'Profile', path: '/student', icon: 'user', pending: true },
]

export const initialEvents = [
  {
    id: 'rebuild-26', title: "ReBuild '26", initials: 'RE', category: 'Web Development', date: '06 Nov 2026', status: 'Live', joined: true, theme: 'lime',
    subtitle: 'THE DASHBOARD RECREATION HACKATHON',
    description: "ReBuild '26 is an individual dashboard-recreation hackathon by CampusCode. You participate alone, but you must create a team name for tracking and use it on your Unstop registration, the CampusCode portal, and every submission. Round 1 (Friday, 6 Nov, morning to 10 PM): Recreate the CampusCode user flow faithfully — Dashboard, Login, Register, and Student dashboard — and submit your demo any time till 10 PM. Round 2 (Saturday, 7 Nov, top performers from Round 1 only): Build a complete new UI in CampusCode's vibe. Frontend only, mock data is fine. No presentation round. Prizes: Winner certificate + CampusCode internship with ₹15,000 stipend, runner-up certificate, and participation certificates for all. Sunday, 8 Nov (Diwali) is free. This is a paid event (₹50 on Unstop). Paid students receive an invite code — enter it when you join this event on the portal.",
  },
  { id: 'firstcommit-2', title: "FirstCommit '26 Quiz Competition 2.0", initials: 'FQ', category: 'Open Innovation', date: '12 Nov 2026', status: 'Open', joined: false, theme: 'lime', subtitle: 'THINK FAST. BUILD YOUR KNOWLEDGE.', description: 'Test your programming knowledge, explore new ideas, and compete with student builders. This demo event includes a practice round and a final quiz.' },
  { id: 'firstcommit-1', title: "FirstCommit '26 Quiz Competition", initials: 'FQ', category: 'Open Innovation', date: '18 Nov 2026', status: 'Upcoming', joined: false, theme: 'dark', subtitle: 'YOUR FIRST COMMIT STARTS HERE.', description: 'A friendly student quiz covering code, design, and technology. Discover your strengths and learn with the CampusCode community.' },
]

export const announcements = [
  { id: 'round-live', title: 'Round is Live', date: '06 Nov 2026', category: 'Event update', event: "ReBuild '26", body: "Hello students ReBuild '26 hackathon round 1 is Live. You can submit your live demo + GitHub before 10pm today." },
  { id: 'create-team', title: 'Create your team', date: '05 Nov 2026', category: 'Team update', event: "ReBuild '26", body: 'When you join the event using your invite code, create a team name. Go to HackMate AI, select the ReBuild hackathon, and create your team name.' },
]

export const demoTeammates = [
  { name: 'Nisha Patel', initials: 'NP', skills: 'React · UI Design', score: 96 },
  { name: 'Arjun Mehta', initials: 'AM', skills: 'JavaScript · Frontend', score: 92 },
  { name: 'Sara Khan', initials: 'SK', skills: 'Figma · Product Design', score: 88 },
]
