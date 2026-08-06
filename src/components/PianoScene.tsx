import { useRef, useMemo } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

/**
 * 三角钢琴参考：真实比例与轮廓
 * 坐标系：世界 X = 钢琴左右，Y = 上下，Z = 前后（正方向朝向观众/琴键侧）
 */
function GrandPiano() {
  const groupRef = useRef<THREE.Group>(null)

  const bodyHeight = 0.12
  const legHeight = 0.52
  const lyreTopY = bodyHeight - 0.02
  const lyreBottomY = -legHeight
  const lyreLength = lyreTopY - lyreBottomY
  const pedalBeamY = lyreBottomY + 0.02

  // 材质
  const blackBody = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#222222',
        metalness: 0.35,
        roughness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        envMapIntensity: 1.5,
        side: THREE.DoubleSide,
      }),
    []
  )

  const gold = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#c9a227',
        metalness: 0.4,
        roughness: 0.4,
        clearcoat: 0.3,
        clearcoatRoughness: 0.1,
        envMapIntensity: 0.8,
      }),
    []
  )

  const soundboard = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e3c05b',
        roughness: 0.55,
        metalness: 0.3,
        emissive: '#4a3a15',
        emissiveIntensity: 0.25,
      }),
    []
  )

  const whiteKey = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#f7f3ec',
        roughness: 0.35,
        metalness: 0.02,
        clearcoat: 0.25,
        clearcoatRoughness: 0.2,
      }),
    []
  )

  const blackKey = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#111111',
        roughness: 0.12,
        metalness: 0.15,
        clearcoat: 0.5,
        clearcoatRoughness: 0.08,
      }),
    []
  )

  const rubber = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  )

  // 缓慢展示旋转
  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = (t * 0.12) % (Math.PI * 2)
  })

  // 三角钢琴俯视轮廓（琴键侧在 y = 0，琴尾向 +y 延伸）
  function makeOuterShape() {
    const s = new THREE.Shape()
    s.moveTo(-0.82, 0)
    s.lineTo(0.82, 0)
    s.bezierCurveTo(0.95, 0.55, 0.72, 1.6, 0.25, 2.2)
    s.bezierCurveTo(0.13, 2.28, -0.13, 2.28, -0.25, 2.2)
    s.bezierCurveTo(-0.72, 1.6, -0.95, 0.55, -0.82, 0)
    return s
  }

  function makeInnerShape(k: number) {
    const s = new THREE.Path()
    s.moveTo(-0.82 * k, 0)
    s.lineTo(0.82 * k, 0)
    // 注意：孔洞路径与外形方向相反（顺时针）
    s.bezierCurveTo(0.72 * k, 1.6 * k, 0.95 * k, 0.55 * k, 0.25 * k, 2.2 * k)
    s.bezierCurveTo(0.13 * k, 2.28 * k, -0.13 * k, 2.28 * k, -0.25 * k, 2.2 * k)
    s.bezierCurveTo(-0.95 * k, 0.55 * k, -0.72 * k, 1.6 * k, -0.82 * k, 0)
    return s
  }

  function makeScaledShape(k: number) {
    const s = new THREE.Shape()
    s.moveTo(-0.82 * k, 0)
    s.lineTo(0.82 * k, 0)
    s.bezierCurveTo(0.92 * k, 0.55 * k, 0.78 * k, 1.45 * k, 0.32 * k, 1.95 * k)
    s.bezierCurveTo(0.16 * k, 2.08 * k, -0.16 * k, 2.08 * k, -0.32 * k, 1.95 * k)
    s.bezierCurveTo(-0.78 * k, 1.45 * k, -0.92 * k, 0.55 * k, -0.82 * k, 0)
    return s
  }

  // 琴盖轮廓：比琴身略大一圈，形成自然的悬挑（cover）
  function makeLidShape() {
    const s = new THREE.Shape()
    s.moveTo(-0.84, 0)
    s.lineTo(0.84, 0)
    s.bezierCurveTo(0.97, 0.55, 0.74, 1.62, 0.26, 2.24)
    s.bezierCurveTo(0.13, 2.32, -0.13, 2.32, -0.26, 2.24)
    s.bezierCurveTo(-0.74, 1.62, -0.97, 0.55, -0.84, 0)
    return s
  }

  const bodyShape = useMemo(() => {
    const outer = makeOuterShape()
    outer.holes.push(makeInnerShape(0.88))
    return outer
  }, [])

  const lidShape = useMemo(() => makeLidShape(), [])
  const soundboardShape = useMemo(() => makeScaledShape(0.88), [])

  const bodyExtrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: bodyHeight,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 3,
    }),
    [bodyHeight]
  )

  const lidExtrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    }),
    []
  )

  // 琴键
  const keys = useMemo(() => {
    const whiteCount = 36
    const keyWidth = 0.045
    const keyDepth = 0.22
    const whiteKeyHeight = 0.012
    const blackKeyHeight = 0.024
    const blackKeyDepth = 0.13
    const blackKeyWidth = 0.027
    const startX = -(whiteCount * keyWidth) / 2
    const keyTopY = bodyHeight + whiteKeyHeight / 2
    const blackKeyTopY = bodyHeight + whiteKeyHeight + blackKeyHeight / 2

    const whiteKeys: { position: [number, number, number]; args: [number, number, number] }[] = []
    const blackKeys: { position: [number, number, number]; args: [number, number, number] }[] = []

    for (let i = 0; i < whiteCount; i++) {
      const x = startX + i * keyWidth + keyWidth / 2
      whiteKeys.push({
        position: [x, keyTopY, keyDepth / 2],
        args: [keyWidth * 0.92, whiteKeyHeight, keyDepth],
      })

      const noteIndex = i % 7
      if (noteIndex === 0 || noteIndex === 1 || noteIndex === 3 || noteIndex === 4 || noteIndex === 5) {
        const blackX = x + keyWidth / 2
        blackKeys.push({
          position: [blackX, blackKeyTopY, keyDepth / 2 - blackKeyDepth / 2 + 0.02],
          args: [blackKeyWidth, blackKeyHeight, blackKeyDepth],
        })
      }
    }

    return { whiteKeys, blackKeys }
  }, [bodyHeight])

  // 车削成型的琴腿（按 legHeight 缩放）
  const legProfile = useMemo(() => {
    const f = legHeight / 0.78
    const base = [
      [0.0, 0],
      [0.09, 0],
      [0.09, 0.04],
      [0.072, 0.12],
      [0.06, 0.28],
      [0.05, 0.48],
      [0.055, 0.62],
      [0.05, 0.72],
      [0.06, 0.76],
      [0.05, 0.78],
      [0.0, 0.78],
    ]
    return base.map(([x, y]) => new THREE.Vector2(x, y * f))
  }, [legHeight])

  function Leg({ position }: { position: [number, number, number] }) {
    return (
      <group position={position}>
        {/* 琴腿本体：lathe 默认向 +Y 生长，这里绕 X 翻转 180°，让腿从琴身向下生长到地面 */}
        <mesh material={blackBody} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
          <latheGeometry args={[legProfile, 20]} />
        </mesh>
        {/* 顶部金色装饰环 */}
        <mesh material={gold} position={[0, -0.04, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.095, 0.095, 0.04, 16]} />
        </mesh>
        {/* 底部金色脚轮杯 */}
        <mesh material={gold} position={[0, -legHeight, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
        {/* 橡胶轮 */}
        <mesh material={rubber} position={[0, -legHeight, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
        </mesh>
      </group>
    )
  }

  return (
    <group ref={groupRef} scale={0.9} position={[0, 0.35, 0]}>
      {/* 琴身主体：带孔洞的木质边框（scale.z=-1 让厚度向上生长） */}
      <mesh material={blackBody} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, -1]} position={[0, 0, 0]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, bodyExtrudeSettings]} />
      </mesh>

      {/* 金色音板（在琴身内部） */}
      <mesh material={soundboard} rotation={[Math.PI / 2, 0, 0]} position={[0, bodyHeight - 0.005, 0]} receiveShadow>
        <shapeGeometry args={[soundboardShape]} />
      </mesh>

      {/* 内部补光，让音板更明亮 */}
      <pointLight position={[0, bodyHeight + 0.15, -1.0]} intensity={0.8} color="#e3c05b" distance={4} />

      {/* 琴键床 */}
      <mesh material={blackBody} position={[0, bodyHeight - 0.02, 0.16]} castShadow receiveShadow>
        <boxGeometry args={[1.68, 0.04, 0.32]} />
      </mesh>

      {/* 白键 */}
      <group>
        {keys.whiteKeys.map((key, index) => (
          <mesh key={`white-${index}`} material={whiteKey} position={key.position} castShadow receiveShadow>
            <boxGeometry args={key.args} />
          </mesh>
        ))}
      </group>

      {/* 黑键 */}
      <group>
        {keys.blackKeys.map((key, index) => (
          <mesh key={`black-${index}`} material={blackKey} position={key.position} castShadow receiveShadow>
            <boxGeometry args={key.args} />
          </mesh>
        ))}
      </group>

      {/* 前挡板 / 键盖 */}
      <mesh material={blackBody} position={[0, bodyHeight + 0.05, 0.04]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.08, 0.08]} />
      </mesh>

      {/* 琴盖 — 闭合 */}
      <group position={[0, bodyHeight + 0.02, 0]} rotation={[0, 0, 0]}>
        <mesh material={blackBody} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, -1]} castShadow receiveShadow>
          <extrudeGeometry args={[lidShape, lidExtrudeSettings]} />
        </mesh>
        {/* 铰链金色线 */}
        <mesh material={gold} position={[0, 0, 0.001]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.012, 0.012, 1.72, 8]} />
        </mesh>
      </group>

      {/* 三条琴腿 */}
      <Leg position={[-0.62, 0, 0.05]} />
      <Leg position={[0.62, 0, 0.05]} />
      <Leg position={[0, 0, 2.0]} />

      {/* 踏板架 */}
      <group position={[0, 0, 0.2]}>
        {/* 两侧立柱 */}
        <mesh material={blackBody} position={[-0.11, (lyreTopY + lyreBottomY) / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.025, 0.02, lyreLength, 12]} />
        </mesh>
        <mesh material={blackBody} position={[0.11, (lyreTopY + lyreBottomY) / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.025, 0.02, lyreLength, 12]} />
        </mesh>
        {/* 顶部连接横梁 */}
        <mesh material={gold} position={[0, lyreTopY - 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.24, 8]} />
        </mesh>
        {/* 底部踏板横梁 */}
        <mesh material={gold} position={[0, pedalBeamY, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.28, 8]} />
        </mesh>
        {/* 三个踏板连杆 */}
        {[-0.08, 0, 0.08].map((x, i) => (
          <group key={i} position={[x, pedalBeamY, 0]}>
            <mesh material={gold} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.012, 0.012, 0.45, 8]} />
            </mesh>
            <mesh material={gold} position={[0, 0, 0.45]} castShadow receiveShadow>
              <boxGeometry args={[0.06, 0.02, 0.12]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

export default function PianoScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3.5, 1.5, 4.5], fov: 30, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow color="#fff8ee" />
        <directionalLight position={[-2, 3, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-4, 4, 3]} intensity={0.9} color="#c9a227" />
        <pointLight position={[4, 2, -4]} intensity={0.6} color="#f5f0e8" />
        <spotLight position={[0, 6, 0]} angle={0.5} penumbra={0.6} intensity={0.7} color="#ffffff" />

        {/* 轻量反射环境 */}
        <Environment resolution={256} background={false}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[4, 1, 1]} />
          <Lightformer intensity={3} rotation-y={0} position={[4, 1, -4]} scale={[2, 2, 1]} />
          <Lightformer intensity={3} rotation-y={Math.PI} position={[-4, 1, 4]} scale={[2, 2, 1]} />
          <Lightformer intensity={3} rotation-y={Math.PI / 2} position={[-5, 1, 0]} scale={[2, 2, 1]} />
          <Lightformer intensity={3} rotation-y={-Math.PI / 2} position={[5, 1, 0]} scale={[2, 2, 1]} />
        </Environment>

        <GrandPiano />

        {/* 地面阴影接收面 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.17, 0]} receiveShadow>
          <circleGeometry args={[2.5, 32]} />
          <shadowMaterial opacity={0.25} />
        </mesh>
      </Canvas>
    </div>
  )
}
