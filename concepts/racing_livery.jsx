function RacingLivery() {
  return (
    <div style={rlStyles.root}>
      <LiveryHeader />
      <LiveryHero />
      <StartGrid />
      <FeatureStory />
      <AboutColumn />
      <PaddockContact />
    </div>
  );
}

function LiveryHeader() {
  return (
    <header style={rlStyles.header}>
      <div style={rlStyles.mark}>
        <div style={rlStyles.markNo}>#07</div>
        <div>
          <div style={rlStyles.markName}>SAINI</div>
          <div style={rlStyles.markSub}>AUSTIN · TX</div>
        </div>
      </div>
      <nav style={rlStyles.nav}>
        <a href="#grid" style={rlStyles.navLink}>Work</a>
        <a href="#feature" style={rlStyles.navLink}>Feature</a>
        <a href="#about" style={rlStyles.navLink}>About</a>
        <a href="#contact" style={rlStyles.navLink}>Contact</a>
      </nav>
      <div style={rlStyles.headerMeta}>
        <div>ISSUE 01 / '26</div>
        <div style={{color: 'var(--accent)'}}>◉ OPEN FOR INTERNSHIPS</div>
      </div>
    </header>
  );
}

function LiveryHero() {
  return (
    <section style={rlStyles.hero}>
      <DiagonalStripes />
      <div style={rlStyles.heroContent}>
        <div style={rlStyles.heroKicker}>
          <span style={rlStyles.heroKickerDot} />
          PORTFOLIO · 2026 SEASON
        </div>
        <h1 style={rlStyles.heroTitle}>
          <span style={rlStyles.heroFirst}>Oaj</span>
          <br />
          <span style={rlStyles.heroLast}>Saini</span>
          <span style={rlStyles.heroAmp}>&amp;</span>
          <span style={rlStyles.heroDept}>the garage</span>
        </h1>
        <div style={rlStyles.heroGrid}>
          <p style={rlStyles.heroLead}>
            Student engineer at UT Austin building things that <em>move</em>, <em>think</em>, and <em>break the rules of cost</em>. Equal parts oily rag, soldering iron, and text editor.
          </p>
          <div style={rlStyles.heroMeta}>
            <div style={rlStyles.heroMetaRow}><span>DRIVER</span><b>Oaj Saini</b></div>
            <div style={rlStyles.heroMetaRow}><span>TEAM</span><b>UT Austin</b></div>
            <div style={rlStyles.heroMetaRow}><span>CLASS</span><b>Mechatronics · Automotive</b></div>
            <div style={rlStyles.heroMetaRow}><span>SEASON</span><b>Summer '26 · avail.</b></div>
            <div style={rlStyles.heroMetaRow}><span>LIVERY</span><b>No. 07 · orange</b></div>
          </div>
        </div>
      </div>
      <div style={rlStyles.heroStats}>
        <Stat v="04" l="Projects Shipped" />
        <Stat v="$46" l="Lowest BOM · CADE" />
        <Stat v="400+" l="Hrs on Sim" />
        <Stat v="1" l="Engine Rebuilt" />
      </div>
    </section>
  );
}

function Stat({ v, l }) {
  return (
    <div style={rlStyles.stat}>
      <div style={rlStyles.statV}>{v}</div>
      <div style={rlStyles.statL}>{l}</div>
    </div>
  );
}

function DiagonalStripes() {
  return (
    <div style={rlStyles.stripesWrap} aria-hidden="true">
      <div style={{...rlStyles.stripe, top: '8%', width: '180%', left: '-40%', height: 22, background: 'var(--ink)'}} />
      <div style={{...rlStyles.stripe, top: '11.2%', width: '180%', left: '-40%', height: 10, background: 'var(--accent)'}} />
      <div style={{...rlStyles.stripe, top: '13%', width: '180%', left: '-40%', height: 4, background: 'var(--ink)'}} />
      <div style={{...rlStyles.stripe, bottom: '14%', width: '180%', left: '-40%', height: 4, background: 'var(--ink)'}} />
      <div style={{...rlStyles.stripe, bottom: '11%', width: '180%', left: '-40%', height: 10, background: 'var(--accent)'}} />
      <div style={{...rlStyles.stripe, bottom: '8%', width: '180%', left: '-40%', height: 22, background: 'var(--ink)'}} />
    </div>
  );
}

function StartGrid() {
  const { PROJECTS, Placeholder } = window;
  return (
    <section id="grid" style={rlStyles.gridSection}>
      <div style={rlStyles.sectionHead}>
        <div style={rlStyles.sectionKicker}>§ 02 — THE STARTING GRID</div>
        <h2 style={rlStyles.sectionTitle}>Selected <em>work</em>.</h2>
        <p style={rlStyles.sectionSub}>
          Four builds spanning mechatronics, mechanical rebuild, and software.
          Mix of solo projects and one-car teams.
        </p>
      </div>
      <div style={rlStyles.gridWrap}>
        {PROJECTS.map((p, i) => <GridTile key={p.slug} project={p} pos={i + 1} Placeholder={Placeholder} />)}
      </div>
    </section>
  );
}

function GridTile({ project, pos, Placeholder }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      style={{ ...rlStyles.tile, transform: hover ? 'translateY(-4px)' : 'translateY(0)' }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <div style={rlStyles.tileNoWrap}>
        <div style={rlStyles.tileNoBox}>
          <div style={rlStyles.tileNoSmall}>NO.</div>
          <div style={rlStyles.tileNo}>{project.no}</div>
        </div>
        <div style={rlStyles.tileCat}>{project.cat} · {project.year}</div>
      </div>
      <div style={rlStyles.tileImageWrap}>
        <Placeholder ratio="4 / 3" label={project.slug} tone="paper" />
        <div style={rlStyles.tileStripe} />
      </div>
      <div style={rlStyles.tileBody}>
        <h3 style={rlStyles.tileTitle}>
          {project.title} <span style={rlStyles.tileTitleEm}>— <em>{project.subtitle}</em></span>
        </h3>
        <p style={rlStyles.tileDesc}>{project.description}</p>
        <div style={rlStyles.tileFoot}>
          <div style={rlStyles.tileTags}>
            {project.tags.slice(0, 3).map(t => <span key={t} style={rlStyles.tileTag}>{t}</span>)}
          </div>
          <div style={rlStyles.tileGo}>
            <span style={{ display: 'inline-block', transform: hover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.15s' }}>↗</span>
            {' '}VIEW
          </div>
        </div>
      </div>
    </article>
  );
}

function FeatureStory() {
  const { PROJECTS, Placeholder } = window;
  const cade = PROJECTS[0];
  return (
    <section id="feature" style={rlStyles.feature}>
      <div style={rlStyles.featureInner}>
        <div style={rlStyles.featureHead}>
          <div style={rlStyles.sectionKicker}>§ 03 — COVER STORY</div>
          <h2 style={rlStyles.featureTitle}>
            A driving simulator<br />
            for under <span style={rlStyles.featureTitleEm}>fifty dollars.</span>
          </h2>
        </div>
        <div style={rlStyles.featureLayout}>
          <div style={rlStyles.featureImage}>
            <Placeholder ratio="4 / 5" label="cade hero render" tone="ink" />
          </div>
          <div style={rlStyles.featureBody}>
            <p style={rlStyles.featureLead}>
              <span style={rlStyles.dropCap}>C</span>ADE — the Computer Aided Driving Emulator — is a fully 3D-printed rig with a force-resistant steering column, hall-sensor pedals, and an ATmega-based controller. Total raw cost: <b>$46.32</b>.
            </p>
            <p style={rlStyles.featureBodyP}>
              The goal wasn't to beat commercial rigs. It was to prove that useful engineering can live in a budget a student can actually afford — and still log 400+ hours of real driving practice on it.
            </p>
            <div style={rlStyles.featureStats}>
              {cade.stats.map(s => (
                <div key={s.label} style={rlStyles.featureStat}>
                  <div style={rlStyles.featureStatV}>{s.value}</div>
                  <div style={rlStyles.featureStatL}>{s.label}</div>
                </div>
              ))}
            </div>
            <a href="#" style={rlStyles.featureCTA}>Read the build log ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutColumn() {
  const { PERSONAL } = window;
  return (
    <section id="about" style={rlStyles.about}>
      <div style={rlStyles.aboutInner}>
        <div style={rlStyles.aboutLeft}>
          <div style={rlStyles.sectionKicker}>§ 04 — THE DRIVER</div>
          <h2 style={rlStyles.aboutTitle}>
            <em>Curiosity</em>,<br />not capital.
          </h2>
        </div>
        <div style={rlStyles.aboutRight}>
          <p style={rlStyles.aboutP}>{PERSONAL.bio}</p>
          <p style={rlStyles.aboutP}>
            I like problems where the interesting work happens in the overlap between disciplines — firmware for a mechanical system, software that drives physical hardware, optimization that saves grams and dollars at once.
          </p>
          <div style={rlStyles.skillGrid}>
            <SkillBlock cat="Fab" items={['3D Printing', 'CAD (Fusion 360)', 'Bambu X1C']} />
            <SkillBlock cat="Electronics" items={['Arduino', 'STM32', 'PCB Design']} />
            <SkillBlock cat="Software" items={['Python', 'TypeScript', 'Electron']} />
            <SkillBlock cat="Mechanical" items={['Engine Rebuild', 'Compression', 'Torque Spec']} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBlock({ cat, items }) {
  return (
    <div style={rlStyles.skillBlock}>
      <div style={rlStyles.skillCat}>{cat}</div>
      <ul style={rlStyles.skillList}>
        {items.map(i => <li key={i} style={rlStyles.skillItem}>{i}</li>)}
      </ul>
    </div>
  );
}

function PaddockContact() {
  const { PERSONAL } = window;
  return (
    <section id="contact" style={rlStyles.paddock}>
      <div style={rlStyles.paddockStripes} />
      <div style={rlStyles.paddockInner}>
        <div style={{...rlStyles.sectionKicker, color: 'rgba(255,255,255,0.7)'}}>§ 05 — ENTER PADDOCK</div>
        <h2 style={rlStyles.paddockTitle}>
          Let's <em>build</em><br />something.
        </h2>
        <p style={rlStyles.paddockLead}>
          Looking for a summer 2026 internship in mechanical, EE, embedded, or anywhere those three overlap. Always open to collaborators and fellow makers.
        </p>
        <div style={rlStyles.paddockCTAs}>
          <a href={`mailto:${PERSONAL.email}`} style={rlStyles.paddockPrimary}>
            {PERSONAL.email}<span style={{marginLeft: 14}}>↗</span>
          </a>
          <a href={PERSONAL.github} style={rlStyles.paddockGhost}>
            github.com/@{PERSONAL.githubUsername}
          </a>
        </div>
        <div style={rlStyles.paddockFooter}>
          <div>© 2026 Oaj Saini — Racing Livery ed.</div>
          <div>Issue 01 / Spring '26</div>
          <div>Austin, TX · 78712</div>
        </div>
      </div>
    </section>
  );
}

const rlStyles = {
  root: { background: 'var(--paper)', color: 'var(--ink)', fontFamily: "'Space Grotesk', sans-serif", position: 'relative', overflow: 'hidden' },
  header: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '22px 36px', gap: 40, borderBottom: '1.5px solid var(--ink)', position: 'relative', zIndex: 2, background: 'var(--paper)' },
  mark: { display: 'flex', gap: 12, alignItems: 'center' },
  markNo: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 42, fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--accent)', lineHeight: 0.9 },
  markName: { fontSize: 17, fontWeight: 700, letterSpacing: '0.02em' },
  markSub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', color: 'var(--muted)', letterSpacing: '0.12em' },
  nav: { display: 'flex', gap: 28, justifyContent: 'center' },
  navLink: { textDecoration: 'none', color: 'var(--ink)', fontSize: 15, fontWeight: 500, borderBottom: '1px solid transparent', paddingBottom: 2 },
  headerMeta: { justifySelf: 'end', textAlign: 'right', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', lineHeight: 1.7 },
  hero: { position: 'relative', padding: '80px 36px 40px', minHeight: '80vh', overflow: 'hidden' },
  stripesWrap: { position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' },
  stripe: { position: 'absolute', transform: 'rotate(-6deg)', transformOrigin: 'center' },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto' },
  heroKicker: { display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--paper)', padding: '6px 14px', border: '1.5px solid var(--ink)' },
  heroKickerDot: { width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' },
  heroTitle: { margin: '40px 0 36px', fontSize: 'clamp(76px, 14vw, 220px)', lineHeight: 0.88, fontWeight: 600, letterSpacing: '-0.05em' },
  heroFirst: { color: 'var(--ink)' },
  heroLast: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)', letterSpacing: '-0.03em' },
  heroAmp: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)', fontSize: '0.58em', margin: '0 0.12em 0 0.18em', verticalAlign: 'super' },
  heroDept: { fontSize: '0.42em', fontWeight: 400, letterSpacing: '0.02em', color: 'var(--muted)', verticalAlign: 'super' },
  heroGrid: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'start', marginTop: 8 },
  heroLead: { fontSize: 22, lineHeight: 1.45, color: 'var(--ink)', maxWidth: 640, margin: 0, fontWeight: 400 },
  heroMeta: { background: 'var(--paper)', border: '1.5px solid var(--ink)', padding: '18px 22px' },
  heroMetaRow: { display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px dashed var(--line-strong)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' },
  heroStats: { position: 'relative', zIndex: 2, maxWidth: 1400, margin: '60px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)' },
  stat: { padding: '24px 28px', borderRight: '1px solid var(--line-strong)' },
  statV: { fontSize: 54, letterSpacing: '-0.04em', lineHeight: 0.95, fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' },
  statL: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginTop: 6 },
  gridSection: { padding: '120px 36px 80px' },
  sectionHead: { maxWidth: 1400, margin: '0 auto 60px' },
  sectionKicker: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 16 },
  sectionTitle: { fontSize: 'clamp(56px, 8vw, 112px)', fontWeight: 500, letterSpacing: '-0.04em', margin: 0, lineHeight: 0.95 },
  sectionSub: { marginTop: 20, maxWidth: 560, fontSize: 17, lineHeight: 1.55, color: 'var(--muted)' },
  gridWrap: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24 },
  tile: { gridColumn: 'span 6', background: 'var(--paper)', border: '1.5px solid var(--ink)', transition: 'transform 0.2s ease', display: 'flex', flexDirection: 'column' },
  tileNoWrap: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1.5px solid var(--ink)' },
  tileNoBox: { display: 'flex', alignItems: 'baseline', gap: 8 },
  tileNoSmall: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)' },
  tileNo: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1 },
  tileCat: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)' },
  tileImageWrap: { position: 'relative' },
  tileStripe: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, background: 'var(--accent)' },
  tileBody: { padding: '24px 26px 26px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 },
  tileTitle: { fontSize: 30, fontWeight: 600, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.05 },
  tileTitleEm: { fontSize: 18, color: 'var(--muted)', fontWeight: 400, fontFamily: "'Instrument Serif', serif" },
  tileDesc: { fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink)', opacity: 0.78, margin: 0 },
  tileFoot: { marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 18, borderTop: '1px dashed var(--line-strong)' },
  tileTags: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  tileTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 8px', border: '1px solid var(--line-strong)', color: 'var(--ink)' },
  tileGo: { fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)' },
  feature: { padding: '100px 36px', background: 'var(--paper-2)', borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)' },
  featureInner: { maxWidth: 1400, margin: '0 auto' },
  featureHead: { marginBottom: 60 },
  featureTitle: { fontSize: 'clamp(56px, 8vw, 112px)', fontWeight: 500, letterSpacing: '-0.04em', margin: 0, lineHeight: 0.95 },
  featureTitleEm: { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' },
  featureLayout: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' },
  featureImage: { border: '1.5px solid var(--ink)' },
  featureBody: { paddingTop: 20 },
  featureLead: { fontSize: 22, lineHeight: 1.5, margin: 0, fontWeight: 400 },
  dropCap: { float: 'left', fontFamily: "'Instrument Serif', serif", fontSize: 84, lineHeight: 0.85, fontWeight: 400, color: 'var(--accent)', marginRight: 12, marginTop: 6 },
  featureBodyP: { fontSize: 17, lineHeight: 1.65, color: 'var(--ink)', opacity: 0.82, marginTop: 24 },
  featureStats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 32, borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)' },
  featureStat: { padding: '20px 0', borderRight: '1px solid var(--line-strong)', paddingRight: 20 },
  featureStatV: { fontSize: 36, letterSpacing: '-0.03em', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)', lineHeight: 1 },
  featureStatL: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginTop: 6 },
  featureCTA: { display: 'inline-block', marginTop: 32, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)', textDecoration: 'none', borderBottom: '2px solid var(--accent)', paddingBottom: 4 },
  about: { padding: '120px 36px' },
  aboutInner: { maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80 },
  aboutLeft: { position: 'sticky', top: 100, alignSelf: 'start' },
  aboutTitle: { fontSize: 'clamp(60px, 8vw, 120px)', fontWeight: 500, letterSpacing: '-0.04em', margin: 0, lineHeight: 0.9 },
  aboutRight: {},
  aboutP: { fontSize: 20, lineHeight: 1.55, marginBottom: 24, fontWeight: 400 },
  skillGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 40, borderTop: '1.5px solid var(--ink)', borderLeft: '1.5px solid var(--ink)' },
  skillBlock: { borderRight: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)', padding: '20px 22px' },
  skillCat: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 12 },
  skillList: { margin: 0, padding: 0, listStyle: 'none' },
  skillItem: { fontSize: 15, lineHeight: 1.6, paddingLeft: 16, position: 'relative' },
  paddock: { position: 'relative', background: 'var(--ink)', color: 'var(--paper)', padding: '120px 36px 40px', overflow: 'hidden' },
  paddockStripes: { position: 'absolute', top: 0, left: 0, right: 0, height: 14, background: `repeating-linear-gradient(90deg, var(--accent) 0 40px, var(--paper) 40px 80px)` },
  paddockInner: { position: 'relative', maxWidth: 1400, margin: '0 auto' },
  paddockTitle: { fontSize: 'clamp(72px, 10vw, 160px)', fontWeight: 500, letterSpacing: '-0.04em', margin: '20px 0 40px', lineHeight: 0.9 },
  paddockLead: { fontSize: 22, lineHeight: 1.5, maxWidth: 640, color: 'rgba(244,242,236,0.8)', marginBottom: 48 },
  paddockCTAs: { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 120 },
  paddockPrimary: { display: 'inline-flex', alignItems: 'center', padding: '22px 32px', background: 'var(--accent)', color: '#0a0a0a', fontSize: 18, fontWeight: 600, textDecoration: 'none' },
  paddockGhost: { display: 'inline-flex', alignItems: 'center', padding: '22px 32px', background: 'transparent', color: 'var(--paper)', fontSize: 18, fontWeight: 500, textDecoration: 'none', border: '1.5px solid rgba(244,242,236,0.3)' },
  paddockFooter: { display: 'flex', justifyContent: 'space-between', paddingTop: 24, borderTop: '1px solid rgba(244,242,236,0.15)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(244,242,236,0.55)' },
};

window.RacingLivery = RacingLivery;
