import { junnyProfile } from '../../config/junny/profile'

export default function JunnyProfilePage() {
  return <section className="junny-profile-page" aria-labelledby="junny-profile-title">
    <header><span>OFFICIAL MASCOT PROFILE</span><h2 id="junny-profile-title">Meet Junny</h2><p>Chief Happiness Officer · Face of Satwika OS</p></header>
    <div className="junny-profile-page-card">
      <div className="junny-profile-page-portrait"><img src={junnyProfile.portrait} alt="Junny's official pink pixel-art mascot portrait" draggable={false}/></div>
      <div className="junny-profile-page-identity"><h3>{junnyProfile.name}</h3><span className="junny-profile-seal">✦ {junnyProfile.verification}</span><strong>EMPLOYEE ID <b>{junnyProfile.employeeId}</b></strong><p>Officially in charge of making this little operating system feel like home.</p></div>
    </div>
    <dl className="junny-profile-page-details">
      <div><dt>Designation</dt><dd>{junnyProfile.designation}</dd></div>
      <div><dt>Department</dt><dd>{junnyProfile.department}</dd></div>
      <div><dt>Specialization</dt><dd>{junnyProfile.specialization}</dd></div>
      <div><dt>Experience</dt><dd>{junnyProfile.experience}</dd></div>
      <div><dt>Employment status</dt><dd>{junnyProfile.employmentStatus}</dd></div>
      <div><dt>Replacement</dt><dd>{junnyProfile.replacementStatus}</dd></div>
    </dl>
    <footer>AUTHORISED BY THE HAPPINESS DEPARTMENT <span>JUN-001 · NO EXPIRY</span></footer>
  </section>
}
