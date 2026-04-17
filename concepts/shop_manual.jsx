function ShopManual() {
  return (
    <div style={smStyles.root}>
      <ManualHeader />
      <CoverPlate />
      <SpecSheet />
      <PartsList />
      <ExplodedView />
      <Notes />
      <Revisions />
    </div>
  );
}

function ManualHeader() {
  return (
    <div style={smStyles.manualHeader}>
      <span>OAJ SAINI / SHOP MANUAL</span>
      <span>DOC NO. OS–2026–001</span>
      <span>REV. A · 04/26</span>
      <span>SHEET 01 / 06</span>
      <span style={{color: 'var(--accent)'}}>◼ UNCONTROLLED COPY</span>
    </div>
  );
}

function CoverPlate() {
  return (
    <section style={smStyles.cover}>
      <GridPaper />
      <div style={smStyles.coverInner}>
        <div style={smStyles.coverKicker}>
          <div style={smStyles.coverTag}>PROJECT FILE</div>
          <div style={smStyles.coverPath}>~/portfolio/oaj-saini/index.md</div>
        </div>
        <h1 style={smStyles.coverTitle}>
          Oaj Saini —<br />
          <span style={smStyles.coverTitleSub}>builds, teardowns, and datasheets.</span>
        </h1>
        <div style={smStyles.coverGrid}>
          <div style={smStyles.coverCol}>
            <ManualField k="NAME" v="Oaj Saini" />
            <ManualField k="ROLE" v="Student / Maker" />
            <ManualField k="INST" v="University of Texas at Austin" />
          </div>
          <div style={smStyles.coverCol}>
            <ManualField k="LOC" v="Austin, TX 78712" />
            <ManualField k="EMAIL" v="oajsaini@gmail.com" />
            <ManualField k="GITHUB" v="github.com/osaini" />
          </div>
          <div style={smStyles.coverCol}>
            <ManualField k="DOMAIN" v="Mechatronics · Automotive · Embedded" />
            <ManualField k="STATUS" v={<span style={{color: 'var(--accent)'}}>● AVAILABLE · SUM '26</span>} />
            <ManualField k="SCOPE" v="Design · Build · Ship" />
          </div>
        </div>
        <div style={smStyles.coverCaptionRow}>
          <div style={smStyles.coverFig}>Fig. 1.0 — Bio summary, see § 2.0 for expanded statement.</div>
          <div style={smStyles.coverQuote}>
            “I build things that move, think, and<br />
            break the rules of cost.”
          </div>
        </div>
      </div>
    </section>
  );
}

function GridPaper() {
  return (
    <div style={smStyles.gridPaper} aria-hidden>
      <svg width="100%" height="100%" style={{display:'block'}}>
        <defs>
          <pattern id="sm-grid-sm" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.5" />
          </pattern>
          <pattern id="sm-grid-lg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#sm-grid-sm)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sm-grid-lg)" />
      </svg>
    </div>
  );
}

function ManualField({ k, v }) {
  return (
    <div style={smStyles.field}>
      <div style={smStyles.fieldK}>{k}</div>
      <div style={smStyles.fieldV}>{v}</div>
    </div>
  );
}

function SpecSheet() {
  const { PERSONAL } = window;
  return (
    <section style={smStyles.spec}>
      <SectionMark n="2.0" title="Bio / Spec" sub="Who I am and what I'm good at." />
      <div style={smStyles.specGrid}>
        <div style={smStyles.specBody}>
          <p style={smStyles.specP}>{PERSONAL.bio}</p>
          <p style={smStyles.specP}>
            I work in the overlap between firmware, fabrication, and mechanical design — the kind of projects where you have to argue with a solder joint and a compression reading on the same afternoon.
          </p>
        </div>
        <table style={smStyles.specTable}>
          <tbody>
            <tr><td style={smStyles.tdK}>2.1 FABRICATION</td><td style={smStyles.tdV}>3D Printing · CAD · Bambu X1C</td></tr>
            <tr><td style={smStyles.tdK}>2.2 ELECTRONICS</td><td style={smStyles.tdV}>Arduino · STM32 · PCB design</td></tr>
            <tr><td style={smStyles.tdK}>2.3 SOFTWARE</td><td style={smStyles.tdV}>Python · TypeScript · Electron</td></tr>
            <tr><td style={smStyles.tdK}>2.4 MECHANICAL</td><td style={smStyles.tdV}>Engine rebuild · Torque spec · Compression</td></tr>
            <tr><td style={smStyles.tdK}>2.5 SHOP TOOLS</td><td style={smStyles.tdV}>Oscilloscope · Torque wrench · Feeler gauges</td></tr>
            <tr><td style={smStyles.tdK}>2.6 EDITORS</td><td style={smStyles.tdV}>Neovim · Fusion 360 · KiCad</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SectionMark({ n, title, sub }) {
  return (
    <div style={smStyles.sectionMark}>
      <div style={smStyles.sectionMarkNum}>§ {n}</div>
      <div>
        <h2 style={smStyles.sectionMarkTitle}>{title}</h2>
        {sub && <div style={smStyles.sectionMarkSub}>{sub}</div>}
      </div>
    </div>
  );
}

function PartsList() {
  const { PROJECTS } = window;
  const [hovered, setHovered] = React.useState(null);
  return (
    <section style={smStyles.parts}>
      <SectionMark n="3.0" title="Parts List" sub="Selected builds. See § 4.0 for exploded view of featured part." />
      <div style={smStyles.tableWrap}>
        <div style={{...smStyles.tableRow, ...smStyles.tableHead}}>
          <div style={{...smStyles.cell, width: 70}}>PART NO.</div>
          <div style={{...smStyles.cell, flex: 2.2}}>DESIGNATION</div>
          <div style={{...smStyles.cell, flex: 3}}>DESCRIPTION</div>
          <div style={{...smStyles.cell, flex: 1.2}}>DOMAIN</div>
          <div style={{...smStyles.cell, width: 80}}>YEAR</div>
          <div style={{...smStyles.cell, width: 70, textAlign: 'right'}}>REF.</div>
        </div>
        {PROJECTS.map((p, i) => (
          <div key={p.slug}
            style={{ ...smStyles.tableRow, background: hovered === i ? 'var(--paper-2)' : 'transparent' }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
          >
            <div style={{...smStyles.cell, width: 70, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', fontWeight: 700}}>OS-{p.no}</div>
            <div style={{...smStyles.cell, flex: 2.2}}>
              <div style={smStyles.partName}>{p.title}</div>
              <div style={smStyles.partSub}>{p.subtitle}</div>
            </div>
            <div style={{...smStyles.cell, flex: 3, color: 'var(--muted)', lineHeight: 1.5}}>{p.description}</div>
            <div style={{...smStyles.cell, flex: 1.2, fontFamily: "'JetBrains Mono', monospace", fontSize: 11}}>{p.cat}</div>
            <div style={{...smStyles.cell, width: 80, fontFamily: "'JetBrains Mono', monospace", fontSize: 12}}>{p.year}</div>
            <div style={{...smStyles.cell, width: 70, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--accent)'}}>§ 4.{i + 1} →</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExplodedView() {
  const { PROJECTS, Placeholder } = window;
  const cade = PROJECTS[0];
  return (
    <section style={smStyles.exploded}>
      <SectionMark n="4.1" title="C.A.D.E — Exploded View" sub="Computer Aided Driving Emulator · Fig 4.1.0" />
      <div style={smStyles.explodedLayout}>
        <div style={smStyles.drawing}>
          <Placeholder ratio="4 / 3" label="cade exploded cad view" tone="paper" />
          <Callout x="18%" y="22%" n="A" label="Steering Column" />
          <Callout x="62%" y="30%" n="B" label="ATmega Controller" />
          <Callout x="44%" y="68%" n="C" label="Hall-Sensor Pedals" />
          <Callout x="80%" y="70%" n="D" label="3D-Printed Rig" />
        </div>
        <div style={smStyles.bom}>
          <div style={smStyles.bomHead}>BILL OF MATERIALS</div>
          <BomRow mark="A" part="Steering Column Assy." qty="1" cost="$8.50" />
          <BomRow mark="B" part="ATmega 32U4" qty="1" cost="$12.00" />
          <BomRow mark="C" part="Hall-Sensor Pedals (pair)" qty="2" cost="$9.80" />
          <BomRow mark="D" part="3D-Printed Frame (PLA)" qty="1" cost="$11.02" />
          <BomRow mark="E" part="Wiring & Fasteners" qty="—" cost="$5.00" />
          <div style={smStyles.bomTotal}>
            <span>TOTAL BOM</span>
            <b style={{color: 'var(--accent)'}}>$46.32</b>
          </div>
          <div style={smStyles.bomStatBlock}>
            {cade.stats.map(s => (
              <div key={s.label} style={smStyles.bomStat}>
                <div style={smStyles.bomStatV}>{s.value}</div>
                <div style={smStyles.bomStatL}>{s.label}</div>
              </div>
            ))}
          </div>
          <a href="#" style={smStyles.bomCTA}>Open full build file ↗</a>
        </div>
      </div>
    </section>
  );
}

function Callout({ x, y, n, label }) {
  return (
    <div style={{...smStyles.callout, left: x, top: y}}>
      <div style={smStyles.calloutMark}>{n}</div>
      <div style={smStyles.calloutLine} />
      <div style={smStyles.calloutLabel}>{label}</div>
    </div>
  );
}

function BomRow({ mark, part, qty, cost }) {
  return (
    <div style={smStyles.bomRow}>
      <div style={smStyles.bomRef}>{mark}</div>
      <div style={smStyles.bomPart}>{part}</div>
      <div style={smStyles.bomQty}>{qty}</div>
      <div style={smStyles.bomCost}>{cost}</div>
    </div>
  );
}

function Notes() {
  return (
    <section style={smStyles.notes}>
      <SectionMark n="5.0" title="Engineer's Notes" />
      <div style={smStyles.notesGrid}>
        <NoteCard num="5.1" title="Currently on the bench" items={["CADE v2 with load-cell brake pedal","STM32-based ECU logger for daily driver","Exploring FSAE suspension kinematics in Python"]} />
        <NoteCard num="5.2" title="Principles" items={["Curiosity > capital","Measure before you cut","Ship rough, iterate mean","Teardown is a learning op"]} />
        <NoteCard num="5.3" title="Looking for" items={["Summer '26 internship","Mech / EE / embedded","Teams that build physical things"]} />
      </div>
    </section>
  );
}

function NoteCard({ num, title, items }) {
  return (
    <div style={smStyles.noteCard}>
      <div style={smStyles.noteHead}>
        <span style={smStyles.noteNum}>{num}</span>
        <span style={smStyles.noteTitle}>{title}</span>
      </div>
      <ul style={smStyles.noteList}>
        {items.map((it, i) => (
          <li key={i} style={smStyles.noteItem}>
            <span style={smStyles.noteBullet}>—</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Revisions() {
  const { PERSONAL } = window;
  return (
    <section style={smStyles.rev}>
      <SectionMark n="6.0" title="Revision History / Contact" />
      <div style={smStyles.revGrid}>
        <table style={smStyles.revTable}>
          <thead>
            <tr>
              <th style={smStyles.revTh}>REV</th>
              <th style={smStyles.revTh}>DATE</th>
              <th style={smStyles.revTh}>DESCRIPTION</th>
              <th style={smStyles.revTh}>BY</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>—</td><td>2022/09</td><td>First engine teardown</td><td>OS</td></tr>
            <tr><td>A</td><td>2023/04</td><td>Fast Fashion Detector shipped</td><td>OS</td></tr>
            <tr><td>B</td><td>2024/02</td><td>CADE v1.0 assembled</td><td>OS</td></tr>
            <tr><td>C</td><td>2024/08</td><td>Gemini CLI GUI released</td><td>OS</td></tr>
            <tr><td>D</td><td>2024/12</td><td>Accent rebuild complete</td><td>OS</td></tr>
            <tr><td>E</td><td>2026/04</td><td>Portfolio rev. A published</td><td>OS</td></tr>
          </tbody>
        </table>
        <div style={smStyles.contactCard}>
          <div style={smStyles.contactStamp}>
            <div style={smStyles.stampHead}>APPROVED FOR HIRE</div>
            <div style={smStyles.stampBody}>
              <div><b>Oaj Saini</b></div>
              <div style={{color: 'var(--muted)', fontSize: 12, marginTop: 4}}>
                Reach out for collaboration, internships, or teardown coffee.
              </div>
            </div>
            <div style={smStyles.stampDate}>04 / 26 / 2026</div>
          </div>
          <div style={smStyles.contactLinks}>
            <a href={`mailto:${PERSONAL.email}`} style={smStyles.contactLink}>
              <span style={smStyles.contactK}>EMAIL</span>
              <span style={smStyles.contactV}>{PERSONAL.email} →</span>
            </a>
            <a href={PERSONAL.github} style={smStyles.contactLink}>
              <span style={smStyles.contactK}>GITHUB</span>
              <span style={smStyles.contactV}>@{PERSONAL.githubUsername} →</span>
            </a>
          </div>
        </div>
      </div>
      <div style={smStyles.footerBar}>
        <span>© 2026 OAJ SAINI</span>
        <span>SHOP MANUAL · REV. A</span>
        <span>END OF DOCUMENT ◼</span>
      </div>
    </section>
  );
}

const smStyles = {
  root: { background: 'var(--paper)', color: 'var(--ink)', fontFamily: "'Space Grotesk', sans-serif" },
  manualHeader: { display: 'flex', justifyContent: 'space-between', padding: '10px 36px', fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--paper)' },
  cover: { position: 'relative', padding: '64px 36px 80px', overflow: 'hidden', borderBottom: '2px solid var(--ink)' },
  gridPaper: { position: 'absolute', inset: 0, color: 'var(--ink)', pointerEvents: 'none' },
  coverInner: { position: 'relative', maxWidth: 1400, margin: '0 auto' },
  coverKicker: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--line-strong)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' },
  coverTag: { padding: '4px 10px', background: 'var(--accent)', color: '#0a0a0a', fontWeight: 700 },
  coverPath: { color: 'var(--muted)' },
  coverTitle: { margin: '48px 0 60px', fontSize: 'clamp(60px, 9vw, 140px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.92 },
  coverTitleSub: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--muted)' },
  coverGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)' },
  coverCol: { borderRight: '1px solid var(--line-strong)', padding: '20px 24px' },
  field: { marginBottom: 16 },
  fieldK: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 },
  fieldV: { fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' },
  coverCaptionRow: { marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 40 },
  coverFig: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: 'var(--muted)' },
  coverQuote: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 24, lineHeight: 1.3, color: 'var(--ink)', textAlign: 'right', maxWidth: 420 },
  sectionMark: { display: 'flex', gap: 24, alignItems: 'baseline', maxWidth: 1400, margin: '0 auto 40px', padding: '0 0 20px', borderBottom: '1.5px solid var(--ink)' },
  sectionMarkNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.04em', width: 70, flexShrink: 0 },
  sectionMarkTitle: { margin: 0, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.03em' },
  sectionMarkSub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginTop: 6 },
  spec: { padding: '80px 36px' },
  specGrid: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'start' },
  specBody: {},
  specP: { fontSize: 19, lineHeight: 1.55, marginBottom: 20 },
  specTable: { width: '100%', borderCollapse: 'collapse', fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, border: '1.5px solid var(--ink)' },
  tdK: { padding: '12px 14px', borderBottom: '1px solid var(--line-strong)', borderRight: '1px solid var(--line-strong)', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', verticalAlign: 'top' },
  tdV: { padding: '12px 14px', borderBottom: '1px solid var(--line-strong)', color: 'var(--ink)' },
  parts: { padding: '60px 36px 80px' },
  tableWrap: { maxWidth: 1400, margin: '0 auto', border: '1.5px solid var(--ink)' },
  tableHead: { background: 'var(--ink)', color: 'var(--paper)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' },
  tableRow: { display: 'flex', borderBottom: '1px solid var(--line-strong)', transition: 'background 0.12s' },
  cell: { padding: '18px 18px', borderRight: '1px solid var(--line-strong)', fontSize: 14 },
  partName: { fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em' },
  partSub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' },
  exploded: { padding: '80px 36px', background: 'var(--paper-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)' },
  explodedLayout: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32, alignItems: 'start' },
  drawing: { position: 'relative', border: '1.5px solid var(--ink)', background: 'var(--paper)' },
  callout: { position: 'absolute', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none' },
  calloutMark: { width: 26, height: 26, borderRadius: '50%', background: 'var(--accent)', color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, border: '1.5px solid var(--ink)' },
  calloutLine: { width: 30, height: 1.5, background: 'var(--ink)' },
  calloutLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'var(--paper)', padding: '4px 8px', border: '1px solid var(--ink)', whiteSpace: 'nowrap' },
  bom: { border: '1.5px solid var(--ink)', background: 'var(--paper)' },
  bomHead: { background: 'var(--ink)', color: 'var(--paper)', padding: '12px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' },
  bomRow: { display: 'grid', gridTemplateColumns: '40px 1fr 50px 80px', padding: '12px 14px', borderBottom: '1px solid var(--line-strong)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, alignItems: 'center' },
  bomRef: { color: 'var(--accent)', fontWeight: 700 },
  bomPart: { color: 'var(--ink)' },
  bomQty: { color: 'var(--muted)', textAlign: 'right' },
  bomCost: { color: 'var(--ink)', fontWeight: 600, textAlign: 'right' },
  bomTotal: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 14px', background: 'var(--paper-2)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid var(--line-strong)' },
  bomStatBlock: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--line-strong)' },
  bomStat: { padding: '16px 14px', borderRight: '1px solid var(--line-strong)' },
  bomStatV: { fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--accent)' },
  bomStatL: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginTop: 4 },
  bomCTA: { display: 'block', padding: '16px 14px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', textDecoration: 'none', textAlign: 'center', background: 'var(--paper-2)' },
  notes: { padding: '80px 36px' },
  notesGrid: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: '1.5px solid var(--ink)' },
  noteCard: { padding: '28px 30px', borderRight: '1px solid var(--line-strong)' },
  noteHead: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--line-strong)' },
  noteNum: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em' },
  noteTitle: { fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' },
  noteList: { margin: 0, padding: 0, listStyle: 'none' },
  noteItem: { display: 'flex', gap: 10, fontSize: 15.5, lineHeight: 1.6, marginBottom: 8 },
  noteBullet: { color: 'var(--accent)', flexShrink: 0 },
  rev: { padding: '80px 36px 40px' },
  revGrid: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32 },
  revTable: { width: '100%', borderCollapse: 'collapse', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, border: '1.5px solid var(--ink)' },
  revTh: { background: 'var(--ink)', color: 'var(--paper)', padding: '12px 14px', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'left' },
  contactCard: { border: '1.5px solid var(--ink)', display: 'flex', flexDirection: 'column' },
  contactStamp: { position: 'relative', padding: '22px 26px', borderBottom: '1px solid var(--line-strong)', background: 'var(--paper-2)' },
  stampHead: { display: 'inline-block', padding: '4px 10px', border: '2px solid var(--accent)', color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', transform: 'rotate(-3deg)', marginBottom: 14 },
  stampBody: { fontSize: 16 },
  stampDate: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', marginTop: 14, letterSpacing: '0.08em' },
  contactLinks: { display: 'flex', flexDirection: 'column' },
  contactLink: { display: 'flex', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--line-strong)', textDecoration: 'none', color: 'var(--ink)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 },
  contactK: { color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11 },
  contactV: { fontWeight: 600 },
  footerBar: { maxWidth: 1400, margin: '40px auto 0', display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '1.5px solid var(--ink)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' },
};

window.ShopManual = ShopManual;
