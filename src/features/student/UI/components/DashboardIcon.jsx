const paths = {
  grid: 'M3 3h6v6H3z M15 3h6v6h-6z M3 15h6v6H3z M15 15h6v6h-6z',
  trophy: 'M8 3h8v8a4 4 0 0 1-8 0V3Z M8 5H4v3a4 4 0 0 0 4 4 M16 5h4v3a4 4 0 0 1-4 4 M12 15v5 M8 21h8',
  clock: 'M12 8v5h4 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  sparkles: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z M20 2v4 M18 4h4 M4 18v4 M2 20h4',
  award: 'M16 13v9l-4-3-4 3v-9 M18 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z',
  card: 'M3 5h18v14H3z M7 9h3v3H7z M6 16v-1a2 2 0 0 1 5 0v1 M15 9h3 M15 13h3',
  bot: 'M5 8h14v12H5z M9 8V4h6v4 M9 13v2 M15 13v2 M2 12h3 M19 12h3',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
  user: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M6 19v-1a6 6 0 0 1 12 0v1',
  refresh: 'M20 8a8 8 0 0 0-14-3L3 8 M3 3v5h5 M4 16a8 8 0 0 0 14 3l3-3 M21 21v-5h-5',
  logout: 'M9 4H4v16h5 M12 12h9 M17 8l4 4-4 4',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  close: 'm6 6 12 12 M6 18 18 6',
  search: 'M16 16l5 5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  check: 'm5 12 4 4L19 6',
  bolt: 'm13 2-9 12h7l-1 8 10-13h-7l1-7Z',
  arrow: 'M6 18 18 6 M6 6h12v12',
  copy: 'M8 8h12v13H8z M16 8V3H3v14h5',
  print: 'M6 8V2h12v6 M6 17H3V8h18v9h-3 M6 13h12v9H6z',
}

export default function DashboardIcon({ name, className = 'size-4' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}><path d={paths[name] || paths.grid} /></svg>
}
