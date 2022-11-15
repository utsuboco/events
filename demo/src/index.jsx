import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import { emitEvent, useEvent, onEvent, offEvent } from '@utsubo/events'

const vanillaEvent = (e) =>
  console.log(`%c vanilla too get ${e}`, 'background: #fff; color: orange; padding:  7px 14px; font-weight: bold')
onEvent('test', vanillaEvent)

function ThingGreen() {
  useEffect(() => {
    console.log(`%c green mounted`, 'background: #fff; color: grey; padding:  7px 14px; font-weight: bold')
    return () =>
      console.log(`%c X green unmounted`, 'background: #fff; color: purple; padding:  7px 14px; font-weight: bold')
  })
  // this will too get trigger everytime emitEvent dispatch something
  useEvent(
    'test',
    (e) => {
      console.log(
        `%c trigger green on every event received ${e}`,
        'background: #fff; color: green; padding:  7px 14px; font-weight: bold',
      )
    },
    [],
  )
  // if component is mounted it will listen for changes
  // otherwise remove the event listener
  return (
    <mesh
      position-x={-3}
      onClick={(e) => {
        offEvent('test', vanillaEvent)
        emitEvent('test', 0)
      }}
    >
      <sphereBufferGeometry args={[0.75]} />
      <meshNormalMaterial />
    </mesh>
  )
}

function ThingRed() {
  const ref = useRef()
  const val = useRef(1)
  const [hideOtherThing, setHideOtherThing] = useState(false)
  // this will get trigger everytime emitEvent dispatch something
  useEvent('test', (e) => {
    console.log(
      `%c trigger red on every event received ${e}`,
      'background: #fff; color: red; padding:  7px 14px; font-weight: bold',
    )
    setHideOtherThing(e % 2)
  })
  // this will get trigger only one time
  useEvent(
    'test',
    (e) => {
      console.log(`%c trigger once ${e}`, 'background: #fff; color: orange; padding:  7px 14px; font-weight: bold')
    },
    { once: true },
  )

  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
  return (
    <group>
      <mesh ref={ref} onClick={(e) => emitEvent('test', val.current++)}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      {!hideOtherThing && <ThingGreen />}
    </group>
  )
}

createRoot(window.root).render(
  <Canvas>
    <ThingRed />
  </Canvas>,
)
