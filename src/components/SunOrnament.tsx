/**
 * Hero 背景的细线太阳纹章（程序化 SVG）：同心环 + 长短交替的 36 条射线
 * 用 currentColor 描边，颜色/透明度由父级控制，缓慢旋转由 .sun-spin 驱动。
 */
export function SunOrnament({ className }: { className?: string }) {
  const rays = Array.from({ length: 36 }, (_, i) => i * 10)
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" role="presentation">
      <g className="sun-spin" stroke="currentColor">
        {/* 同心环 */}
        <circle cx="200" cy="200" r="60" strokeWidth="1" opacity="0.5" />
        <circle cx="200" cy="200" r="120" strokeWidth="1" opacity="0.35" strokeDasharray="1 6" />
        <circle cx="200" cy="200" r="185" strokeWidth="1" opacity="0.45" />
        {/* 射线：长短交替 */}
        {rays.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <line x1="200" y1="70" x2="200" y2={deg % 20 === 0 ? 190 : 150} strokeWidth="1" opacity="0.5" />
          </g>
        ))}
        {/* 中心圆点 */}
        <circle cx="200" cy="200" r="6" strokeWidth="1.5" opacity="0.7" />
        <circle cx="200" cy="200" r="2" fill="currentColor" opacity="0.7" />
      </g>
    </svg>
  )
}
