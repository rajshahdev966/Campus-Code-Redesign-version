import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router'
import QRCode from 'qrcode'
import CampusLogo from '../../../../components/CampusLogo'
import StudentAvatar from '../components/StudentAvatar'
import DashboardIcon from '../components/DashboardIcon'
import useBadgeMotion from '../../hooks/useBadgeMotion'

export default function DigitalCardPage() {
  const { studentProfile } = useOutletContext()
  const stage = useRef(null)
  useBadgeMotion(stage)
  const [qrImage, setQrImage] = useState('')
  const [qrError, setQrError] = useState(false)
  const [copyMessage, setCopyMessage] = useState('')

  useEffect(() => {
    let active = true
    QRCode.toDataURL(window.location.origin + '/student', { width: 212, margin: 0, color: { dark: '#111111', light: '#ffffff' } })
      .then(image => { if (active) setQrImage(image) })
      .catch(() => { if (active) setQrError(true) })
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
      <div className="dashboard-page-heading"><div><p className="dashboard-kicker text-xs">Identity / student account</p><h1 className="dashboard-heading mt-2">DIGITAL ID.</h1><p className="mt-3 max-w-[630px] text-[14px] leading-6 text-muted">Your CampusCode identity card, with your student details and a QR code for your workspace.</p></div></div>
      <div className="identity-workspace badge-workspace">
        <div ref={stage} className="badge-stage">
          <div className="badge-rail" aria-hidden="true"><span className="badge-hook" /></div>
          <div className="badge-suspension" data-badge-swing>
            <div className="badge-strap" aria-hidden="true"><span>CAMPUSCODE</span></div>
            <div className="badge-clip" aria-hidden="true"><span /></div>
            <section aria-label="CampusCode student identity card" className="student-id-card badge-card" data-badge-card>
              <button type="button" className="badge-grip" data-badge-handle aria-label="Drag the badge, or use the left and right arrow keys" aria-describedby="badge-instructions"><span aria-hidden="true" /></button>
              <div className="badge-upper">
                <div className="badge-foil" data-badge-foil aria-hidden="true" />
                <div className="badge-brand"><CampusLogo className="w-[150px]" /><span className="badge-verified">VERIFIED</span></div>
                <div className="badge-profile"><StudentAvatar className="size-16 shrink-0 rounded-full border border-line" /><div><p className="dashboard-label text-purple">STUDENT</p><h2>{studentProfile.name}</h2><p>{studentProfile.email}</p></div></div>
                <dl className="badge-facts">{[{ label: 'CAMPUSCODE ID', value: studentProfile.campusId }, { label: 'ROLE', value: 'STUDENT' }, { label: 'ACCOUNT', value: 'ACTIVE' }].map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
              </div>
              <div className="badge-scan-area">
                <div className="identity-qr">{qrImage ? <img src={qrImage} alt="QR code linking to the CampusCode student workspace" width="212" height="212" className="mx-auto size-[212px] max-w-full [image-rendering:pixelated]" /> : <div className="badge-qr-placeholder">{qrError ? 'QR code unavailable. Use Copy workspace link.' : 'Preparing your workspace QR code…'}</div>}<p>SCAN TO OPEN YOUR CAMPUSCODE WORKSPACE</p></div>
                <div className="badge-footer"><span>LEARN · BUILD · BELONG</span><span>{studentProfile.campusId}</span></div>
              </div>
            </section>
          </div>
          <div className="badge-floor-shadow" data-badge-shadow aria-hidden="true" />
          <p id="badge-instructions" className="badge-instructions">Drag the top of your badge {'\u00b7'} Use {'\u2190'} {'\u2192'} when focused</p>
        </div>
        <section className="badge-info"><p className="dashboard-kicker text-purple">Identity / 01</p><h2 className="badge-info-heading">ONE ID.<br />YOUR<br />CAMPUSCODE.</h2><p className="mt-5 text-[13px] leading-6 text-muted">Your student identity, ready to share. This demo card uses sample profile details and a real QR code that opens the student workspace.</p><p className="identity-ready"><span className="mr-2 inline-block size-1.5 rounded-full bg-lime" />STUDENT PROFILE READY</p>
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => window.print()} className="dashboard-button"><DashboardIcon name="print" />PRINT / SAVE</button><button type="button" onClick={copyProfileLink} className="dashboard-outline-button"><DashboardIcon name="copy" />COPY WORKSPACE LINK</button></div><p role="status" className="mt-3 text-[12px] text-purple">{copyMessage}</p>
        </section>
      </div>
    </>
  )
}
