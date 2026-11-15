/* Animated SVG scene per project. Pure SVG + CSS, so no JavaScript cost. */
const L = "#ededec", C = "#ededec", A = "#a3a3a9", G = "#2a2a30";

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={C} strokeOpacity=".06" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor={C} stopOpacity=".07" /><stop offset="1" stopColor={C} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="#0c0c0d" />
      <rect width="400" height="300" fill="url(#grid)" />
      <rect width="400" height="300" fill="url(#glow)" />
      {children}
    </svg>
  );
}

function Petro() {
  return (
    <Frame label="RFID card authenticating with an ESP32 controller that unlocks a fuel pump">
      {/* RFID card */}
      <g className="a-bob">
        <rect x="36" y="112" width="84" height="56" rx="8" fill="#131314" stroke={C} strokeWidth="2" />
        <rect x="48" y="126" width="18" height="14" rx="3" fill={A} />
        <path d="M48 152h44M48 159h28" stroke={C} strokeOpacity=".5" strokeWidth="2" />
      </g>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${128 + i * 9} ${124 - i * 5} q10 ${16 + i * 5} 0 ${32 + i * 10}`} fill="none" stroke={L} strokeWidth="2.5" strokeLinecap="round" className="a-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      {/* ESP32 */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} stroke={C} strokeWidth="2" strokeOpacity=".7">
            <path d={`M${172 + i * 14} 96v12M${172 + i * 14} 192v12M160 ${122 + i * 14}h12M228 ${122 + i * 14}h12`} />
          </g>
        ))}
        <rect x="170" y="108" width="60" height="84" rx="6" fill="#131314" stroke={L} strokeWidth="2.5" />
        <rect x="182" y="120" width="36" height="26" rx="3" fill={L} fillOpacity=".15" stroke={L} />
        <text x="200" y="172" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={C}>ESP32</text>
        <circle cx="222" cy="184" r="2.5" fill={L} className="a-pulse" />
      </g>
      <path d="M240 150h44" stroke={L} strokeWidth="2.5" className="a-dash" />
      {/* pump */}
      <g>
        <rect x="290" y="92" width="62" height="116" rx="8" fill="#131314" stroke={C} strokeWidth="2" />
        <rect x="300" y="104" width="42" height="26" rx="4" fill="#0c0c0d" stroke={L} />
        <text x="321" y="122" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={L} className="a-pulse">OK ✓</text>
        <rect x="302" y="142" width="38" height="52" rx="3" fill="#0c0c0d" />
        <rect x="302" y="142" width="38" height="52" rx="3" fill={A} fillOpacity=".8" className="a-grow" />
        <path d="M352 120h12q8 0 8 8v52q0 10-9 10" fill="none" stroke={C} strokeWidth="3" strokeLinecap="round" />
        <rect x="274" y="208" width="94" height="8" rx="3" fill={C} fillOpacity=".4" />
      </g>
      <text x="36" y="262" fontFamily="monospace" fontSize="10" fill={C} fillOpacity=".5">RFID AUTH → SECURE LINK → DISPENSE</text>
    </Frame>
  );
}

function Drone({ x, y, d }: { x: number; y: number; d: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="a-bob" style={{ animationDelay: `${d}s`, animationDuration: `${2.6 + d}s` }}>
        <path d="M-14 -14L14 14M14 -14L-14 14" stroke={C} strokeWidth="2.5" strokeLinecap="round" />
        {[[-14, -14], [14, -14], [-14, 14], [14, 14]].map(([a, b], i) => (
          <circle key={i} cx={a} cy={b} r="7" fill="none" stroke={L} strokeWidth="1.5" className="a-pulse" style={{ animationDuration: ".5s", animationDelay: `${i * 0.1}s` }} />
        ))}
        <rect x="-6" y="-6" width="12" height="12" rx="3" fill={L} />
      </g>
    </g>
  );
}
function Aegis() {
  const pts: [number, number][] = [[200, 78], [118, 132], [282, 132], [150, 212], [250, 212]];
  const links = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]];
  return (
    <Frame label="Five drones flying in formation, exchanging messages over a mesh">
      <circle cx="200" cy="150" r="118" fill="none" stroke={C} strokeOpacity=".12" />
      <circle cx="200" cy="150" r="78" fill="none" stroke={C} strokeOpacity=".12" />
      <g className="a-spin" style={{ transformBox: "view-box", transformOrigin: "200px 150px" }}>
        <path d="M200 150L200 32A118 118 0 0 1 302 91Z" fill={L} fillOpacity=".07" />
      </g>
      {links.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={L} strokeOpacity=".7" strokeWidth="1.5" className="a-dash" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      {pts.map(([x, y], i) => <Drone key={i} x={x} y={y} d={i * 0.3} />)}
      <g transform="translate(336 60)">
        <circle r="10" fill="none" stroke={A} strokeWidth="2" className="a-ring" />
        <circle r="4" fill={A} />
        <text x="-14" y="26" fontFamily="monospace" fontSize="9" fill={A}>WP-01</text>
      </g>
      <text x="24" y="276" fontFamily="monospace" fontSize="10" fill={C} fillOpacity=".5">SWARM · MESH LINK · CONSENSUS</text>
    </Frame>
  );
}

function Analytics() {
  return (
    <Frame label="Data flowing from sources through an ETL stage into a warehouse and charts">
      {[90, 150, 210].map((y, i) => (
        <g key={y}>
          <rect x="30" y={y - 14} width="52" height="28" rx="6" fill="#131314" stroke={C} strokeOpacity=".7" strokeWidth="1.5" />
          <path d={`M38 ${y}h36`} stroke={L} strokeWidth="2" className="a-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          <path d={`M82 ${y}C110 ${y} 110 150 136 150`} fill="none" stroke={L} strokeWidth="2" className="a-dash" />
        </g>
      ))}
      <g transform="translate(160 150)">
        <g className="a-spin">
          <path d="M0-26l6 8 10-2 2 10 8 6-6 8 2 10-10 2-6 8-6-8-10 2-2-10-8-6 6-8-2-10 10-2z" transform="translate(0 2)" fill="#131314" stroke={A} strokeWidth="2" />
        </g>
        <circle r="7" fill={A} />
        <text y="48" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={A}>ETL</text>
      </g>
      <path d="M188 150h34" stroke={L} strokeWidth="2" className="a-dash" />
      <g>
        <path d="M226 118v64c0 8 14 12 30 12s30-4 30-12v-64" fill="#131314" stroke={C} strokeWidth="2" />
        <ellipse cx="256" cy="118" rx="30" ry="11" fill="#131314" stroke={C} strokeWidth="2" />
        <path d="M226 140c0 8 14 12 30 12s30-4 30-12M226 162c0 8 14 12 30 12s30-4 30-12" fill="none" stroke={C} strokeOpacity=".5" />
      </g>
      <path d="M290 150h20" stroke={L} strokeWidth="2" className="a-dash" />
      <g>
        <path d="M316 200h64M316 200v-104" stroke={C} strokeOpacity=".5" strokeWidth="1.5" />
        {[52, 86, 66, 100].map((h, i) => (
          <rect key={i} x={322 + i * 15} y={200 - h} width="10" height={h} rx="2" fill={i === 3 ? L : G} className="a-grow" style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
      </g>
      <text x="30" y="270" fontFamily="monospace" fontSize="10" fill={C} fillOpacity=".5">INGEST → TRANSFORM → WAREHOUSE → INSIGHT</text>
    </Frame>
  );
}

function Wander() {
  const route = "M50 220C90 150 130 240 170 170S250 80 290 130 340 110 352 76";
  return (
    <Frame label="A travel route drawn across a map with a plane flying along it">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M-10 ${70 + i * 70}C80 ${30 + i * 70} 160 ${120 + i * 60} 240 ${70 + i * 70}S380 ${40 + i * 70} 420 ${90 + i * 60}`} fill="none" stroke={C} strokeOpacity=".1" strokeWidth="1.5" />
      ))}
      <path d="M120 60q30-22 60 0t50 30q-10 30-50 26t-60-56z" fill={G} fillOpacity=".25" />
      <path d="M240 190q40-20 80 6q10 30-30 40t-50-46z" fill={G} fillOpacity=".25" />
      <path d={route} fill="none" stroke={L} strokeWidth="2.5" strokeLinecap="round" className="a-dash" />
      {[[50, 220], [170, 170], [290, 130]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}><circle r="9" fill="none" stroke={L} className="a-ring" style={{ animationDelay: `${i * 0.6}s` }} /><circle r="4" fill={C} /></g>
      ))}
      <g transform="translate(352 76)" className="a-bob">
        <path d="M0 0c-11 0-18-9-18-18a18 18 0 0 1 36 0c0 9-7 18-18 18z" transform="translate(0 -4)" fill={A} />
        <circle cy="-22" r="6" fill="#0c0c0d" />
      </g>
      <g>
        <path d="M-10 0l20-7-5 7 5 7z" fill={C} transform="rotate(180)" />
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={route} />
      </g>
      <text x="24" y="276" fontFamily="monospace" fontSize="10" fill={C} fillOpacity=".5">DISCOVER · PLAN · GO</text>
    </Frame>
  );
}

function Donation() {
  return (
    <Frame label="A beating heart with coins rising into it and a payment confirmation">
      <g transform="translate(200 140)">
        <circle r="62" fill="none" stroke={L} strokeOpacity=".5" className="a-ring" />
        <circle r="62" fill="none" stroke={L} strokeOpacity=".5" className="a-ring" style={{ animationDelay: "1.1s" }} />
        <path className="a-beat" d="M0 44C-60 4-44-46-14-40-4-38 0-28 0-28S4-38 14-40C44-46 60 4 0 44z" fill={L} />
      </g>
      {[[96, 236, 0], [140, 250, 0.9], [262, 246, 0.4], [306, 232, 1.5]].map(([x, y, d], i) => (
        <g key={i} className="a-rise" style={{ animationDelay: `${d}s` }}>
          <circle cx={x} cy={y} r="13" fill={A} /><text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0c0c0d">₹</text>
        </g>
      ))}
      <g transform="translate(286 62)">
        <rect x="-4" y="-18" width="94" height="36" rx="18" fill="#131314" stroke={L} />
        <circle cx="14" r="9" fill={L} /><path d="M9 0l4 4 7-8" stroke="#0c0c0d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <text x="30" y="4" fontFamily="monospace" fontSize="10" fill={C}>PAID</text>
      </g>
      <text x="24" y="282" fontFamily="monospace" fontSize="10" fill={C} fillOpacity=".5">CHECKOUT · VERIFY · THANK YOU</text>
    </Frame>
  );
}

function Chat() {
  return (
    <Frame label="A chat conversation guiding a customer to a booked travel insurance policy">
      <rect x="32" y="46" width="214" height="40" rx="12" fill="#131314" stroke={C} strokeOpacity=".6" strokeWidth="1.5" />
      <text x="46" y="71" fontFamily="monospace" fontSize="12" fill={C}>Where are you travelling?</text>
      <rect x="196" y="100" width="172" height="40" rx="12" fill={L} fillOpacity=".18" stroke={L} strokeWidth="1.5" />
      <text x="210" y="125" fontFamily="monospace" fontSize="12" fill={C}>Singapore · 5 days</text>
      <rect x="32" y="154" width="250" height="40" rx="12" fill="#131314" stroke={C} strokeOpacity=".6" strokeWidth="1.5" />
      <text x="46" y="179" fontFamily="monospace" fontSize="12" fill={C}>Here is the best plan for you</text>
      {[0, 1, 2].map((i) => <circle key={i} cx={46 + i * 14} cy="226" r="4" fill={C} className="a-pulse" style={{ animationDelay: `${i * 0.25}s` }} />)}
      <g transform="translate(262 226)">
        <g className="a-bob">
          <rect x="-12" y="-18" width="112" height="36" rx="18" fill="#131314" stroke={L} />
          <circle cx="8" r="9" fill={L} /><path d="M3 0l4 4 7-8" stroke="#0c0c0d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <text x="24" y="4" fontFamily="monospace" fontSize="10" fill={C}>BOOKED</text>
        </g>
      </g>
    </Frame>
  );
}

export default function ProjectArt({ slug }: { slug: string }) {
  switch (slug) {
    case "travel-insurance-chatbot": return <Chat />;
    case "petroconnect": return <Petro />;
    case "aegis-mas": return <Aegis />;
    case "customer-behaviour-analytics": return <Analytics />;
    case "wanderway": return <Wander />;
    case "donation-platform": return <Donation />;
    default: return <Aegis />;
  }
}
