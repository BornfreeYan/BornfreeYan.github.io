/**
 * Hero 右侧视觉：Born Free 主题的鎏金线条飞鸟图样
 * 纯 SVG + CSS 动效（轻漂浮 + 缓慢旋转的太阳光环），无 3D 依赖，零渲染风险。
 */
export function BirdEmblem() {
  return (
    <div className="relative w-full h-full rounded-[2rem] bg-card dark:bg-card-dark border border-border dark:border-border-dark flex items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 480 360"
        className="relative w-[84%] h-[84%] max-w-md float-slow"
        role="img"
        aria-label="鎏金线条的翱翔飞鸟，呼应 Born Free"
      >
        <defs>
          <linearGradient id="bird-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e3c05b" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
        </defs>

        {/* 太阳光环（缓慢旋转） */}
        <g className="sun-spin">
          <circle
            cx="240"
            cy="180"
            r="132"
            fill="none"
            stroke="url(#bird-gold)"
            strokeWidth="1.25"
            opacity="0.45"
            strokeDasharray="1 7"
          />
          <circle
            cx="240"
            cy="180"
            r="98"
            fill="none"
            stroke="url(#bird-gold)"
            strokeWidth="1.25"
            opacity="0.3"
            strokeDasharray="1 7"
          />
        </g>

        {/* 主飞鸟：对称翱翔双翼 + 尾羽 */}
        <g
          fill="url(#bird-gold)"
          fillOpacity="0.16"
          stroke="url(#bird-gold)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M240 205 C202 162 140 120 58 132 C92 154 138 176 240 218 Z" />
          <path d="M240 205 C278 162 340 120 422 132 C388 154 342 176 240 218 Z" />
          {/* 翼内纹理 */}
          <path d="M96 152 C122 162 150 173 178 185" fill="none" strokeWidth="1.5" />
          <path d="M384 152 C358 162 330 173 302 185" fill="none" strokeWidth="1.5" />
          {/* 尾羽 */}
          <path d="M240 218 C236 244 231 258 225 274" fill="none" />
          <path d="M240 218 C244 244 249 258 255 274" fill="none" />
        </g>

        {/* 远处的小鸟（象征自由） */}
        <g fill="none" stroke="url(#bird-gold)" strokeWidth="2" strokeLinecap="round" opacity="0.6">
          <path d="M110 262 l12 -9 l12 9" />
          <path d="M138 262 l12 -9 l12 9" />
          <path d="M332 96 l11 -8 l11 8" />
          <path d="M358 96 l11 -8 l11 8" />
        </g>

        {/* 点缀星芒 */}
        <g fill="url(#bird-gold)" opacity="0.7">
          <path d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z" transform="translate(88 88)" />
          <path d="M0 -12 L3.5 -3.5 L12 0 L3.5 3.5 L0 12 L-3.5 3.5 L-12 0 L-3.5 -3.5 Z" transform="translate(392 272)" />
        </g>
      </svg>
    </div>
  )
}
