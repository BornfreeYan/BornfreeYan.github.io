/**
 * Hero 背景的太阳纹章（程序化 SVG）：
 * 渐变太阳圆盘 + 日斑纹理 + 72 条长短交替射线 + 外层细环。
 * 颜色用 --sun-* CSS 变量（比 "Born Free" 水印更深、更金黄），缓慢旋转由 .sun-spin 驱动。
 */

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = ((start - 90) * Math.PI) / 180
  const e = ((end - 90) * Math.PI) / 180
  const large = end - start > 180 ? 1 : 0
  return `M ${(cx + r * Math.cos(s)).toFixed(2)} ${(cy + r * Math.sin(s)).toFixed(2)} A ${r} ${r} 0 ${large} 1 ${(cx + r * Math.cos(e)).toFixed(2)} ${(cy + r * Math.sin(e)).toFixed(2)}`
}

export function SunOrnament({ className }: { className?: string }) {
  const rays = Array.from({ length: 72 }, (_, i) => i * 5)
  const textureArcs = [30, 90, 150, 210, 270, 330]
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" role="presentation">
      <defs>
        <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--sun-core)" />
          <stop offset="70%" stopColor="var(--sun-deep)" />
          <stop offset="100%" stopColor="var(--sun-deep)" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      <g className="sun-spin" stroke="var(--sun-line)">
        {/* 太阳圆盘：渐变核心 + 细环纹理 + 日斑弧段 */}
        <circle cx="200" cy="200" r="58" fill="url(#sun-core)" strokeWidth="1.2" opacity="0.9" />
        <circle cx="200" cy="200" r="42" strokeWidth="0.8" opacity="0.5" />
        <circle cx="200" cy="200" r="28" strokeWidth="0.8" opacity="0.45" />
        {textureArcs.map((a) => (
          <path key={a} d={arcPath(200, 200, 35, a, a + 55)} strokeWidth="1.2" opacity="0.55" />
        ))}

        {/* 射线：长 / 中 / 短 三档交替 */}
        {rays.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <line
              x1="200"
              y1="62"
              x2="200"
              y2={deg % 15 === 0 ? 195 : deg % 5 === 0 ? 155 : 120}
              strokeWidth="1"
              opacity="0.6"
            />
          </g>
        ))}

        {/* 外层细环 */}
        <circle cx="200" cy="200" r="190" strokeWidth="1" opacity="0.5" />
      </g>
    </svg>
  )
}
