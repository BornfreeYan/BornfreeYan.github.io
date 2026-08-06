import { useEffect, useState } from 'react'

/**
 * Hero 中心的「机械手表」太阳（程序化 SVG + React）：
 * 外层旋转表圈（齿轮齿）→ 表盘刻度 + 罗马数字 → 机芯骨架辐条/桥环 →
 * 中心太阳主齿轮（反向缓转）+ 4 个咬合的卫星齿轮（正向快转）+ 摆轮（摆动）+
 * 红宝石/螺丝点缀 → 时针/分针指向实时北京时间。
 * 颜色用 --sun-* / --jewel CSS 变量，旋转由 .sun-spin / .spin-rev / .gear-sat / .balance-swing 驱动。
 */

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = ((start - 90) * Math.PI) / 180
  const e = ((end - 90) * Math.PI) / 180
  const large = end - start > 180 ? 1 : 0
  return `M ${(cx + r * Math.cos(s)).toFixed(2)} ${(cy + r * Math.sin(s)).toFixed(2)} A ${r} ${r} 0 ${large} 1 ${(cx + r * Math.cos(e)).toFixed(2)} ${(cy + r * Math.sin(e)).toFixed(2)}`
}

// 北京时间（Asia/Shanghai，固定 UTC+8）
function beijingParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  return { h: get('hour'), m: get('minute'), s: get('second') }
}

export function TimeGear({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const { h, m, s } = beijingParts(now)
  const hourAngle = (h % 12) * 30 + m * 0.5
  const minuteAngle = m * 6 + s * 0.1

  const minuteTicks = Array.from({ length: 60 }, (_, i) => i * 6)
  const hourTicks = Array.from({ length: 12 }, (_, i) => i * 30)
  const satellites = [45, 135, 225, 315].map((a) => {
    const rad = (a * Math.PI) / 180
    return { key: a, cx: 200 + 54 * Math.cos(rad), cy: 200 + 54 * Math.sin(rad) }
  })
  const screws = [30, 150, 210, 330].map((a) => {
    const rad = (a * Math.PI) / 180
    return { key: a, cx: 200 + 152 * Math.cos(rad), cy: 200 + 152 * Math.sin(rad) }
  })

  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" role="img" aria-label="机械手表内部，时针分针显示北京时间">
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

      {/* 外层旋转表圈（齿轮齿） */}
      <g className="sun-spin" stroke="var(--sun-line)">
        <circle cx="200" cy="200" r="190" strokeWidth="13" strokeDasharray="13 20.16" opacity="0.5" />
        <circle cx="200" cy="200" r="181" strokeWidth="3.5" opacity="0.65" />
        <circle cx="200" cy="200" r="174" strokeWidth="1.2" opacity="0.5" />
      </g>

      {/* 表盘刻度 + 罗马数字（静止） */}
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
      </g>
      <g fill="var(--sun-line)" opacity="0.55" fontFamily="Georgia, 'Times New Roman', serif" fontSize="17" textAnchor="middle">
        <text x="200" y="118">XII</text>
        <text x="272" y="206">III</text>
        <text x="200" y="298">VI</text>
        <text x="128" y="206">IX</text>
      </g>

      {/* 机芯骨架：辐条 + 桥环（静止） */}
      <g stroke="var(--sun-line)">
        {hourTicks.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <line x1="200" y1="152" x2="200" y2="58" strokeWidth="0.8" opacity="0.22" />
          </g>
        ))}
        <circle cx="200" cy="200" r="96" strokeWidth="0.8" opacity="0.22" strokeDasharray="2 6" />
      </g>

      {/* 摆轮（摆动） */}
      <g className="spin-center balance-swing" stroke="var(--sun-line)">
        <circle cx="200" cy="80" r="16" strokeWidth="1.6" opacity="0.7" />
        <line x1="200" y1="64" x2="200" y2="96" strokeWidth="1.2" opacity="0.6" />
        <line x1="184" y1="80" x2="216" y2="80" strokeWidth="1.2" opacity="0.6" />
        <circle cx="200" cy="80" r="5" fill="var(--sun-line)" opacity="0.5" />
        <circle cx="200" cy="80" r="2.2" fill="var(--jewel)" strokeWidth="0" opacity="0.9" />
      </g>

      {/* 中心太阳主齿轮（反向缓转）：太阳核心保留于此 */}
      <g className="spin-rev" stroke="var(--sun-line)">
        <circle cx="200" cy="200" r="40" fill="url(#sun-core)" strokeWidth="1.2" opacity="0.9" />
        <circle cx="200" cy="200" r="40" fill="#ffffff" filter="url(#sun-tex)" opacity="0.5" />
        <circle cx="200" cy="200" r="40" strokeWidth="8" strokeDasharray="3.5 3.48" opacity="0.6" />
        <circle cx="200" cy="200" r="32" strokeWidth="1.6" opacity="0.6" />
        <circle cx="200" cy="200" r="24" strokeWidth="0.8" opacity="0.5" />
        <path d={arcPath(200, 200, 26, 30, 85)} strokeWidth="1" opacity="0.5" />
        <path d={arcPath(200, 200, 26, 150, 205)} strokeWidth="1" opacity="0.5" />
        <path d={arcPath(200, 200, 26, 270, 325)} strokeWidth="1" opacity="0.5" />
      </g>

      {/* 卫星齿轮（与主轮咬合，正向快转） */}
      {satellites.map((sat) => (
        <g key={sat.key} transform={`translate(${sat.cx.toFixed(2)} ${sat.cy.toFixed(2)})`}>
          <g className="spin-center gear-sat" stroke="var(--sun-line)">
            <circle cx="0" cy="0" r="14" strokeWidth="6" strokeDasharray="3.6 3.73" opacity="0.6" />
            <circle cx="0" cy="0" r="10.5" strokeWidth="1.6" opacity="0.6" />
            <circle cx="0" cy="0" r="3" fill="var(--jewel)" strokeWidth="0" opacity="0.9" />
          </g>
        </g>
      ))}

      {/* 螺丝（表盘内侧） */}
      <g stroke="var(--sun-line)">
        {screws.map((screw) => (
          <g key={screw.key}>
            <circle cx={screw.cx} cy={screw.cy} r="3" fill="var(--sun-line)" opacity="0.35" />
            <line x1={screw.cx - 2.2} y1={screw.cy} x2={screw.cx + 2.2} y2={screw.cy} strokeWidth="1.2" opacity="0.7" />
          </g>
        ))}
      </g>

      {/* 指针：北京时间（时 / 分） */}
      <g stroke="var(--sun-line)">
        <line
          x1="200"
          y1="214"
          x2="200"
          y2="168"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.85"
          transform={`rotate(${hourAngle} 200 200)`}
        />
        <line
          x1="200"
          y1="220"
          x2="200"
          y2="155"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
          transform={`rotate(${minuteAngle} 200 200)`}
        />
      </g>
      {/* 中心轴 */}
      <circle cx="200" cy="200" r="9" stroke="var(--sun-line)" strokeWidth="1.6" opacity="0.8" />
      <circle cx="200" cy="200" r="3.5" fill="var(--sun-line)" strokeWidth="0" opacity="0.9" />
    </svg>
  )
}
