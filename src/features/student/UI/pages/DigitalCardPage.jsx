import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import QRCode from 'qrcode'
import CampusLogo from '../../../../components/CampusLogo'
import StudentAvatar from '../components/StudentAvatar'
import DashboardIcon from '../components/DashboardIcon'

export default function DigitalCardPage() {
  const { studentProfile } = useOutletContext()
  const [qrImage, setQrImage] = useState('')
  const [copyMessage, setCopyMessage] = useState('')

  useEffect(() => {
    let active = true
    QRCode.toDataURL(window.location.origin + '/student', { width: 212, margin: 0, color: { dark: '#111111', light: '#ffffff' } }).then(image => { if (active) setQrImage(image) }).catch(() => { if (active) setQrImage('') })
    return () => { active = false }
  }, [])

  async function copyProfileLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/student')
      setCopyMessage('Workspace link copied.')
    } catch {
      setCopyMessage('Copy is unavailable in this browser. The workspace link is /student.')
    }
  }

  return (
    <>
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker">Identity / student account</p><h1 className="dashboard-heading mt-2">DIGITAL ID.</h1><p className="mt-3 max-w-[630px] text-[14px] leading-6 text-muted">Your CampusCode identity card, with your student details and a QR code for your workspace.</p></div></div>
      <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <section aria-label="CampusCode student identity card" className="student-id-card relative isolate overflow-hidden rounded-[22px] border border-line bg-paper p-6 shadow-[0_22px_55px_#11111135] sm:p-[26px]">
          <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-lime/[.06] blur-3xl" />
          <div className="flex items-center justify-between gap-5"><CampusLogo className="w-[165px]" /><span className="font-mono text-[9px] tracking-[1px] text-[#96e95b]">VERIFIED</span></div>
          <div className="mt-14 flex items-center gap-4"><StudentAvatar className="size-[82px] shrink-0 rounded-full border border-lime shadow-lg" /><div><p className="font-mono text-[9px] text-[#96e95b]">STUDENT</p><h2 className="mt-2 text-[30px] font-bold tracking-[-1.5px]">{studentProfile.name}</h2><p className="mt-1 text-[11px] text-muted">{studentProfile.email}</p></div></div>
          <div className="mt-10 grid grid-cols-3 gap-3 border-y border-ink py-4">{[{ label: 'CAMPUSCODE ID', value: studentProfile.campusId }, { label: 'ROLE', value: 'STUDENT' }, { label: 'ACCOUNT', value: 'ACTIVE' }].map(item => <div key={item.label}><p className="font-mono text-[7px] text-muted">{item.label}</p><p className="mt-2 text-[10px] font-bold">{item.value}</p></div>)}</div>
          <div className="mx-auto my-7 w-fit max-w-full rounded-xl bg-[#f3f3ef] p-3">{qrImage ? <img src={qrImage} alt="QR code linking to the CampusCode student workspace" width="212" height="212" className="mx-auto size-[212px] max-w-full [image-rendering:pixelated]" /> : <div className="flex size-[212px] max-w-full items-center justify-center bg-paper text-center text-[11px] text-muted">Preparing your workspace QR code…</div>}<p className="mt-3 text-center text-[7px] font-extrabold tracking-[.4px] text-muted">SCAN TO OPEN YOUR CAMPUSCODE WORKSPACE</p></div>
          <div className="flex justify-between gap-5 border-t border-ink pt-4 font-mono text-[7px] text-muted"><span>LEARN · BUILD · BELONG</span><span>{studentProfile.campusId}</span></div>
        </section>
        <section className="bg-paper"><p className="dashboard-kicker text-[#96e95b]">Identity / 01</p><h2 className="mt-4 text-[clamp(34px,3.5vw,50px)] font-bold leading-[.9] tracking-[-2.8px]">ONE ID.<br />YOUR<br />CAMPUSCODE.</h2><p className="mt-5 text-[13px] leading-6 text-muted">Your student identity, ready to share. This demo card uses sample profile details and a real QR code that opens the student workspace.</p><p className="mt-6 bg-[#eff5df] text-[9px] font-bold text-[#71882b]"><span className="mr-2 inline-block size-1.5 rounded-full bg-[#adf57a]" />STUDENT PROFILE READY</p><div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => window.print()} className="flex items-center gap-2 px-4 py-3 text-[11px] font-extrabold tracking-[.7px] text-muted"><DashboardIcon name="print" />PRINT / SAVE</button><button type="button" onClick={copyProfileLink} className="dashboard-outline-button"><DashboardIcon name="copy" />COPY WORKSPACE LINK</button></div><p role="status" className="mt-3 text-[11px] text-purple">{copyMessage}</p></section>
      </div>
    </>
  )
}
