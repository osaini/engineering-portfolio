const { useState, useEffect } = React;

function useViewportFlags() {
  const getFlags = () => ({
    isMobile: window.innerWidth <= 768,
    isTiny: window.innerWidth <= 480,
  });
  const [flags, setFlags] = useState(getFlags);

  useEffect(() => {
    const onResize = () => setFlags(getFlags());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return flags;
}

function rs(base, flags, mobile = {}, tiny = {}) {
  return { ...base, ...(flags.isMobile ? mobile : {}), ...(flags.isTiny ? tiny : {}) };
}

const PERSONAL = {
  name: "Oaj Saini",
  email: "oajsaini@gmail.com",
  github: "https://github.com/osaini",
  githubUsername: "osaini",
};

function Placeholder({ label = "project shot", ratio = "16 / 10", tone = "paper", children, style }) {
  const bg = tone === "ink" ? "var(--ink)" : tone === "navy" ? "var(--navy-2)" : "var(--paper-2)";
  const fg = tone === "ink" || tone === "navy" ? "var(--paper)" : "var(--ink)";
  const id = `stripes-${label.replace(/\W/g,'')}-${Math.random().toString(36).slice(2,7)}`;
  return (
    <div style={{ position: "relative", aspectRatio: ratio, background: bg, color: fg, overflow: "hidden", ...style }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.35 }} preserveAspectRatio="none">
        <defs>
          <pattern id={id} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7,
      }}>[ {label} ]</div>
      {children}
    </div>
  );
}

function TopStrip({ viewport = {} }) {
  if (viewport.isMobile) {
    return (
      <div style={rs(pw.topStrip, viewport, detailMobile.topStrip, detailTiny.topStrip)}>
        <span><span style={pw.dot} /> LIVE / OAJ.SAINI</span>
        <span>STATUS / <span style={{color:'var(--accent)'}}>BUILDING</span></span>
      </div>
    );
  }

  return (
    <div style={pw.topStrip}>
      <span><span style={pw.dot} /> LIVE · PIT WALL TELEMETRY</span>
      <span>SECTOR 04 · LAP 18 / 100</span>
      <span>DRIVER · <b>OAJ.SAINI</b></span>
      <span>STATUS / <span style={{color:'var(--accent)'}}>BUILDING</span></span>
    </div>
  );
}

function FooterStrip({ viewport = {} }) {
  return (
    <footer id="contact" style={rs(pw.footer, viewport, detailMobile.footer)}>
      <div style={rs(pw.footerTop, viewport, detailMobile.footerTop)}>
        <div>
          <div style={pw.sectionTag}>◤ GRID 04</div>
          <h2 style={{...rs(pw.sectionTitle, viewport, detailMobile.sectionTitle, detailTiny.sectionTitle),marginBottom:8}}>Box Box.</h2>
          <p style={pw.footerLead}>Hiring for a mech/EE/embedded internship? I'd love to talk.</p>
          <div style={rs(pw.footerCTAs, viewport, detailMobile.footerCTAs)}>
            <a href={`mailto:${PERSONAL.email}`} style={rs(pw.ctaPrimary, viewport, detailMobile.ctaButton)}><span>✉</span> {PERSONAL.email}</a>
            <a href={PERSONAL.github} style={rs(pw.ctaGhost, viewport, detailMobile.ctaButton)}>GITHUB / @{PERSONAL.githubUsername} ↗</a>
          </div>
        </div>
        <div style={rs(pw.footerFlag, viewport, detailMobile.footerFlag)}>
          <div style={{display:'flex',height:'100%'}}>
            {Array.from({length:8}).map((_,i)=>(
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column'}}>
                {Array.from({length:12}).map((_,j)=>(
                  <div key={j} style={{flex:1,background:(i+j)%2===0?'#0a0f1a':'#f4f2ec'}}/>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={rs(pw.footerBot, viewport, detailMobile.footerBot)}>
        <span>© 2026 OAJ SAINI · PIT WALL v1.0</span>
        <span>MADE IN AUSTIN, TX</span>
        <span>◉ RECRUITING READY</span>
      </div>
    </footer>
  );
}

function ModelViewer({ src, alt }) {
  const ref = React.useRef(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const host = ref.current;
    if (!host) return;
    setFailed(false);
    const el = document.createElement('model-viewer');
    el.setAttribute('src', src);
    el.setAttribute('alt', alt);
    el.setAttribute('auto-rotate', '');
    el.setAttribute('camera-controls', '');
    el.setAttribute('loading', 'lazy');
    el.style.cssText = 'width:100%;height:min(420px, 68vw);display:block;background:#0a0f1a;';
    // The .glb may not be deployed — degrade to a caption instead of a broken frame.
    el.addEventListener('error', () => setFailed(true));
    host.innerHTML = '';
    host.appendChild(el);
    return () => { host.innerHTML = ''; };
  }, [src, alt]);

  const frame = { width:'100%', height:'min(420px, 68vw)', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.1)' };

  return (
    <div style={frame}>
      <div ref={ref} style={{ width:'100%', height:'100%', display: failed ? 'none' : 'block' }} />
      {failed && (
        <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, textAlign:'center', padding:20 }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)' }}>3D model unavailable</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,0.55)', maxWidth:'40ch' }}>{alt}</div>
        </div>
      )}
    </div>
  );
}

const pw = {
  root: { background:'#0a0f1a', color:'#f4f2ec', minHeight:'100vh', fontFamily:"'Space Grotesk',sans-serif" },
  topStrip: { display:'flex', justifyContent:'space-between', padding:'10px 32px', fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(255,255,255,0.02)', borderBottom:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.65)' },
  dot: { display:'inline-block', width:6, height:6, background:'var(--accent)', borderRadius:'50%', marginRight:8, boxShadow:'0 0 10px var(--accent)' },
  sectionTag: { fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:10 },
  sectionTitle: { fontFamily:"'Space Grotesk',sans-serif", fontSize:'clamp(40px,6vw,68px)', fontWeight:500, letterSpacing:'-0.03em', margin:0, marginBottom:8 },
  lapSub: { fontFamily:"'JetBrains Mono',monospace", fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--accent)' },
  lapDesc: { fontSize:15.5, lineHeight:1.65, color:'rgba(255,255,255,0.75)', margin:0, fontFamily:"'Instrument Serif',serif", fontStyle:'italic' },
  lapStats: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(90px,1fr))', marginTop:0, borderTop:'1px solid rgba(255,255,255,0.12)', borderBottom:'1px solid rgba(255,255,255,0.12)' },
  lapStat: { padding:'14px 14px', borderRight:'1px solid rgba(255,255,255,0.08)' },
  lapStatV: { fontSize:22, fontWeight:600, letterSpacing:'-0.02em' },
  lapStatL: { fontFamily:"'JetBrains Mono',monospace", fontSize:10, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(255,255,255,0.5)', marginTop:4 },
  lapTags: { display:'flex', flexWrap:'wrap', gap:6 },
  lapTag: { fontFamily:"'JetBrains Mono',monospace", fontSize:10, textTransform:'uppercase', letterSpacing:'0.08em', padding:'4px 8px', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.85)' },
  ctaPrimary: { display:'inline-flex', alignItems:'center', gap:10, padding:'14px 22px', background:'var(--accent)', color:'#0a0a0a', fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none', border:'1px solid var(--accent)' },
  ctaGhost: { display:'inline-flex', alignItems:'center', gap:10, padding:'14px 22px', background:'transparent', color:'#f4f2ec', fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none', border:'1px solid rgba(255,255,255,0.35)' },
  footer: { padding:'80px 0 0', borderTop:'1px solid rgba(255,255,255,0.1)' },
  footerTop: { maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:40, padding:'0 32px 60px', alignItems:'center' },
  footerLead: { fontSize:18, color:'rgba(255,255,255,0.72)', maxWidth:520, lineHeight:1.55, marginBottom:24 },
  footerCTAs: { display:'flex', gap:12, flexWrap:'wrap' },
  footerFlag: { aspectRatio:'3 / 2', border:'1px solid rgba(255,255,255,0.15)', overflow:'hidden' },
  footerBot: { display:'flex', justifyContent:'space-between', padding:'18px 32px', fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', borderTop:'1px solid rgba(255,255,255,0.08)' },
};

const detailMobile = {
  topStrip: { padding:'10px 18px', gap:12, fontSize:10, letterSpacing:'0.07em', alignItems:'center' },
  nav: { padding:'12px 18px', lineHeight:1.45 },
  header: { padding:'48px 18px 36px' },
  sectionMedia: { padding:'34px 18px' },
  sectionText: { padding:'0 18px 44px' },
  sectionBordered: { padding:'0 18px 44px' },
  sectionActions: { padding:'0 18px 58px' },
  sectionTitle: { fontSize:'clamp(36px, 13vw, 54px)', lineHeight:1.02 },
  lapStats: { gridTemplateColumns:'repeat(2, minmax(0, 1fr))' },
  lapStat: { padding:'13px 12px' },
  actionBar: { flexDirection:'column', alignItems:'stretch' },
  ctaButton: { width:'100%', justifyContent:'center', minHeight:48, padding:'14px 16px', textAlign:'center', letterSpacing:'0.08em' },
  footer: { padding:'56px 0 0' },
  footerTop: { gridTemplateColumns:'1fr', gap:26, padding:'0 18px 44px' },
  footerCTAs: { flexDirection:'column', alignItems:'stretch' },
  footerFlag: { maxHeight:180 },
  footerBot: { flexDirection:'column', gap:8, padding:'16px 18px', lineHeight:1.5 },
};

const detailTiny = {
  topStrip: { padding:'9px 14px', fontSize:9, letterSpacing:'0.05em' },
  nav: { padding:'11px 14px' },
  header: { padding:'40px 14px 30px' },
  sectionMedia: { padding:'28px 14px' },
  sectionText: { padding:'0 14px 40px' },
  sectionBordered: { padding:'0 14px 40px' },
  sectionActions: { padding:'0 14px 52px' },
  sectionTitle: { fontSize:'clamp(33px, 14vw, 46px)' },
  lapStats: { gridTemplateColumns:'1fr' },
};

function ProjectPage() {
  const viewport = useViewportFlags();
  return (
    <div style={pw.root}>
      <TopStrip viewport={viewport} />

      <nav style={rs({ padding:'12px 32px', borderBottom:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.02)', fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase' }, viewport, detailMobile.nav, detailTiny.nav)}>
        <a href="../portfolio-redesign.html" style={{ color:'var(--accent)', textDecoration:'none' }}>← BACK TO PIT WALL</a>
      </nav>

      <header style={rs({ padding:'72px 32px 48px', borderBottom:'1px solid rgba(255,255,255,0.08)' }, viewport, detailMobile.header, detailTiny.header)}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={pw.sectionTag}>◤ PROJECT 01 · MECHATRONICS · 2025</div>
          <h1 style={{ ...rs(pw.sectionTitle, viewport, detailMobile.sectionTitle, detailTiny.sectionTitle), marginBottom:12 }}>Drone</h1>
          <div style={pw.lapSub}>9 Inch FPV Drone</div>
          <div style={{ ...rs(pw.lapStats, viewport, detailMobile.lapStats, detailTiny.lapStats), marginTop:36 }}>
            <div style={rs(pw.lapStat, viewport, detailMobile.lapStat)}><div style={pw.lapStatV}>9"</div><div style={pw.lapStatL}>Props</div></div>
            <div style={rs(pw.lapStat, viewport, detailMobile.lapStat)}><div style={pw.lapStatV}>{"<10ms"}</div><div style={pw.lapStatL}>RC Latency</div></div>
            <div style={rs(pw.lapStat, viewport, detailMobile.lapStat)}><div style={pw.lapStatV}>CNC'd</div><div style={pw.lapStatL}>Frame Parts</div></div>
          </div>
        </div>
      </header>

      <section style={rs({ padding:'48px 32px' }, viewport, detailMobile.sectionMedia, detailTiny.sectionMedia)}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <Placeholder ratio="16 / 9" tone="navy" label="fpv-drone media" />
        </div>
      </section>

      <section style={rs({ padding:'0 32px 56px' }, viewport, detailMobile.sectionText, detailTiny.sectionText)}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <div style={{ ...pw.sectionTag, marginBottom:10 }}>PROBLEM</div>
          <p style={{ ...pw.lapDesc, marginBottom:40 }}>
            Consumer FPV systems sacrifice configurability for convenience. Closed video links cap transmit power and lock hardware to specific receivers; racing frames optimize for low weight over stiffness and field repairability. Building for range-priority missions — sustained flight to a target location, stable hover, and reliable HD return link — requires fundamentally different component selection than a racing quad.
          </p>
          <div style={{ ...pw.sectionTag, marginBottom:10 }}>APPROACH</div>
          <p style={pw.lapDesc}>
            The frame uses CNC-machined 6061 aluminum arms and motor mounts, chosen over carbon fiber for improved torsional stiffness and field repairability without specialist tools. OpenHD transmits compressed digital HD video over a configurable RF link — frequency band and transmit power are software-tunable with no proprietary receiver pairing. ELRS handles RC control via 900MHz spread-spectrum at sub-10ms round-trip latency, with built-in failsafe and telemetry passthrough. A 2-axis brushless gimbal with onboard IMU feedback keeps the camera stabilized during translational movement and attitude changes.
          </p>
        </div>
      </section>

      <section style={rs({ padding:'0 32px 40px' }, viewport, detailMobile.sectionText, detailTiny.sectionText)}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ ...pw.sectionTag, marginBottom:16 }}>3D MODEL</div>
          <ModelViewer src="../assets/models/fpv-drone.glb" alt="9-inch FPV drone 3D model" />
        </div>
      </section>

      <section style={rs({ padding:'0 32px 56px', borderTop:'1px solid rgba(255,255,255,0.08)' }, viewport, detailMobile.sectionBordered, detailTiny.sectionBordered)}>
        <div style={{ maxWidth:720, margin:'0 auto', paddingTop:40 }}>
          <div style={{ ...pw.sectionTag, marginBottom:14 }}>KEY FEATURES</div>
          <ul style={{ margin:'0 0 40px 0', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
            {[
              'CNC-machined 6061 aluminum frame — higher torsional stiffness, field-repairable without specialist tooling',
              'OpenHD video link — open-source, frequency-agnostic, configurable transmit power',
              'ELRS 900MHz radio — sub-10ms control latency, spread-spectrum interference resistance',
              '2-axis IMU-stabilized brushless gimbal for stable footage during attitude changes',
              '9" props optimized for range and hover efficiency over racing agility',
            ].map((f,i) => (
              <li key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <span style={{ color:'var(--accent)', fontFamily:"'JetBrains Mono',monospace", fontSize:11, marginTop:3, flexShrink:0 }}>▸</span>
                <span style={{ fontSize:14.5, lineHeight:1.6, color:'rgba(255,255,255,0.78)' }}>{f}</span>
              </li>
            ))}
          </ul>
          <div style={{ ...pw.sectionTag, marginBottom:10 }}>RESULTS</div>
          <p style={{ ...pw.lapDesc, marginBottom:40 }}>
            Control latency measured below 10ms round-trip over tested range. CNC-machined frame survived multiple hard landings without structural failure. The platform was deployed for aerial monitoring at SenseMesh.ai, tracking vehicle speeds from altitude over intersections — validating range-priority design decisions in a real-world operational context.
          </p>
          <div style={{ ...pw.sectionTag, marginBottom:10 }}>WHAT I LEARNED</div>
          <p style={pw.lapDesc}>
            RF link architecture is the system ceiling for range missions — frequency, modulation, antenna polarization, and transmit power interact, and adjusting one requires re-evaluating the others. Mission-specific platforms require defining the operational envelope first and working backwards to component selection, not forward from available hardware.
          </p>
        </div>
      </section>

      <section style={rs({ padding:'0 32px 56px', borderTop:'1px solid rgba(255,255,255,0.08)' }, viewport, detailMobile.sectionBordered, detailTiny.sectionBordered)}>
        <div style={{ maxWidth:720, margin:'0 auto', paddingTop:40 }}>
          <div style={{ ...pw.sectionTag, marginBottom:16 }}>TECH STACK</div>
          <div style={pw.lapTags}>
            {['OpenHD','ELRS 900MHz','CNC 6061 Aluminum','Brushless Gimbal','IMU Stabilization','Embedded Systems','FPV'].map(t => (
              <span key={t} style={pw.lapTag}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={rs({ padding:'0 32px 80px' }, viewport, detailMobile.sectionActions, detailTiny.sectionActions)}>
        <div style={rs({ maxWidth:720, margin:'0 auto', display:'flex', gap:12, flexWrap:'wrap' }, viewport, detailMobile.actionBar)}>
          <a href="#" style={rs(pw.ctaGhost, viewport, detailMobile.ctaButton)}>VIEW SOURCE →</a>
        </div>
      </section>

      <FooterStrip viewport={viewport} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ProjectPage />);
