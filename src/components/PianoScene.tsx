import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

/**
 * 典雅风格化三角钢琴模型
 * 程序化生成，不依赖外部模型文件
 */
function GrandPiano() {
  const groupRef = useRef<THREE.Group>(null)

  // 典雅配色：高光黑漆 + 抛光黄铜 + 象牙白键
  const bodyColor = '#0a0a0a'
  const accentColor = '#d4af37'
  const keyWhiteColor = '#f7f3ec'
  const keyBlackColor = '#151515'

  // 优雅缓慢自转（约 45 秒一圈）
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = (t * 0.14) % (Math.PI * 2)
  })

  // 琴键生成
  const keys = useMemo(() => {
    const whiteKeyCount = 30
    const keyWidth = 0.13
    const keyDepth = 0.5
    const whiteKeyHeight = 0.035
    const blackKeyHeight = 0.055
    const blackKeyDepth = 0.28
    const blackKeyWidth = 0.075
    const startX = -(whiteKeyCount * keyWidth) / 2

    const whiteKeys: { position: [number, number, number]; args: [number, number, number] }[] = []
    const blackKeys: { position: [number, number, number]; args: [number, number, number] }[] = []

    for (let i = 0; i < whiteKeyCount; i++) {
      const x = startX + i * keyWidth + keyWidth / 2
      whiteKeys.push({
        position: [x, 0, 0],
        args: [keyWidth * 0.9, whiteKeyHeight, keyDepth],
      })

      const noteIndex = i % 7
      if (noteIndex === 0 || noteIndex === 1 || noteIndex === 3 || noteIndex === 4 || noteIndex === 5) {
        const blackX = x + keyWidth / 2
        blackKeys.push({
          position: [blackX, blackKeyHeight / 2 + whiteKeyHeight / 2, -keyDepth / 2 + blackKeyDepth / 2],
          args: [blackKeyWidth, blackKeyHeight, blackKeyDepth],
        })
      }
    }

    return { whiteKeys, blackKeys }
  }, [])

  return (
    <group ref={groupRef} scale={0.85} position={[0, 0.1, 0]}>
      {/* 主体琴箱 */}
      <mesh position={[0, 0.35, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.5, 1.8]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.4}
          roughness={0.06}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          envMapIntensity={0.9}
        />
      </mesh>

      {/* 三角尾部 — 左侧长翼 */}
      <mesh position={[-1.3, 0.35, -0.8]} rotation={[0, -0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.5, 2.4]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.4}
          roughness={0.06}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          envMapIntensity={0.9}
        />
      </mesh>

      {/* 三角尾部 — 右侧尖角 */}
      <mesh position={[0.9, 0.35, -1.9]} rotation={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.5, 1.6]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.4}
          roughness={0.06}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          envMapIntensity={0.9}
        />
      </mesh>

      {/* 键盘床 / 前挡板 */}
      <mesh position={[0, 0.65, 1.05]} castShadow receiveShadow>
        <boxGeometry args={[4.0, 0.12, 0.75]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.35}
          roughness={0.08}
          clearcoat={0.9}
          clearcoatRoughness={0.05}
          envMapIntensity={0.7}
        />
      </mesh>

      {/* 白键 */}
      <group position={[0, 0.74, 1.05]}>
        {keys.whiteKeys.map((key, index) => (
          <mesh key={`white-${index}`} position={key.position} castShadow receiveShadow>
            <boxGeometry args={key.args} />
            <meshPhysicalMaterial
              color={keyWhiteColor}
              roughness={0.35}
              metalness={0.05}
              clearcoat={0.3}
              clearcoatRoughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* 黑键 */}
      <group position={[0, 0.74, 1.05]}>
        {keys.blackKeys.map((key, index) => (
          <mesh key={`black-${index}`} position={key.position} castShadow receiveShadow>
            <boxGeometry args={key.args} />
            <meshPhysicalMaterial
              color={keyBlackColor}
              roughness={0.15}
              metalness={0.2}
              clearcoat={0.6}
              clearcoatRoughness={0.08}
            />
          </mesh>
        ))}
      </group>

      {/* 琴盖 — 半开，展示内部 */}
      <mesh position={[-0.3, 0.95, -0.2]} rotation={[0.22, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.05, 2.0]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.4}
          roughness={0.06}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          envMapIntensity={0.9}
        />
      </mesh>

      {/* 琴盖支撑杆 */}
      <mesh position={[-1.4, 0.75, 0.6]} rotation={[0, 0, 0.25]} castShadow receiveShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
        <meshPhysicalMaterial color={accentColor} metalness={0.9} roughness={0.15} />
      </mesh>

      {/* 前左腿 */}
      <mesh position={[-1.6, -0.25, 0.9]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.05, 0.8, 16]} />
        <meshPhysicalMaterial color={accentColor} metalness={0.9} roughness={0.12} clearcoat={0.6} />
      </mesh>
      {/* 前右腿 */}
      <mesh position={[1.6, -0.25, 0.9]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.05, 0.8, 16]} />
        <meshPhysicalMaterial color={accentColor} metalness={0.9} roughness={0.12} clearcoat={0.6} />
      </mesh>
      {/* 后中腿 */}
      <mesh position={[0, -0.25, -1.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.05, 0.8, 16]} />
        <meshPhysicalMaterial color={accentColor} metalness={0.9} roughness={0.12} clearcoat={0.6} />
      </mesh>

      {/* 脚轮 */}
      {[[-1.6, -0.65, 0.9], [1.6, -0.65, 0.9], [0, -0.65, -1.3]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow receiveShadow>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshPhysicalMaterial color={accentColor} metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* 踏板座 */}
      <mesh position={[0, -0.45, 1.2]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.12, 0.35]} />
        <meshPhysicalMaterial color={accentColor} metalness={0.85} roughness={0.15} />
      </mesh>

      {/* 踏板杆 */}
      <mesh position={[0, -0.32, 1.45]} rotation={[0.35, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshPhysicalMaterial color={accentColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 金色装饰线 */}
      <mesh position={[0, 0.62, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[4.0, 0.015, 2.0]} />
        <meshPhysicalMaterial color={accentColor} metalness={0.95} roughness={0.08} />
      </mesh>
    </group>
  )
}

/**
 * 3D 钢琴场景
 */
export default function PianoScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3.8, 4.2, 5.0], fov: 28, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow color="#fff8ee" />
        <pointLight position={[-4, 5, 4]} intensity={1.0} color="#c9a227" />
        <pointLight position={[4, 3, -4]} intensity={0.5} color="#f5f0e8" />
        <spotLight position={[0, 7, 0]} angle={0.5} penumbra={0.6} intensity={0.7} color="#ffffff" />
        <Environment preset="warehouse" />
        <GrandPiano />
      </Canvas>
    </div>
  )
}
