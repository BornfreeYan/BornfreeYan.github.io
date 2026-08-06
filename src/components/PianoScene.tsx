import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

/**
 * 风格化三角钢琴模型
 * 程序化生成，不依赖外部模型文件
 */
function GrandPiano() {
  const groupRef = useRef<THREE.Group>(null)

  // 配色：高光黑漆 + 金色点缀 + 象牙白键
  const bodyColor = '#0f0f0f'
  const accentColor = '#c9a227'
  const keyWhiteColor = '#f5f0e8'
  const keyBlackColor = '#1a1a1a'
  const legColor = '#c9a227'

  // 缓慢漂浮 + 自转
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.06
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.04
    groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.008
  })

  // 琴键生成
  const keys = useMemo(() => {
    const whiteKeyCount = 28
    const keyWidth = 0.14
    const keyDepth = 0.55
    const whiteKeyHeight = 0.04
    const blackKeyHeight = 0.05
    const blackKeyDepth = 0.32
    const blackKeyWidth = 0.08
    const startX = -(whiteKeyCount * keyWidth) / 2

    const whiteKeys: { position: [number, number, number]; args: [number, number, number] }[] = []
    const blackKeys: { position: [number, number, number]; args: [number, number, number] }[] = []

    for (let i = 0; i < whiteKeyCount; i++) {
      const x = startX + i * keyWidth + keyWidth / 2
      whiteKeys.push({
        position: [x, 0, 0],
        args: [keyWidth * 0.92, whiteKeyHeight, keyDepth],
      })

      // 黑键位置：C#, D#, F#, G#, A#
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
    <group ref={groupRef} scale={0.85} position={[-0.2, 0, 0]}>
      {/* 琴身主体 */}
      <mesh position={[0, 0.35, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.6, 2.2]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.5}
          roughness={0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* 琴身三角曲线部分（用斜切盒子模拟） */}
      <mesh position={[1.0, 0.35, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.6, 2.2]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.5}
          roughness={0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh position={[1.85, 0.35, -1.0]} rotation={[0, -0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.6, 1.8]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.5}
          roughness={0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* 键盘床 */}
      <mesh position={[0, 0.72, 0.95]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.12, 0.85]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.4}
          roughness={0.12}
          clearcoat={0.8}
          clearcoatRoughness={0.05}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* 白键 */}
      <group position={[0, 0.82, 1.05]}>
        {keys.whiteKeys.map((key, index) => (
          <mesh key={`white-${index}`} position={key.position} castShadow receiveShadow>
            <boxGeometry args={key.args} />
            <meshStandardMaterial color={keyWhiteColor} roughness={0.4} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* 黑键 */}
      <group position={[0, 0.82, 1.05]}>
        {keys.blackKeys.map((key, index) => (
          <mesh key={`black-${index}`} position={key.position} castShadow receiveShadow>
            <boxGeometry args={key.args} />
            <meshStandardMaterial color={keyBlackColor} roughness={0.2} metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* 琴盖（半开） */}
      <mesh position={[-0.2, 0.95, 0.1]} rotation={[0.25, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.06, 2.0]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.5}
          roughness={0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* 琴腿 */}
      <mesh position={[-1.5, -0.3, 0.9]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.9, 16]} />
        <meshStandardMaterial color={legColor} metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[1.5, -0.3, 0.9]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.9, 16]} />
        <meshStandardMaterial color={legColor} metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.8, -0.3, -1.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.9, 16]} />
        <meshStandardMaterial color={legColor} metalness={0.8} roughness={0.25} />
      </mesh>

      {/* 踏板座 */}
      <mesh position={[0, -0.55, 1.0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.15, 0.4]} />
        <meshStandardMaterial color={legColor} metalness={0.8} roughness={0.25} />
      </mesh>

      {/* 踏板 */}
      <mesh position={[0, -0.35, 1.2]} rotation={[0.3, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 金色装饰线 */}
      <mesh position={[0, 0.67, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[4.0, 0.02, 2.4]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} />
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
        camera={{ position: [-0.3, 1.4, 6.8], fov: 30, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow color="#fff8ee" />
        <pointLight position={[-4, 4, 3]} intensity={0.9} color="#c9a227" />
        <pointLight position={[4, 3, -3]} intensity={0.5} color="#f5f0e8" />
        <spotLight position={[0, 6, 0]} angle={0.6} penumbra={0.5} intensity={0.6} color="#ffffff" />
        <Environment preset="warehouse" />
        <GrandPiano />
      </Canvas>
    </div>
  )
}
