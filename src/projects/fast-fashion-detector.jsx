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
          <div style={pw.sectionTag}>◤ PROJECT 03 · SOFTWARE · 2023</div>
          <h1 style={{ ...rs(pw.sectionTitle, viewport, detailMobile.sectionTitle, detailTiny.sectionTitle), marginBottom:12 }}>Fast Fashion Detector</h1>
          <div style={pw.lapSub}>Amazon Sustainability Tool</div>
          <div style={{ ...rs(pw.lapStats, viewport, detailMobile.lapStats, detailTiny.lapStats), marginTop:36 }}>
            <div style={rs(pw.lapStat, viewport, detailMobile.lapStat)}><div style={pw.lapStatV}>200+</div><div style={pw.lapStatL}>Brands Indexed</div></div>
            <div style={rs(pw.lapStat, viewport, detailMobile.lapStat)}><div style={pw.lapStatV}>3L→7kL</div><div style={pw.lapStatL}>Water Range</div></div>
          </div>
        </div>
      </header>

      <section style={rs({ padding:'48px 32px' }, viewport, detailMobile.sectionMedia, detailTiny.sectionMedia)}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <Placeholder ratio="16 / 9" tone="navy" label="fast-fashion-detector media" />
        </div>
      </section>

      <section style={rs({ padding:'0 32px 56px' }, viewport, detailMobile.sectionText, detailTiny.sectionText)}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <div style={{ ...pw.sectionTag, marginBottom:10 }}>PROBLEM</div>
          <p style={{ ...pw.lapDesc, marginBottom:40 }}>
            Fashion's water footprint is structurally invisible at the point of purchase. A cotton T-shirt consumes 700 gallons to produce; a pair of jeans, 1,800 gallons. Amazon lists tens of thousands of fashion brands with no environmental disclosure — high-impact and low-impact brands appear identically in search results, giving shoppers no signal at the decision point.
          </p>
          <div style={{ ...pw.sectionTag, marginBottom:10 }}>APPROACH</div>
          <p style={pw.lapDesc}>
            A Python pipeline using BeautifulSoup4 and Selenium scraped Amazon's fashion category to extract brand names and listing metadata. Brands were classified into a four-tier sustainability scale (best / better / bad / worse) cross-referenced against published water-usage and environmental ratings data. The classification layer was packaged as a Chrome extension using a content script that injects CSS and DOM elements directly into Amazon product pages, surfacing color-coded sustainability banners inline — no redirect, no additional user action. The brand index is stored as a local JSON file, decoupled from display logic for independent updates.
          </p>
        </div>
      </section>

      <section style={rs({ padding:'0 32px 56px', borderTop:'1px solid rgba(255,255,255,0.08)' }, viewport, detailMobile.sectionBordered, detailTiny.sectionBordered)}>
        <div style={{ maxWidth:720, margin:'0 auto', paddingTop:40 }}>
          <div style={{ ...pw.sectionTag, marginBottom:14 }}>KEY FEATURES</div>
          <ul style={{ margin:'0 0 40px 0', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
            {[
              'Python + BS4 + Selenium pipeline for Amazon brand extraction and classification',
              'Four-tier sustainability scale across 200+ indexed brands',
              'Chrome extension with CSS injection — modifies live Amazon DOM without page reload',
              'Color-coded inline banners surfaced at point-of-purchase, no redirect required',
              'Decoupled JSON brand index and content script for independent maintainability',
            ].map((f,i) => (
              <li key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <span style={{ color:'var(--accent)', fontFamily:"'JetBrains Mono',monospace", fontSize:11, marginTop:3, flexShrink:0 }}>▸</span>
                <span style={{ fontSize:14.5, lineHeight:1.6, color:'rgba(255,255,255,0.78)' }}>{f}</span>
              </li>
            ))}
          </ul>
          <div style={{ ...pw.sectionTag, marginBottom:10 }}>RESULTS</div>
          <p style={{ ...pw.lapDesc, marginBottom:40 }}>
            Second place at hackathon. Rebuilt and deployed as a standalone Chrome extension covering 200+ brands across the 3L–7,000L per-garment water usage range. Early users reported changed purchasing behavior after seeing persistent red banners on habitual shopping pages.
          </p>
          <div style={{ ...pw.sectionTag, marginBottom:10 }}>WHAT I LEARNED</div>
          <p style={pw.lapDesc}>
            DOM scrapers break on site updates — robust CSS selectors and graceful fallbacks are a design requirement from day one, not a retrofit. The gap between a hackathon prototype and a deployable extension is almost entirely in error handling and edge cases; the core classification algorithm was unchanged between versions.
          </p>
        </div>
      </section>

      <section style={rs({ padding:'0 32px 56px', borderTop:'1px solid rgba(255,255,255,0.08)' }, viewport, detailMobile.sectionBordered, detailTiny.sectionBordered)}>
        <div style={{ maxWidth:720, margin:'0 auto', paddingTop:40 }}>
          <div style={{ ...pw.sectionTag, marginBottom:16 }}>TECH STACK</div>
          <div style={pw.lapTags}>
            {['Python','BeautifulSoup4','Selenium','Chrome Extension','CSS Injection','DOM Manipulation','JSON Data Store'].map(t => (
              <span key={t} style={pw.lapTag}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={rs({ padding:'0 32px 80px' }, viewport, detailMobile.sectionActions, detailTiny.sectionActions)}>
        <div style={rs({ maxWidth:720, margin:'0 auto', display:'flex', gap:12, flexWrap:'wrap' }, viewport, detailMobile.actionBar)}>
          <a href="#" style={rs(pw.ctaGhost, viewport, detailMobile.ctaButton)}>VIEW SOURCE →</a>
          <a href="#" style={rs(pw.ctaPrimary, viewport, detailMobile.ctaButton)}>DEMO ↗</a>
        </div>
      </section>

      <FooterStrip viewport={viewport} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ProjectPage />);
