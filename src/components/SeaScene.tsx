/**
 * Hero 底部海域 + 帆船（呼应站名 Born Free 与名字里的「帆」）：
 * 雾蓝渐变水域 + 流动波纹细线 + 金色细线帆船朝右上太阳驶去。
 * 颜色用 CSS 变量（--sea-* / --sail-* / --hull-*），动画纯 CSS，reduced-motion 下自动静止。
 */

// 生成一段横跨 width、含 periods 个周期的正弦波路径
function makeWave(baseY: number, amp: number, period: number, periods: number) {
  const h = period / 2
  let d = `M 0 ${baseY}`
  for (let i = 0; i < periods * 2; i++) {
    const x0 = i * h
    const peak = baseY + (i % 2 === 0 ? -amp : amp)
    d += ` C ${x0 + h / 4} ${peak}, ${x0 + (3 * h) / 4} ${peak}, ${x0 + h} ${baseY}`
  }
  return d
}

function Sailboat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} fill="none" role="presentation">
      <g stroke="var(--sun-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* 前帆 */}
        <path d="M150 42 L252 152 C220 130 185 110 150 98 Z" fill="var(--sail-fill)" strokeWidth="2" />
        {/* 主帆 */}
        <path d="M150 42 C182 64 212 98 218 142 L150 150 Z" fill="var(--sail-fill)" strokeWidth="2" />
        {/* 桅杆 */}
        <path d="M150 150 L150 36" strokeWidth="2.5" />
        {/* 船体 */}
        <path
          d="M24 152 C70 144 180 142 258 154 C280 158 290 166 286 174 C255 182 110 184 52 180 C28 178 18 170 24 152 Z"
          fill="var(--hull-fill)"
        />
        {/* 船尾小旗 */}
        <path d="M150 36 L192 42 L150 49 Z" fill="var(--sail-fill)" strokeWidth="1.5" />
        {/* 吃水线 / 尾波 */}
        <path d="M40 178 C90 174 150 174 200 178" strokeWidth="1.5" opacity="0.5" />
        <path d="M62 190 C112 187 162 187 212 191" strokeWidth="1.5" opacity="0.35" />
      </g>
    </svg>
  )
}

export function SeaScene() {
  const waves = [
    { y: 150, amp: 11, op: 0.5 },
    { y: 220, amp: 8, op: 0.38 },
    { y: 280, amp: 5, op: 0.28 },
  ]
  return (
    <>
      {/* 水域：底部 22% 高雾蓝渐变带 + 流动波纹 */}
      <div className="absolute inset-x-0 bottom-0 h-[22%] overflow-hidden z-[1]" aria-hidden>
        <div className="absolute inset-0 sea-bg" />
        <svg
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full wave-drift"
        >
          <g fill="none" stroke="var(--sea-line)">
            {waves.map((w, i) => (
              <g key={i}>
                <path d={makeWave(w.y, w.amp, 360, 4)} strokeWidth="1.4" opacity={w.op} />
                <path d={makeWave(w.y, w.amp, 360, 4)} strokeWidth="1.4" opacity={w.op} transform="translate(1440 0)" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* 帆船：金色细线，船头朝右上太阳，随浪轻微起伏 */}
      <div
        className="absolute right-[8%] bottom-[13%] w-[min(38vw,290px)] z-[3] boat-bob pointer-events-none"
        aria-hidden
      >
        <Sailboat className="w-full h-auto" />
      </div>
    </>
  )
}
