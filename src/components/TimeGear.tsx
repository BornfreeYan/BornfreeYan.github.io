/**
 * Hero 中心的「时间齿轮」太阳（程序化 SVG）：
 * 外圈齿轮齿 + 轮缘（缓慢正向旋转）+ 表盘刻度/罗马数字（静止）+ 太阳核心与指针（反向缓转）。
 * 意象：古老恢宏的金色时间齿轮，太阳保留其中。
 * 颜色用 --sun-* CSS 变量，旋转由 .sun-spin / .spin-rev 驱动。
 */

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = ((start - 90) * Math.PI) / 180
  const e = ((end - 90) * Math.PI) / 180
  const large = end - start > 180 ? 1 : 0
  return `M ${(cx + r * Math.cos(s)).toFixed(2)} ${(cy + r * Math.sin(s)).toFixed(2)} A ${r} ${r} 0 ${large} 1 ${(cx + r * Math.cos(e)).toFixed(2)} ${(cy + r * Math.sin(e)).toFixed(2)}`
}

export function TimeGear({ className }: { className?: string }) {
  const minuteTicks = Array.from({ length: 60 }, (_, i) => i * 6)
  const hourTicks = Array.from({ length: 12 }, (_, i) => i * 30)
  const hairRays = Array.from({ length: 72 }, (_, i) => i * 5)

  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" role="presentation">
      <defs>
        <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sun-core)" />
          <stop offset="70%" stopColor="var(--sun-deep)" />
          <stop offset="100%" stopColor="var(--sun-deep)" stopOpacity="0.2" />
        </radialGradient>
        {/* 太阳核心颗粒纹理 */}
        <filter id="sun-tex" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="5" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.62  0 0 0 0 0.46  0 0 0 0 0.18  0 0 0 0.4 0"
            result="col"
          />
          <feComposite in="col" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* 齿轮外齿 + 轮缘：缓慢正向旋转 */}
      <g className="sun-spin" stroke="var(--sun-line)">
        {/* 齿：虚线圆（周长 2π·190，36 齿，每齿 33.16，实 13 / 虚 20.16） */}
        <circle cx="200" cy="200" r="190" strokeWidth="13" strokeDasharray="13 20.16" opacity="0.5" />
        <circle cx="200" cy="200" r="181" strokeWidth="3.5" opacity="0.65" />
        <circle cx="200" cy="200" r="174" strokeWidth="1.2" opacity="0.5" />
      </g>

      {/* 表盘：刻度 + 珠饰环 + 太阳射线（静止） */}
      <g stroke="var(--sun-line)">
        {minuteTicks.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <line x1="200" y1="162" x2="200" y2="169" strokeWidth="1" opacity="0.5" />
          </g>
        ))}
        {hourTicks.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <line x1="200" y1="158" x2="200" y2="170" strokeWidth="1.6" opacity="0.7" />
          </g>
        ))}
        {/* 珠饰环 */}
        <circle cx="200" cy="200" r="148" strokeWidth="1" opacity="0.4" strokeDasharray="1 9" />
        {/* 内部太阳射线 */}
        {hairRays.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <line x1="200" y1="104" x2="200" y2="140" strokeWidth="0.8" opacity="0.3" />
          </g>
        ))}
      </g>

      {/* 罗马数字（古老钟面） */}
      <g
        fill="var(--sun-line)"
        opacity="0.55"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="17"
        textAnchor="middle"
      >
        <text x="200" y="118">XII</text>
        <text x="272" y="206">III</text>
        <text x="200" y="298">VI</text>
        <text x="128" y="206">IX</text>
      </g>

      {/* 太阳核心 + 指针：反向缓慢旋转（齿轮啮合感） */}
      <g className="spin-rev" stroke="var(--sun-line)">
        <circle cx="200" cy="200" r="58" fill="url(#sun-core)" strokeWidth="1.2" opacity="0.9" />
        <circle cx="200" cy="200" r="58" fill="#ffffff" filter="url(#sun-tex)" opacity="0.5" />
        <circle cx="200" cy="200" r="42" strokeWidth="0.8" opacity="0.5" />
        <circle cx="200" cy="200" r="28" strokeWidth="0.8" opacity="0.45" />
        <path d={arcPath(200, 200, 35, 30, 85)} strokeWidth="1.2" opacity="0.5" />
        <path d={arcPath(200, 200, 35, 150, 205)} strokeWidth="1.2" opacity="0.5" />
        <path d={arcPath(200, 200, 35, 270, 325)} strokeWidth="1.2" opacity="0.5" />
        {/* 指针（经典 10:10） */}
        <line x1="200" y1="200" x2="200" y2="142" strokeWidth="2.2" opacity="0.8" transform="rotate(300 200 200)" />
        <line x1="200" y1="200" x2="200" y2="126" strokeWidth="1.4" opacity="0.7" transform="rotate(60 200 200)" />
        {/* 中心轴 */}
        <circle cx="200" cy="200" r="9" strokeWidth="1.6" opacity="0.8" />
        <circle cx="200" cy="200" r="3" fill="var(--sun-line)" strokeWidth="0" opacity="0.9" />
      </g>
    </svg>
  )
}
