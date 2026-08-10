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

/* ── Data ─────────────────────────────────────── */

const PERSONAL = {
  name: "Oaj Saini",
  first: "Oaj",
  last: "Saini",
  title: "Student at UT Austin · Maker · Builder",
  tagline: "I build things that move, think, and break the rules of cost.",
  bio: "I believe engineering doesn't have to be expensive to be impactful. From 3D-printed driving simulators to engine rebuilds, I design solutions that are accessible, hands-on, and built to prove a point — that great engineering starts with curiosity, not capital.",
  email: "oajsaini@gmail.com",
  github: "https://github.com/osaini",
  githubUsername: "osaini",
  location: "Austin, TX",
  skills: [
    { name: "3D Printing", cat: "Fab" },
    { name: "CAD", cat: "Fab" },
    { name: "Arduino", cat: "Electronics" },
    { name: "Embedded Systems", cat: "Electronics" },
    { name: "Python", cat: "Software" },
    { name: "Web Dev", cat: "Software" },
    { name: "Electron", cat: "Software" },
    { name: "Automotive", cat: "Mechanical" },
  ],
};

const PROJECTS = [
  {
    slug: "fpv-drone", no: "01",
    title: "Drone", subtitle: "9 Inch FPV Drone",
    description: "A production-ready 9-inch FPV drone engineered from the ground up for range, reliability, and precision. OpenHD handles long-range digital HD telemetry over a robust RF link; ELRS delivers sub-10ms control latency for responsive handling at distance. The frame integrates CNC-machined aluminum arms and standoffs — light enough to matter, stiff enough to survive. A 2-axis gimbal driven by an onboard IMU keeps the camera locked and level at speed.",
    tags: ["OpenHD", "ELRS", "CNC", "FPV", "Embedded"], cat: "Mechatronics",
    featured: true, year: "2025",
    stats: [
      { value: "9\"",    label: "Props" },
      { value: "<10ms",  label: "RC Latency" },
      { value: "CNC'd",  label: "Frame Parts" },
    ],
  },
  {
    slug: "cade", no: "02",
    title: "C.A.D.E", subtitle: "Computer Aided Driving Emulator",
    description: "A 3D-printed driving simulator that recreates realistic steering, pedal feel and telemetry — built entirely from off-the-shelf electronics for under $50.",
    tags: ["Arduino", "3D Printing", "CAD", "Embedded"], cat: "Mechatronics",
    featured: true, year: "2024",
    stats: [
      { value: "400+",   label: "Hours Driven" },
      { value: "20+",    label: "People Impacted" },
      { value: "$46.32", label: "Raw Cost" },
    ],
  },
  {
    slug: "fast-fashion-detector", no: "03",
    title: "Fast Fashion Detector", subtitle: "Amazon Sustainability Tool",
    description: "A Python tool that classifies fast fashion brands by water usage, helping shoppers make informed purchasing decisions directly on Amazon product pages.",
    tags: ["Python", "Sustainability", "Data"], cat: "Software",
    featured: false, year: "2023",
    video: "images/fast-fashion/video1.mp4",
    stats: [
      { value: "200+",   label: "Brands Indexed" },
      { value: "3L→7kL", label: "Water Range" },
    ],
  },
  {
    slug: "engine-rebuild", no: "04",
    title: "Engine Rebuild", subtitle: "Hyundai Accent 1.6L Restoration",
    description: "Full teardown, inspection, and rebuild of a Hyundai Accent 1.6L. Restored compression across all cylinders and eliminated a persistent misfire.",
    tags: ["Automotive", "Mechanical"], cat: "Mechanical",
    featured: false, year: "2024",
    photos: [
      "images/engine-rebuild/img1.jpg",
      "images/engine-rebuild/img2.jpg",
      "images/engine-rebuild/img3.jpg",
      "images/engine-rebuild/img4.jpg",
    ],
    stats: [
      { value: "4",       label: "Cylinders" },
      { value: "142 psi", label: "Restored Comp." },
      { value: "80+ hrs", label: "Shop Time" },
    ],
  },
];

function ProjectVideo({ src, ratio = "16 / 9", label = "Project demo video" }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ position: "relative", aspectRatio: ratio, background: "#000", overflow: "hidden" }}>
      <video
        ref={ref}
        src={src}
        loop
        muted
        playsInline
        preload="none"
        aria-label={label}
        title={label}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function PhotoCarousel({ photos, ratio = "16 / 9", autoInterval = 4000, label = "Project" }) {
  const [idx, setIdx] = React.useState(0);
  const [loaded, setLoaded] = React.useState({});

  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % photos.length), autoInterval);
    return () => clearInterval(t);
  }, [photos.length, autoInterval]);

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + photos.length) % photos.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % photos.length); };

  return (
    <div style={{ position: "relative", aspectRatio: ratio, background: "#000", overflow: "hidden" }}>
      {photos.map((src, i) => (
        <img
          key={src}
          src={src}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(l => ({ ...l, [i]: true }))}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            imageOrientation: "from-image",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.5s ease",
            willChange: "opacity",
          }}
          alt={`${label} — photo ${i + 1} of ${photos.length}`}
        />
      ))}
      {/* prev / next buttons */}
      <button onClick={prev} style={carouselBtn("left")} aria-label="Previous">&#8592;</button>
      <button onClick={next} style={carouselBtn("right")} aria-label="Next">&#8594;</button>
      {/* dot indicators */}
      <div style={{ position:"absolute", bottom:10, left:0, right:0, display:"flex", justifyContent:"center", gap:6, pointerEvents:"none" }}>
        {photos.map((_,i) => (
          <div key={i} style={{ width:6, height:6, borderRadius:"50%", background: i===idx ? "#fff" : "rgba(255,255,255,0.4)", transition:"background 0.3s" }}/>
        ))}
      </div>
    </div>
  );
}

function carouselBtn(side) {
  return {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    [side]: 10,
    background: "rgba(0,0,0,0.45)", border: "none", color: "#fff",
    width: 32, height: 32, borderRadius: "50%",
    fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 2, lineHeight: 1,
  };
}

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

/* ── Pit Wall ─────────────────────────────────── */

function PitWall() {
  const viewport = useViewportFlags();
  return (
    <div style={pw.root}>
      <TopStrip viewport={viewport} />
      <Hero viewport={viewport} />
      <Ticker />
      <TelemetryBar viewport={viewport} />
      <ProjectStack viewport={viewport} />
      <AboutTerminal viewport={viewport} />
      <FooterStrip viewport={viewport} />
    </div>
  );
}

function TopStrip({ viewport = {} }) {
  if (viewport.isMobile) {
    return (
      <div style={rs(pw.topStrip, viewport, mobile.topStrip, mobileTiny.topStrip)}>
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

function Hero({ viewport }) {
  return (
    <section style={rs(pw.hero, viewport, mobile.hero, mobileTiny.hero)}>
      <Corner tl /><Corner tr /><Corner bl /><Corner br />
      <div style={rs(pw.heroGrid, viewport, mobile.heroGrid, mobileTiny.heroGrid)}>
        <div style={rs(pw.heroLeft, viewport, mobile.heroLeft)}>
          <div style={pw.metaLabel}>◣ DRIVER PROFILE · 2026</div>
          <div style={pw.metaBlock}>
            <div style={pw.metaLine}><span>LOC</span><b>{PERSONAL.location}</b></div>
            <div style={pw.metaLine}><span>AFFIL</span><b>UT AUSTIN</b></div>
            <div style={pw.metaLine}><span>CLASS</span><b>MAKER / BUILDER</b></div>
            <div style={pw.metaLine}><span>CONTACT</span><b>oajsaini@gmail.com</b></div>
          </div>
          <Gauge label="BUILDS / YR"      value={12} max={15}  unit="" />
          <Gauge label="COST EFFICIENCY"  value={92} max={100} unit="%" />
        </div>

        <div style={rs(pw.heroCenter, viewport, mobile.heroCenter)}>
          <h1 style={rs(pw.nameStack, viewport, mobile.nameStack, mobileTiny.nameStack)}>
            <span style={pw.nameFirst}>{PERSONAL.first}</span>
            <span style={pw.nameSlash} aria-hidden="true">/</span>
            <span style={pw.nameLast}>{PERSONAL.last}</span>
          </h1>
          <div style={rs(pw.tagline, viewport, mobile.tagline)}><em>{PERSONAL.tagline}</em></div>
          <div style={rs(pw.cta, viewport, mobile.cta)}>
            <a href="#projects" style={rs(pw.ctaPrimary, viewport, mobile.ctaButton)}><span>▸</span> ENTER THE GARAGE</a>
            <a href="#contact"  style={rs(pw.ctaGhost, viewport, mobile.ctaButton)}>BOX / BOX ↗</a>
          </div>
        </div>

        <div style={rs(pw.heroRight, viewport, mobile.heroRight)}>
          <Tachometer />
          <div style={{...pw.metaLabel, marginTop:20, textAlign:'right'}}>◢ BUILD TACH · @12K RPM</div>
        </div>
      </div>
    </section>
  );
}

function Corner({ tl, tr, bl, br }) {
  const pos = {
    ...(tl && { top:18, left:18 }),
    ...(tr && { top:18, right:18, transform:'rotate(90deg)' }),
    ...(bl && { bottom:18, left:18, transform:'rotate(-90deg)' }),
    ...(br && { bottom:18, right:18, transform:'rotate(180deg)' }),
  };
  return (
    <div style={{ position:'absolute', width:22, height:22, ...pos }}>
      <div style={{ position:'absolute', left:0, top:0, width:'100%', height:2, background:'var(--accent)' }} />
      <div style={{ position:'absolute', left:0, top:0, width:2, height:'100%', background:'var(--accent)' }} />
    </div>
  );
}

function Gauge({ label, value, max, unit }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginTop:22 }}>
      <div style={pw.gaugeLabel}>
        <span>{label}</span><b>{value}{unit}</b>
      </div>
      <div style={pw.gaugeTrack}>
        {Array.from({ length:20 }).map((_,i) => {
          const filled = (i/20)*100 < pct;
          const hot = i >= 16;
          return <span key={i} style={{ flex:1, height:14, marginRight:2, background: filled?(hot?'var(--accent)':'#f4f2ec'):'rgba(255,255,255,0.08)' }} />;
        })}
      </div>
    </div>
  );
}

function Tachometer() {
  const r=110, cx=140, cy=140;
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" style={{display:'block'}}>
      <defs>
        <linearGradient id="tachglow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f2ec" stopOpacity="0.15"/>
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r+14} fill="none" stroke="#f4f2ec" strokeOpacity="0.15" strokeWidth="1"/>
      <circle cx={cx} cy={cy} r={r}    fill="none" stroke="#f4f2ec" strokeOpacity="0.3"  strokeWidth="1"/>
      <path d={arc(cx,cy,r-6,-135,70)}  fill="none" stroke="url(#tachglow)"  strokeWidth="10"/>
      <path d={arc(cx,cy,r-6,70,135)}   fill="none" stroke="var(--accent)"   strokeWidth="10"/>
      {Array.from({length:13}).map((_,i)=>{
        const a=-135+(i*270)/12, inner=r-18, outer=r-2;
        const p1=pt(cx,cy,inner,a), p2=pt(cx,cy,outer,a);
        const hot=i>=10;
        return (
          <g key={i}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={hot?'var(--accent)':'#f4f2ec'} strokeOpacity={hot?1:0.55} strokeWidth={i%2===0?2:1}/>
            {i%2===0 && <text x={pt(cx,cy,inner-14,a).x} y={pt(cx,cy,inner-14,a).y+4} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="11" fill="#f4f2ec" opacity="0.7">{i}</text>}
          </g>
        );
      })}
      <g transform={`rotate(85 ${cx} ${cy})`}>
        <line x1={cx} y1={cy} x2={cx+r-10} y2={cy} stroke="var(--accent)" strokeWidth="3"/>
        <circle cx={cx+r-10} cy={cy} r="4" fill="var(--accent)"/>
      </g>
      <circle cx={cx} cy={cy} r="14" fill="#f4f2ec" opacity="0.9"/>
      <circle cx={cx} cy={cy} r="14" fill="none" stroke="var(--accent)" strokeWidth="2"/>
      <text x={cx} y={cy-32}  textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill="#f4f2ec" opacity="0.6">RPM × 1000</text>
      <text x={cx} y={cy+50}  textAnchor="middle" fontFamily="'Space Grotesk',sans-serif"  fontSize="28" fontWeight="600" fill="#f4f2ec">13+</text>
      <text x={cx} y={cy+68}  textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="9"  fill="var(--accent)">REDLINE</text>
    </svg>
  );
}
function arc(cx,cy,r,s,e){ const a=pt(cx,cy,r,e),b=pt(cx,cy,r,s),lg=e-s<=180?0:1; return `M ${a.x} ${a.y} A ${r} ${r} 0 ${lg} 0 ${b.x} ${b.y}`; }
function pt(cx,cy,r,deg){ const rad=((deg-90)*Math.PI)/180; return {x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)}; }

function Ticker() {
  const items = ["◉ 400+ HRS DRIVEN ON CADE SIM","◉ 4/4 CYLINDERS RESTORED · 142 PSI","◉ $46.32 TOTAL BOM · CADE","◉ SHIPPING CODE DAILY","◉ AVAIL SUMMER '26","◉ HOBBY: ACTUAL RACING","◉ 9\" FPV DRONE · CNC FRAME","◉ CURRENTLY: PROD READY"];
  return (
    <div style={pw.ticker}>
      <div style={pw.tickerInner}>
        {[...items,...items].map((t,i)=><span key={i} style={{marginRight:44}}>{t}</span>)}
      </div>
    </div>
  );
}

function TelemetryBar({ viewport }) {
  const cells = [
    { k:"AVAILABLE",    v:"SUM 2026", color:"var(--accent)" },
    { k:"PROJECTS LIVE",v:"04" },
    { k:"LINES / WEEK", v:"~3.2K" },
    { k:"TEARDOWNS",    v:"07" },
    { k:"COFFEE / DAY", v:"02–04" },
    { k:"GPA",          v:"4.0" },
  ];
  return (
    <div style={rs(pw.telemetry, viewport, mobile.telemetry)}>
      {cells.map((c,i)=>(
        <div key={i} style={rs(pw.telemetryCell, viewport, mobile.telemetryCell)}>
          <div style={pw.telemetryK}>{c.k}</div>
          <div style={{...rs(pw.telemetryV, viewport, mobile.telemetryV), color:c.color||'inherit'}}>{c.v}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectStack({ viewport }) {
  return (
    <section id="projects" style={rs(pw.projectsSection, viewport, mobile.projectsSection, mobileTiny.projectsSection)}>
      <div style={rs(pw.sectionHead, viewport, mobile.sectionHead)}>
        <div style={pw.sectionTag}>◤ GRID 02</div>
        <h2 style={rs(pw.sectionTitle, viewport, mobile.sectionTitle, mobileTiny.sectionTitle)}>Race Log</h2>
        <div style={pw.sectionSub}>Selected builds · oldest lap last</div>
      </div>
      <div style={rs(pw.lapGrid, viewport, mobile.lapGrid)}>
        {PROJECTS.map((p,i)=><LapCard key={p.slug} project={p} pos={i+1} viewport={viewport}/>)}
      </div>
    </section>
  );
}

function LapCard({ project, pos, viewport }) {
  const isFeatured = project.featured;
  return (
    <article style={{...pw.lapCard, gridColumn:viewport.isMobile ? 'span 1' : (isFeatured?'span 2':'span 1')}}>
      <div style={rs(pw.lapCardHead, viewport, mobile.lapCardHead)}>
        <div style={pw.lapPos}>P{String(pos).padStart(2,'0')}</div>
        <div>NO. {project.no}</div>
        <div style={{opacity:0.5}}>{project.year}</div>
        <div style={{opacity:0.5}}>· {project.cat}</div>
        <div style={{flex:1}}/>
        <a href={`projects/${project.slug}.html`} style={{opacity:0.75,color:'inherit',textDecoration:'none'}}>OPEN TELEMETRY →</a>
      </div>
      <div style={{display:'grid', gridTemplateColumns:viewport.isMobile ? '1fr' : (isFeatured?'1.4fr 1fr':'1fr'), borderTop:'1px solid rgba(255,255,255,0.2)'}}>
        {project.video
          ? <ProjectVideo src={project.video} ratio={isFeatured?"16 / 10":"16 / 9"} label={`${project.title} — demo video`} />
          : project.photos
            ? <PhotoCarousel photos={project.photos} ratio={isFeatured?"16 / 10":"16 / 9"} label={project.title} />
            : <Placeholder ratio={isFeatured?"16 / 10":"16 / 9"} tone="navy" label={`${project.slug} hero`}
                style={{borderRight:(!viewport.isMobile && isFeatured)?'1px solid rgba(255,255,255,0.2)':'none'}}/>
        }
        <div style={rs(pw.lapBody, viewport, mobile.lapBody)}>
          <div style={rs(pw.lapTitle, viewport, mobile.lapTitle)}>{project.title}</div>
          <div style={pw.lapSub}>{project.subtitle}</div>
          <p style={pw.lapDesc}>{project.description}</p>
          {project.stats && (
            <div style={rs(pw.lapStats, viewport, mobile.lapStats)}>
              {project.stats.map((s,i)=>(
                <div key={i} style={pw.lapStat}>
                  <div style={pw.lapStatV}>{s.value}</div>
                  <div style={pw.lapStatL}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
          <div style={pw.lapTags}>
            {project.tags.map(t=><span key={t} style={pw.lapTag}>{t}</span>)}
          </div>
        </div>
      </div>
    </article>
  );
}

function AboutTerminal({ viewport }) {
  const grouped = PERSONAL.skills.reduce((acc,s)=>{ (acc[s.cat]=acc[s.cat]||[]).push(s.name); return acc; },{});
  return (
    <section style={rs(pw.about, viewport, mobile.about, mobileTiny.about)}>
      <div style={rs(pw.sectionHead, viewport, mobile.sectionHead)}>
        <div style={pw.sectionTag}>◤ GRID 03</div>
        <h2 style={rs(pw.sectionTitle, viewport, mobile.sectionTitle, mobileTiny.sectionTitle)}>Driver Bio</h2>
      </div>
      <div style={rs(pw.aboutGrid, viewport, mobile.aboutGrid)}>
        <div style={pw.terminal}>
          <div style={pw.terminalBar}>
            <span style={{...pw.terminalDot,background:'#ff5f57'}}/>
            <span style={{...pw.terminalDot,background:'#febc2e'}}/>
            <span style={{...pw.terminalDot,background:'#28c840'}}/>
            <span style={pw.terminalTitle}>~/oaj — whoami</span>
          </div>
          <div style={pw.terminalBody}>
            <div><span style={pw.prompt}>$</span> whoami</div>
            <div style={pw.terminalOut}>{PERSONAL.name} — {PERSONAL.title}</div>
            <div style={{marginTop:10}}><span style={pw.prompt}>$</span> cat bio.md</div>
            <div style={{...pw.terminalOut,whiteSpace:'pre-wrap',lineHeight:1.55}}>{PERSONAL.bio}</div>
            <div style={{marginTop:10}}><span style={pw.prompt}>$</span> ls skills/</div>
            {Object.entries(grouped).map(([cat,names])=>(
              <div key={cat} style={pw.terminalOut}>
                <span style={{color:'var(--accent)'}}>{cat.toLowerCase()}/</span> {names.join(' · ')}
              </div>
            ))}
            <div style={{marginTop:10}}><span style={pw.prompt}>$</span><span style={pw.cursor}> █</span></div>
          </div>
        </div>
        <div>
          <div style={pw.sidePanel}>
            <div style={pw.sidePanelTitle}>NOW</div>
            <ul style={pw.sidePanelList}>
              <li>Reducing the footprint of the FPV drone</li>
              <li>Prototyping v2 of CADE with load-cell pedals</li>
              <li>Looking for summer 2026 internships</li>
            </ul>
          </div>
          <div style={pw.sidePanel}>
            <div style={pw.sidePanelTitle}>TOOLBOX</div>
            <div style={pw.toolbox}>
              {['Fusion 360','Bambu X1C','Pro Micro','STM32','RasPi','OpenHD','Torque Wrench','Compression Tester'].map(t=>(
                <span key={t} style={pw.tool}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterStrip({ viewport = {} }) {
  return (
    <footer id="contact" style={rs(pw.footer, viewport, mobile.footer)}>
      <div style={rs(pw.footerTop, viewport, mobile.footerTop)}>
        <div>
          <div style={pw.sectionTag}>◤ GRID 04</div>
          <h2 style={{...rs(pw.sectionTitle, viewport, mobile.sectionTitle, mobileTiny.sectionTitle),marginBottom:8}}>Box Box.</h2>
          <p style={pw.footerLead}>Hiring for a mech/EE/embedded internship? I'd love to talk.</p>
          <div style={rs(pw.footerCTAs, viewport, mobile.footerCTAs)}>
            <a href={`mailto:${PERSONAL.email}`} style={rs(pw.ctaPrimary, viewport, mobile.ctaButton)}><span>✉</span> {PERSONAL.email}</a>
            <a href={PERSONAL.github} style={rs(pw.ctaGhost, viewport, mobile.ctaButton)}>GITHUB / @{PERSONAL.githubUsername} ↗</a>
          </div>
        </div>
        <div style={rs(pw.footerFlag, viewport, mobile.footerFlag)}>
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
      <div style={rs(pw.footerBot, viewport, mobile.footerBot)}>
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
  hero: { position:'relative', padding:'48px 32px 0', minHeight:'88vh', display:'flex', flexDirection:'column', borderBottom:'1px solid rgba(255,255,255,0.08)' },
  heroGrid: { flex:1, display:'grid', gridTemplateColumns:'280px 1fr 320px', gap:40, alignItems:'center' },
  heroLeft: { color:'rgba(255,255,255,0.8)' },
  heroCenter: { textAlign:'center' },
  heroRight: { display:'flex', flexDirection:'column', alignItems:'flex-end', color:'#f4f2ec' },
  metaLabel: { fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.14em', color:'var(--accent)', marginBottom:18 },
  metaBlock: { borderTop:'1px solid rgba(255,255,255,0.15)' },
  metaLine: { display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.08)', fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.05em', textTransform:'uppercase' },
  gaugeLabel: { display:'flex', justifyContent:'space-between', fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(255,255,255,0.7)', marginBottom:6 },
  gaugeTrack: { display:'flex' },
  nameStack: { display:'flex', alignItems:'baseline', justifyContent:'center', margin:0, fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, fontSize:'clamp(60px,12vw,180px)', lineHeight:0.9, letterSpacing:'-0.04em' },
  nameFirst: { color:'#f4f2ec' },
  nameSlash: { color:'var(--accent)', margin:'0 0.12em', fontStyle:'italic' },
  nameLast: { color:'#f4f2ec', fontStyle:'italic', fontFamily:"'Instrument Serif',serif", fontWeight:400, fontSize:'1em' },
  tagline: { marginTop:24, maxWidth:640, marginInline:'auto', fontSize:19, lineHeight:1.45, color:'rgba(244,242,236,0.78)', fontStyle:'italic', fontFamily:"'Instrument Serif',serif", fontWeight:400 },
  cta: { marginTop:36, display:'flex', gap:14, justifyContent:'center' },
  ctaPrimary: { display:'inline-flex', alignItems:'center', gap:10, padding:'14px 22px', background:'var(--accent)', color:'#0a0a0a', fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none', border:'1px solid var(--accent)' },
  ctaGhost: { display:'inline-flex', alignItems:'center', gap:10, padding:'14px 22px', background:'transparent', color:'#f4f2ec', fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.12em', textDecoration:'none', border:'1px solid rgba(255,255,255,0.35)' },
  ticker: { borderTop:'1px solid rgba(255,255,255,0.15)', borderBottom:'1px solid rgba(255,255,255,0.15)', padding:'10px 0', overflow:'hidden', fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.08em', color:'rgba(255,255,255,0.55)', whiteSpace:'nowrap' },
  tickerInner: { display:'inline-block', animation:'pw-ticker 50s linear infinite' },
  telemetry: { display:'grid', gridTemplateColumns:'repeat(6,1fr)', borderBottom:'1px solid rgba(255,255,255,0.08)' },
  telemetryCell: { padding:'20px 24px', borderRight:'1px solid rgba(255,255,255,0.08)' },
  telemetryK: { fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:8 },
  telemetryV: { fontSize:24, fontWeight:600, letterSpacing:'-0.02em' },
  projectsSection: { padding:'80px 32px 40px' },
  sectionHead: { maxWidth:1400, margin:'0 auto 40px' },
  sectionTag: { fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--accent)', marginBottom:10 },
  sectionTitle: { fontFamily:"'Space Grotesk',sans-serif", fontSize:'clamp(40px,6vw,68px)', fontWeight:500, letterSpacing:'-0.03em', margin:0, marginBottom:8 },
  sectionSub: { color:'rgba(255,255,255,0.55)', fontFamily:"'JetBrains Mono',monospace", fontSize:12, textTransform:'uppercase', letterSpacing:'0.06em' },
  lapGrid: { maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 },
  lapCard: { background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.12)', overflow:'hidden' },
  lapCardHead: { display:'flex', alignItems:'center', gap:14, padding:'14px 20px', fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)' },
  lapPos: { color:'var(--accent)', fontWeight:700 },
  lapBody: { padding:'28px 30px', display:'flex', flexDirection:'column', gap:14 },
  lapTitle: { fontSize:34, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1 },
  lapSub: { fontFamily:"'JetBrains Mono',monospace", fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--accent)' },
  lapDesc: { fontSize:15.5, lineHeight:1.55, color:'rgba(255,255,255,0.75)', margin:0 },
  lapStats: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(90px,1fr))', marginTop:6, borderTop:'1px solid rgba(255,255,255,0.12)', borderBottom:'1px solid rgba(255,255,255,0.12)' },
  lapStat: { padding:'14px 14px', borderRight:'1px solid rgba(255,255,255,0.08)' },
  lapStatV: { fontSize:22, fontWeight:600, letterSpacing:'-0.02em' },
  lapStatL: { fontFamily:"'JetBrains Mono',monospace", fontSize:10, textTransform:'uppercase', letterSpacing:'0.08em', color:'rgba(255,255,255,0.5)', marginTop:4 },
  lapTags: { display:'flex', flexWrap:'wrap', gap:6, marginTop:6 },
  lapTag: { fontFamily:"'JetBrains Mono',monospace", fontSize:10, textTransform:'uppercase', letterSpacing:'0.08em', padding:'4px 8px', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.85)' },
  about: { padding:'80px 32px 40px' },
  aboutGrid: { maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:24 },
  terminal: { background:'#0a0f1a', border:'1px solid rgba(255,255,255,0.12)', overflow:'hidden' },
  terminalBar: { display:'flex', alignItems:'center', gap:8, padding:'10px 16px', background:'rgba(255,255,255,0.04)', borderBottom:'1px solid rgba(255,255,255,0.08)' },
  terminalDot: { width:12, height:12, borderRadius:'50%' },
  terminalTitle: { marginLeft:12, fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:'rgba(255,255,255,0.55)' },
  terminalBody: { padding:24, fontFamily:"'JetBrains Mono',monospace", fontSize:13, lineHeight:1.7, color:'rgba(255,255,255,0.88)' },
  prompt: { color:'var(--accent)', marginRight:10 },
  terminalOut: { color:'rgba(255,255,255,0.8)', paddingLeft:22 },
  cursor: { color:'var(--accent)', animation:'pw-blink 1s steps(1) infinite' },
  sidePanel: { border:'1px solid rgba(255,255,255,0.12)', padding:'20px 22px', marginBottom:16, background:'rgba(255,255,255,0.02)' },
  sidePanelTitle: { fontFamily:"'JetBrains Mono',monospace", fontSize:11, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--accent)', marginBottom:14 },
  sidePanelList: { margin:0, paddingLeft:16, fontSize:14.5, lineHeight:1.7, color:'rgba(255,255,255,0.82)' },
  toolbox: { display:'flex', flexWrap:'wrap', gap:6 },
  tool: { fontFamily:"'JetBrains Mono',monospace", fontSize:11, padding:'5px 10px', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.85)' },
  footer: { padding:'80px 0 0', borderTop:'1px solid rgba(255,255,255,0.1)' },
  footerTop: { maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:40, padding:'0 32px 60px', alignItems:'center' },
  footerLead: { fontSize:18, color:'rgba(255,255,255,0.72)', maxWidth:520, lineHeight:1.55, marginBottom:24 },
  footerCTAs: { display:'flex', gap:12, flexWrap:'wrap' },
  footerFlag: { aspectRatio:'3 / 2', border:'1px solid rgba(255,255,255,0.15)', overflow:'hidden' },
  footerBot: { display:'flex', justifyContent:'space-between', padding:'18px 32px', fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', borderTop:'1px solid rgba(255,255,255,0.08)' },
};

/* ── App ──────────────────────────────────────── */

const mobile = {
  topStrip: { padding:'10px 18px', gap:12, fontSize:10, letterSpacing:'0.07em', alignItems:'center' },
  hero: { padding:'36px 18px 32px', minHeight:'auto' },
  heroGrid: { gridTemplateColumns:'1fr', gap:30, alignItems:'start' },
  heroLeft: { order:2, width:'100%' },
  heroCenter: { order:1, textAlign:'left' },
  heroRight: { display:'none' },
  nameStack: { justifyContent:'flex-start', fontSize:'clamp(58px, 23vw, 112px)', flexWrap:'wrap', lineHeight:0.92 },
  tagline: { marginTop:20, marginInline:0, maxWidth:'100%', fontSize:18, lineHeight:1.45 },
  cta: { marginTop:28, flexDirection:'column', gap:10, alignItems:'stretch' },
  ctaButton: { width:'100%', justifyContent:'center', minHeight:48, padding:'14px 16px', textAlign:'center', letterSpacing:'0.08em' },
  telemetry: { gridTemplateColumns:'repeat(2, 1fr)' },
  telemetryCell: { padding:'16px 18px' },
  telemetryV: { fontSize:21 },
  projectsSection: { padding:'56px 18px 28px' },
  sectionHead: { margin:'0 auto 28px' },
  sectionTitle: { fontSize:'clamp(34px, 12vw, 52px)', lineHeight:1.02 },
  lapGrid: { gridTemplateColumns:'1fr', gap:16 },
  lapCardHead: { alignItems:'flex-start', flexWrap:'wrap', gap:10, padding:'13px 16px', lineHeight:1.35 },
  lapBody: { padding:'22px 18px', gap:12 },
  lapTitle: { fontSize:28, lineHeight:1.06 },
  lapStats: { gridTemplateColumns:'repeat(2, minmax(0, 1fr))' },
  about: { padding:'56px 18px 28px' },
  aboutGrid: { gridTemplateColumns:'1fr', gap:18 },
  footer: { padding:'56px 0 0' },
  footerTop: { gridTemplateColumns:'1fr', gap:26, padding:'0 18px 44px' },
  footerCTAs: { flexDirection:'column', alignItems:'stretch' },
  footerFlag: { maxHeight:180 },
  footerBot: { flexDirection:'column', gap:8, padding:'16px 18px', lineHeight:1.5 },
};

const mobileTiny = {
  topStrip: { padding:'9px 14px', fontSize:9, letterSpacing:'0.05em' },
  hero: { padding:'30px 14px 28px' },
  heroGrid: { gap:24 },
  nameStack: { fontSize:'clamp(52px, 24vw, 92px)' },
  projectsSection: { padding:'48px 14px 24px' },
  sectionTitle: { fontSize:'clamp(32px, 13vw, 44px)' },
  about: { padding:'48px 14px 24px' },
};

function App() {
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', '#ff5a1f');
  }, []);

  return <PitWall />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
