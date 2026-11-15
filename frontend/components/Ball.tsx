export default function Ball({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id="bg" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#b9bcc4" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#bg)" stroke="#16191e" strokeWidth="2" />
      <polygon points="50,33 66,45 60,64 40,64 34,45" fill="#16191e" />
      {[[50, 6, 50, 33], [94, 40, 66, 45], [78, 90, 60, 64], [22, 90, 40, 64], [6, 40, 34, 45]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#16191e" strokeWidth="2" />
      ))}
      {[[50, 4], [96, 38], [80, 92], [20, 92], [4, 38]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="#16191e" />
      ))}
    </svg>
  );
}
