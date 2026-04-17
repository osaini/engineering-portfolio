function PitWall() {
  const { PERSONAL, PROJECTS, Placeholder } = window;
  return (
    <div style={styles.root}>
      <TopStrip />
      <Hero />
      <TelemetryBar />
      <ProjectStack />
      <AboutTerminal />
      <FooterStrip />
    </div>
  );
}

function TopStrip() {
  return (
    <div style={styles.topStrip}>
      <span><span style={styles.dot} /> LIVE · PIT WALL TELEMETRY</span>
      <span>SECTOR 03 · LAP 47 / 58</span>
      <span>DRIVER · <b>OAJ.SAINI</b></span>
      <span>STATUS · <span style={{color: 'var(--accent)'}}>SHIPPING</span></span>
    </div>
  );
}

function Hero() {
  const { PERSONAL } = window;
  return (
    <section style={styles.hero}>
      <Corner tl /><Corner tr /><Corner bl /><Corner br />
      <div style={styles.heroGrid}>
        <div style={styles.heroLeft}>
          <div style={styles.metaLabel}>◣ DRIVER PROFILE · 2026</div>
          <div style={styles.metaBlock}>
            <div style={styles.metaLine}><span>LOC</span><b>{PERSONAL.location}</b></div>
            <div style={styles.metaLine}><span>AFFIL</span><b>UT AUSTIN</b></div>
            <div style={styles.metaLine}><span>CLASS</span><b>MAKER / BUILDER</b></div>
            <div style={styles.metaLine}><span>CONTACT</span><b>oajsaini@gmail.com</b></div>
          </div>
          <Gauge label="BUILDS / YR" value={12} max={15} unit="" />
          <Gauge label="COST EFFICIENCY" value={92} max={100} unit="%" />
        </div>

        <div style={styles.heroCenter}>
          <div style={styles.nameStack}>
            <span style={styles.nameFirst}>{PERSONAL.first}</span>
            <span style={styles.nameSlash}>/</span>
            <span style={styles.nameLast}>{PERSONAL.last}</span>
          </div>
          <div style={styles.tagline}>
            <em>{PERSONAL.tagline}</em>
          </div>
          <div style={styles.cta}>
            <a href="#projects" style={styles.ctaPrimary}>
              <span>▸</span> ENTER THE GARAGE
            </a>
            <a href="#contact" style={styles.ctaGhost}>
              BOX / BOX ↗
            </a>
          </div>
        </div>

        <div style={styles.heroRight}>
          <Tachometer />
          <div style={{...styles.metaLabel, marginTop: 20, textAlign: 'right'}}>◢ BUILD TACH · @12K RPM</div>
        </div>
      </div>
      <Ticker />
    </section>
  );
}

function Corner({ tl, tr, bl, br }) {
  const pos = {
    ...(tl && { top: 18, left: 18 }),
    ...(tr && { top: 18, right: 18, transform: 'rotate(90deg)' }),
    ...(bl && { bottom: 18, left: 18, transform: 'rotate(-90deg)' }),
    ...(br && { bottom: 18, right: 18, transform: 'rotate(180deg)' }),
  };
  return (
    <div style={{ position: 'absolute', width: 22, height: 22, ...pos }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 2, background: 'var(--accent)' }} />
      <div style={{ position: 'absolute', left: 0, top: 0, width: 2, height: '100%', background: 'var(--accent)' }} />
    </div>
  );
}

function Gauge({ label, value, max, unit }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginTop: 22 }}>
      <div style={styles.gaugeLabel}>
        <span>{label}</span>
        <b>{value}{unit}</b>
      </div>
      <div style={styles.gaugeTrack}>
        {Array.from({ length: 20 }).map((_, i) => {
          const filled = (i / 20) * 100 < pct;
          const hot = i >= 16;
          return (
            <span key={i} style={{
              flex: 1, height: 14, marginRight: 2,
              background: filled ? (hot ? 'var(--accent)' : '#f4f2ec') : 'rgba(255,255,255,0.08)',
            }} />
          );
        })}
      </div>
    </div>
  );
}

function Tachometer() {
  const r = 110, cx = 140, cy = 140;
  const ticks = Array.from({ length: 13 });
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="tachglow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f2ec" stopOpacity="0.15" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 14} fill="none" stroke="#f4f2ec" strokeOpacity="0.15" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f4f2ec" strokeOpacity="0.3" strokeWidth="1" />
      <path d={describeArc(cx, cy, r - 6, -135, 70)} fill="none" stroke="url(#tachglow)" strokeWidth="10" />
      <path d={describeArc(cx, cy, r - 6, 70, 135)} fill="none" stroke="var(--accent)" strokeWidth="10" />
      {ticks.map((_, i) => {
        const a = -135 + (i * 270) / 12;
        const inner = r - 18, outer = r - 2;
        const p1 = pointOn(cx, cy, inner, a);
        const p2 = pointOn(cx, cy, outer, a);
        const hot = i >= 10;
        return (
          <g key={i}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={hot ? 'var(--accent)' : '#f4f2ec'}
              strokeOpacity={hot ? 1 : 0.55}
              strokeWidth={i % 2 === 0 ? 2 : 1} />
            {i % 2 === 0 && (
              <text x={pointOn(cx, cy, inner - 14, a).x} y={pointOn(cx, cy, inner - 14, a).y + 4}
                textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fill="#f4f2ec" opacity="0.7">
                {i}
              </text>
            )}
          </g>
        );
      })}
      <g transform={`rotate(85 ${cx} ${cy})`}>
        <line x1={cx} y1={cy} x2={cx + r - 10} y2={cy} stroke="var(--accent)" strokeWidth="3" />
        <circle cx={cx + r - 10} cy={cy} r="4" fill="var(--accent)" />
      </g>
      <circle cx={cx} cy={cy} r="14" fill="#f4f2ec" opacity="0.9" />
      <circle cx={cx} cy={cy} r="14" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <text x={cx} y={cy - 32} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#f4f2ec" opacity="0.6">RPM × 1000</text>
      <text x={cx} y={cy + 50} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="28" fontWeight="600" fill="#f4f2ec">10.4</text>
      <text x={cx} y={cy + 68} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="var(--accent)">REDLINE</text>
    </svg>
  );
}
function describeArc(cx, cy, r, startA, endA) {
  const start = pointOn(cx, cy, r, endA);
  const end = pointOn(cx, cy, r, startA);
  const large = endA - startA <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}
function pointOn(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function Ticker() {
  const items = [
    "◉ 400+ HRS DRIVEN ON CADE SIM",
    "◉ 4/4 CYLINDERS RESTORED · 142 PSI",
    "◉ $46.32 TOTAL BOM · CADE",
    "◉ SHIPPING CODE DAILY",
    "◉ AVAIL SUMMER '26",
    "◉ HOBBY: ACTUAL RACING",
    "◉ CURRENTLY: PROD READY",
  ];
  return (
    <div style={styles.ticker}>
      <div style={styles.tickerInner}>
        {[...items, ...items].map((t, i) => <span key={i} style={{ marginRight: 44 }}>{t}</span>)}
      </div>
    </div>
  );
}

function TelemetryBar() {
  const cells = [
    { k: "AVAILABLE", v: "SUM 2026", color: "var(--accent)" },
    { k: "PROJECTS LIVE", v: "04" },
    { k: "LINES / WEEK", v: "~3.2K" },
    { k: "TEARDOWNS", v: "07" },
    { k: "COFFEE / DAY", v: "02–04" },
    { k: "GPA", v: "3.9" },
  ];
  return (
    <div style={styles.telemetry}>
      {cells.map((c, i) => (
        <div key={i} style={styles.telemetryCell}>
          <div style={styles.telemetryK}>{c.k}</div>
          <div style={{...styles.telemetryV, color: c.color || 'inherit'}}>{c.v}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectStack() {
  const { PROJECTS, Placeholder } = window;
  return (
    <section id="projects" style={styles.projectsSection}>
      <div style={styles.sectionHead}>
        <div style={styles.sectionTag}>◤ GRID 02</div>
        <h2 style={styles.sectionTitle}>Race Log</h2>
        <div style={styles.sectionSub}>Selected builds · oldest lap last</div>
      </div>
      <div style={styles.lapGrid}>
        {PROJECTS.map((p, i) => <LapCard key={p.slug} project={p} pos={i + 1} Placeholder={Placeholder} />)}
      </div>
    </section>
  );
}

function LapCard({ project, pos, Placeholder }) {
  const isFeatured = project.featured;
  return (
    <article style={{ ...styles.lapCard, gridColumn: isFeatured ? 'span 2' : 'span 1' }}>
      <div style={styles.lapCardHead}>
        <div style={styles.lapPos}>P{String(pos).padStart(2, '0')}</div>
        <div>NO. {project.no}</div>
        <div style={{opacity: 0.5}}>{project.year}</div>
        <div style={{opacity: 0.5}}>· {project.cat}</div>
        <div style={{ flex: 1 }} />
        <div style={{opacity: 0.75}}>OPEN TELEMETRY →</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isFeatured ? '1.4fr 1fr' : '1fr', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <Placeholder ratio={isFeatured ? "16 / 10" : "16 / 9"} tone="navy" label={`${project.slug} hero`}
          style={{ borderRight: isFeatured ? '1px solid rgba(255,255,255,0.2)' : 'none' }} />
        <div style={styles.lapBody}>
          <div style={styles.lapTitle}>{project.title}</div>
          <div style={styles.lapSub}>{project.subtitle}</div>
          <p style={styles.lapDesc}>{project.description}</p>
          {project.stats && (
            <div style={styles.lapStats}>
              {project.stats.map((s, i) => (
                <div key={i} style={styles.lapStat}>
                  <div style={styles.lapStatV}>{s.value}</div>
                  <div style={styles.lapStatL}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
          <div style={styles.lapTags}>
            {project.tags.map(t => <span key={t} style={styles.lapTag}>{t}</span>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function AboutTerminal() {
  const { PERSONAL } = window;
  const grouped = PERSONAL.skills.reduce((acc, s) => { (acc[s.cat] = acc[s.cat] || []).push(s.name); return acc; }, {});
  return (
    <section style={styles.about}>
      <div style={styles.sectionHead}>
        <div style={styles.sectionTag}>◤ GRID 03</div>
        <h2 style={styles.sectionTitle}>Driver Bio</h2>
      </div>
      <div style={styles.aboutGrid}>
        <div style={styles.terminal}>
          <div style={styles.terminalBar}>
            <span style={{...styles.terminalDot, background: '#ff5f57'}} />
            <span style={{...styles.terminalDot, background: '#febc2e'}} />
            <span style={{...styles.terminalDot, background: '#28c840'}} />
            <span style={styles.terminalTitle}>~/oaj — whoami</span>
          </div>
          <div style={styles.terminalBody}>
            <div><span style={styles.prompt}>$</span> whoami</div>
            <div style={styles.terminalOut}>{PERSONAL.name} — {PERSONAL.title}</div>
            <div style={{ marginTop: 10 }}><span style={styles.prompt}>$</span> cat bio.md</div>
            <div style={{...styles.terminalOut, whiteSpace: 'pre-wrap', lineHeight: 1.55}}>{PERSONAL.bio}</div>
            <div style={{ marginTop: 10 }}><span style={styles.prompt}>$</span> ls skills/</div>
            {Object.entries(grouped).map(([cat, names]) => (
              <div key={cat} style={styles.terminalOut}>
                <span style={{color: 'var(--accent)'}}>{cat.toLowerCase()}/</span> {names.join(' · ')}
              </div>
            ))}
            <div style={{ marginTop: 10 }}>
              <span style={styles.prompt}>$</span><span style={styles.cursor}> █</span>
            </div>
          </div>
        </div>
        <div>
          <div style={styles.sidePanel}>
            <div style={styles.sidePanelTitle}>NOW</div>
            <ul style={styles.sidePanelList}>
              <li>Prototyping v2 of CADE with load-cell pedals</li>
              <li>Writing an ECU logger for my daily driver</li>
              <li>Looking for summer 2026 internships</li>
            </ul>
          </div>
          <div style={styles.sidePanel}>
            <div style={styles.sidePanelTitle}>TOOLBOX</div>
            <div style={styles.toolbox}>
              {['Fusion 360','Bambu X1C','Pro Micro','STM32','Neovim','Oscilloscope','Torque Wrench','Compression Tester'].map(t => (
                <span key={t} style={styles.tool}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterStrip() {
  const { PERSONAL } = window;
  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.footerTop}>
        <div>
          <div style={styles.sectionTag}>◤ GRID 04</div>
          <h2 style={{...styles.sectionTitle, marginBottom: 8}}>Box Box.</h2>
          <p style={styles.footerLead}>Hiring for a mech/EE/embedded internship? I'd love to talk.</p>
          <div style={styles.footerCTAs}>
            <a href={`mailto:${PERSONAL.email}`} style={styles.ctaPrimary}>
              <span>✉</span> {PERSONAL.email}
            </a>
            <a href={PERSONAL.github} style={styles.ctaGhost}>
              GITHUB / @{PERSONAL.githubUsername} ↗
            </a>
          </div>
        </div>
        <div style={styles.footerFlag}>
          <div style={{ display: 'flex', height: '100%' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {Array.from({ length: 12 }).map((_, j) => (
                  <div key={j} style={{ flex: 1, background: (i + j) % 2 === 0 ? '#0a0f1a' : '#f4f2ec' }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.footerBot}>
        <span>© 2026 OAJ SAINI · PIT WALL v1.0</span>
        <span>MADE IN AUSTIN, TX</span>
        <span>◉ RECRUITING READY</span>
      </div>
    </footer>
  );
}

const styles = {
  root: { background: '#0a0f1a', color: '#f4f2ec', minHeight: '100vh', fontFamily: "'Space Grotesk', sans-serif" },
  topStrip: {
    display: 'flex', justifyContent: 'space-between', padding: '10px 32px',
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase',
    background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)',
  },
  dot: { display: 'inline-block', width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', marginRight: 8, boxShadow: '0 0 10px var(--accent)' },
  hero: { position: 'relative', padding: '48px 32px 0', minHeight: '88vh', display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  heroGrid: { flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr 320px', gap: 40, alignItems: 'center' },
  heroLeft: { color: 'rgba(255,255,255,0.8)' },
  heroCenter: { textAlign: 'center' },
  heroRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', color: '#f4f2ec' },
  metaLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 18 },
  metaBlock: { borderTop: '1px solid rgba(255,255,255,0.15)' },
  metaLine: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.05em', textTransform: 'uppercase' },
  gaugeLabel: { display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginBottom: 6 },
  gaugeTrack: { display: 'flex' },
  nameStack: { display: 'flex', alignItems: 'baseline', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 'clamp(60px, 12vw, 180px)', lineHeight: 0.9, letterSpacing: '-0.04em' },
  nameFirst: { color: '#f4f2ec' },
  nameSlash: { color: 'var(--accent)', margin: '0 0.12em', fontStyle: 'italic' },
  nameLast: { color: '#f4f2ec', fontStyle: 'italic', fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: '1em' },
  tagline: { marginTop: 24, maxWidth: 640, marginInline: 'auto', fontSize: 19, lineHeight: 1.45, color: 'rgba(244,242,236,0.78)', fontStyle: 'italic', fontFamily: "'Instrument Serif', serif", fontWeight: 400 },
  cta: { marginTop: 36, display: 'flex', gap: 14, justifyContent: 'center' },
  ctaPrimary: { display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', background: 'var(--accent)', color: '#0a0a0a', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid var(--accent)' },
  ctaGhost: { display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', background: 'transparent', color: '#f4f2ec', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.35)' },
  ticker: { marginTop: 60, borderTop: '1px solid rgba(255,255,255,0.15)', borderBottom: '1px solid rgba(255,255,255,0.15)', padding: '10px 0', overflow: 'hidden', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' },
  tickerInner: { display: 'inline-block', animation: 'pw-ticker 50s linear infinite' },
  telemetry: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  telemetryCell: { padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.08)' },
  telemetryK: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 },
  telemetryV: { fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' },
  projectsSection: { padding: '80px 32px 40px' },
  sectionHead: { maxWidth: 1400, margin: '0 auto 40px' },
  sectionTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 },
  sectionTitle: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 500, letterSpacing: '-0.03em', margin: 0, marginBottom: 8 },
  sectionSub: { color: 'rgba(255,255,255,0.55)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' },
  lapGrid: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 },
  lapCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden' },
  lapCardHead: { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' },
  lapPos: { color: 'var(--accent)', fontWeight: 700 },
  lapBody: { padding: '28px 30px', display: 'flex', flexDirection: 'column', gap: 14 },
  lapTitle: { fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 },
  lapSub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)' },
  lapDesc: { fontSize: 15.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.75)', margin: 0 },
  lapStats: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', marginTop: 6, borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)' },
  lapStat: { padding: '14px 0', borderRight: '1px solid rgba(255,255,255,0.08)', paddingRight: 14 },
  lapStatV: { fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' },
  lapStatL: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginTop: 4 },
  lapTags: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  lapTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 8px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' },
  about: { padding: '80px 32px 40px' },
  aboutGrid: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 },
  terminal: { background: '#0a0f1a', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden' },
  terminalBar: { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  terminalDot: { width: 12, height: 12, borderRadius: '50%' },
  terminalTitle: { marginLeft: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.55)' },
  terminalBody: { padding: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.88)' },
  prompt: { color: 'var(--accent)', marginRight: 10 },
  terminalOut: { color: 'rgba(255,255,255,0.8)', paddingLeft: 22 },
  cursor: { color: 'var(--accent)', animation: 'pw-blink 1s steps(1) infinite' },
  sidePanel: { border: '1px solid rgba(255,255,255,0.12)', padding: '20px 22px', marginBottom: 16, background: 'rgba(255,255,255,0.02)' },
  sidePanelTitle: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 14 },
  sidePanelList: { margin: 0, paddingLeft: 16, fontSize: 14.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.82)' },
  toolbox: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  tool: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, padding: '5px 10px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' },
  footer: { padding: '80px 0 0', borderTop: '1px solid rgba(255,255,255,0.1)' },
  footerTop: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, padding: '0 32px 60px', alignItems: 'center' },
  footerLead: { fontSize: 18, color: 'rgba(255,255,255,0.72)', maxWidth: 520, lineHeight: 1.55, marginBottom: 24 },
  footerCTAs: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  footerFlag: { aspectRatio: '3 / 2', border: '1px solid rgba(255,255,255,0.15)', overflow: 'hidden' },
  footerBot: { display: 'flex', justifyContent: 'space-between', padding: '18px 32px', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', borderTop: '1px solid rgba(255,255,255,0.08)' },
};

if (!document.getElementById('pit-wall-keyframes')) {
  const style = document.createElement('style');
  style.id = 'pit-wall-keyframes';
  style.textContent = `@keyframes pw-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } } @keyframes pw-blink { 50% { opacity: 0; } }`;
  document.head.appendChild(style);
}

window.PitWall = PitWall;
