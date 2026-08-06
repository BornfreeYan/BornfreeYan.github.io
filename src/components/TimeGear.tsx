import { useEffect, useState } from 'react'

/**
 * Hero 中心的「机械手表」太阳（程序化 SVG + React）：
 * 不对称齿轮传动链——中心太阳齿轮 → G1 → G2 → G3 → 最外圈大齿轮，逐个相切咬合、逐级带动。
 * 齿轮参数由 Node 数学仿真验证（相切距离 + 全程无齿对齿冲突）。
 * 表盘刻度 + 罗马数字 + 摆轮 + 红宝石 + 螺丝；时/分针实时指向北京时间。
 */

interface Gear {
  cx: number
  cy: number
  r: number
  N: number
  period: number
  dir: 1 | -1
  phase: number
  sun?: boolean
}

const CHAIN: Gear[] = [
  { cx: 200, cy: 200, r: 24, N: 15, period: 90, dir: -1, phase: 215, sun: true },
  { cx: 163.96, cy: 174.76, r: 20, N: 13, period: 78, dir: 1, phase: 21.15 },
  { cx: 126.28, cy: 148.37, r: 26, N: 17, period: 102, dir: -1, phase: 24.41 },
  { cx: 86.08, cy: 195.59, r: 36, N: 24, period: 144, dir: 1, phase: 302.9 },
]
const RIM = { r: 150, N: 100, period: 600, dir: -1 as const, phase: 180.4 }

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

// 齿轮旋转样式：keyframe + 负延时实现初始相位
function gearSpin(g: { dir: 1 | -1; period: number; phase: number }): React.CSSProperties {
  return {
    animationName: g.dir === 1 ? 'spin-slow' : 'spin-rev',
    animationDuration: `${g.period}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDelay: `${-((g.phase / 360) * g.period)}s`,
  }
}

function Gear({ g }: { g: Gear }) {
  const teeth = Array.from({ length: g.N }, (_, k) => (360 / g.N) * k)
  return (
    <g transform={`translate(${g.cx} ${g.cy})`}>
      <g className="spin-center" style={gearSpin(g)} stroke="var(--sun-line)">
        {g.sun && (
          <>
            <circle r={24} fill="url(#sun-core)" strokeWidth="1" opacity="0.9" />
            <circle r={24} fill="#ffffff" filter="url(#sun-tex)" opacity="0.5" />
          </>
        )}
        {teeth.map((a) => (
          <line
            key={a}
            x1="0"
            y1={-(g.r - 1.5)}
            x2="0"
            y2={-(g.r + 4)}
            strokeWidth="1.6"
            opacity="0.6"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r={g.r} strokeWidth="2" opacity="0.55" />
        <circle r={g.r - 3} strokeWidth="0.8" opacity="0.4" />
      </g>
      <circle r="2.5" fill="var(--jewel)" strokeWidth="0" opacity="0.9" />
    </g>
  )
}

function RimGear() {
  const teeth = Array.from({ length: RIM.N }, (_, k) => (360 / RIM.N) * k)
  return (
    <g transform="translate(200 200)">
      <g className="spin-center" style={gearSpin(RIM)} stroke="var(--sun-line)">
        <circle r={RIM.r} strokeWidth="2" opacity="0.55" />
        <circle r={RIM.r - 3} strokeWidth="0.8" opacity="0.4" />
        {teeth.map((a) => (
          <line
            key={a}
            x1="0"
            y1={-(RIM.r + 1)}
            x2="0"
            y2={-(RIM.r - 4.5)}
            strokeWidth="1.4"
            opacity="0.6"
            transform={`rotate(${a})`}
          />
        ))}
      </g>
    </g>
  )
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
  const screws = [
    [330.4, 235],
    [235, 330.4],
    [235, 69.6],
    [330.4, 165],
  ]

  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" role="img" aria-label="机械手表内部，指针显示北京时间">
      <defs>
        <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sun-core)" />
          <stop offset="70%" stopColor="var(--sun-deep)" />
          <stop offset="100%" stopColor="var(--sun-deep)" stopOpacity="0.2" />
        </radialGradient>
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

      {/* 机芯桥环（骨架，静止） */}
      <circle cx="200" cy="200" r="126" stroke="var(--sun-line)" strokeWidth="0.8" opacity="0.22" strokeDasharray="2 6" />

      {/* 齿轮传动链：中心太阳 → G1 → G2 → G3 → 外圈大齿轮 */}
      <Gear g={CHAIN[0]} />
      <Gear g={CHAIN[1]} />
      <Gear g={CHAIN[2]} />
      <Gear g={CHAIN[3]} />
      <RimGear />

      {/* 摆轮（摆动） */}
      <g className="spin-center balance-swing" stroke="var(--sun-line)">
        <circle cx="200" cy="78" r="16" strokeWidth="1.6" opacity="0.7" />
        <line x1="200" y1="62" x2="200" y2="94" strokeWidth="1.2" opacity="0.6" />
        <line x1="184" y1="78" x2="216" y2="78" strokeWidth="1.2" opacity="0.6" />
        <circle cx="200" cy="78" r="5" fill="var(--sun-line)" opacity="0.5" />
        <circle cx="200" cy="78" r="2.2" fill="var(--jewel)" strokeWidth="0" opacity="0.9" />
      </g>

      {/* 表盘刻度（外圈，静止） */}
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
      <g fill="var(--sun-line)" opacity="0.55" fontFamily="Georgia, 'Times New Roman', serif" fontSize="16" textAnchor="middle">
        <text x="200" y="41">XII</text>
        <text x="365" y="204">III</text>
        <text x="200" y="369">VI</text>
        <text x="35" y="204">IX</text>
      </g>

      {/* 螺丝 */}
      <g stroke="var(--sun-line)">
        {screws.map(([sx, sy]) => (
          <g key={`${sx}-${sy}`}>
            <circle cx={sx} cy={sy} r="3" fill="var(--sun-line)" opacity="0.35" />
            <line x1={sx - 2.2} y1={sy} x2={sx + 2.2} y2={sy} strokeWidth="1.2" opacity="0.7" />
          </g>
        ))}
      </g>

      {/* 指针：北京时间（时 / 分，加长） */}
      <g stroke="var(--sun-line)">
        <line
          x1="200"
          y1="218"
          x2="200"
          y2="155"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.9"
          transform={`rotate(${hourAngle} 200 200)`}
        />
        <line
          x1="200"
          y1="222"
          x2="200"
          y2="138"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.9"
          transform={`rotate(${minuteAngle} 200 200)`}
        />
      </g>
      {/* 中心轴 */}
      <circle cx="200" cy="200" r="9" stroke="var(--sun-line)" strokeWidth="1.6" opacity="0.8" />
      <circle cx="200" cy="200" r="3.5" fill="var(--sun-line)" strokeWidth="0" opacity="0.9" />
    </svg>
  )
}
