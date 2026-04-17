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
    slug: "cade", no: "01",
    title: "C.A.D.E", subtitle: "Computer Aided Driving Emulator",
    description: "A 3D-printed driving simulator that recreates realistic steering, pedal feel and telemetry — built entirely from off-the-shelf electronics for under $50.",
    tags: ["Arduino", "3D Printing", "CAD", "Embedded"], cat: "Mechatronics",
    featured: true, year: "2024",
    stats: [
      { value: "400+", label: "Hours Driven" },
      { value: "20+", label: "People Impacted" },
      { value: "$46.32", label: "Raw Cost" },
    ],
  },
  {
    slug: "engine-rebuild", no: "02",
    title: "Engine Rebuild", subtitle: "Hyundai Accent 1.6L Restoration",
    description: "Full teardown, inspection, and rebuild of a Hyundai Accent 1.6L. Restored compression across all cylinders and eliminated a persistent misfire.",
    tags: ["Automotive", "Mechanical"], cat: "Mechanical",
    featured: true, year: "2024",
    stats: [
      { value: "4", label: "Cylinders" },
      { value: "142 psi", label: "Restored Comp." },
      { value: "80+ hrs", label: "Shop Time" },
    ],
  },
  {
    slug: "fast-fashion-detector", no: "03",
    title: "Fast Fashion Detector", subtitle: "Amazon Sustainability Tool",
    description: "A Python tool that classifies fast fashion brands by water usage, helping shoppers make informed purchasing decisions directly on Amazon product pages.",
    tags: ["Python", "Sustainability", "Data"], cat: "Software",
    featured: false, year: "2023",
    stats: [
      { value: "200+", label: "Brands Indexed" },
      { value: "3L→7kL", label: "Water Range" },
    ],
  },
  {
    slug: "gemini-cli-gui", no: "04",
    title: "Gemini CLI GUI", subtitle: "Desktop Chatbot Interface",
    description: "An Electron + Tailwind desktop app that gives Google's Gemini CLI a sleek chat interface for rapid prompt testing and multi-session workflows.",
    tags: ["Electron", "TypeScript", "Tailwind"], cat: "Software",
    featured: false, year: "2024",
    stats: [
      { value: "Electron", label: "Shell" },
      { value: "TS", label: "Stack" },
    ],
  },
];

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
        fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
        opacity: 0.7,
      }}>
        [ {label} ]
      </div>
      {children}
    </div>
  );
}

window.PERSONAL = PERSONAL;
window.PROJECTS = PROJECTS;
window.Placeholder = Placeholder;
