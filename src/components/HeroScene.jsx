import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei/core/Line";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import * as THREE from "three";
import { disciplines } from "../data/disciplines";

const HOME = new THREE.Vector3(0, 0.2, 8.4);
const ORIGIN = new THREE.Vector3();
// Stable Canvas configuration avoids camera reconfiguration on node hover.
const CAMERA = { position: HOME.toArray(), fov: 44 };
const GL = { alpha: true, antialias: true, powerPreference: "low-power" };
const DPR = [1, 1.5];
const rimVertex = `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }`;
const rimFragment = `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.3);
    gl_FragColor = vec4(uColor, rim * 0.44);
  }`;

function DisciplineOrbit({
  discipline,
  selected,
  hovered,
  active,
  dragging,
  onHover,
  onSelect,
  labelRefs,
}) {
  const satellite = useRef();
  const line = useRef();
  const marker = useRef();
  const phase = useRef(discipline.phase);
  const labelPoint = useMemo(() => new THREE.Vector3(), []);
  const emphasized = selected || hovered;
  const points = useMemo(
    () =>
      Array.from({ length: 161 }, (_, i) => {
        const angle = (i / 160) * Math.PI * 2;
        return [
          Math.cos(angle) * discipline.radius,
          Math.sin(angle) * discipline.radius * 0.66,
          0,
        ];
      }),
    [discipline.radius],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    // Hold a node still while it is being inspected or dragged.
    if (active && !hovered && !dragging.current)
      phase.current += dt * discipline.speed;
    satellite.current.position.set(
      Math.cos(phase.current) * discipline.radius,
      Math.sin(phase.current) * discipline.radius * 0.66,
      0,
    );
    const scale = THREE.MathUtils.damp(
      marker.current.scale.x,
      emphasized ? 1.25 : 1,
      6,
      dt,
    );
    marker.current.scale.setScalar(scale);
    line.current.material.opacity = THREE.MathUtils.damp(
      line.current.material.opacity,
      emphasized ? 0.8 : 0.24,
      5,
      dt,
    );
    const label = labelRefs.current[discipline.id];
    if (label) {
      satellite.current.getWorldPosition(labelPoint);
      labelPoint.y += 0.27;
      labelPoint.project(state.camera);
      const x = (labelPoint.x * 0.5 + 0.5) * state.size.width;
      const y = (-labelPoint.y * 0.5 + 0.5) * state.size.height;
      label.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;
    }
  });
  const enter = (event) => {
    event.stopPropagation();
    if (!dragging.current) onHover(discipline.id);
  };
  return (
    <group rotation={discipline.tilt}>
      <Line
        ref={line}
        points={points}
        color={discipline.color}
        lineWidth={emphasized ? 1.5 : 0.8}
        transparent
        opacity={emphasized ? 0.8 : 0.24}
      />
      <group
        ref={satellite}
        position={[
          Math.cos(discipline.phase) * discipline.radius,
          Math.sin(discipline.phase) * discipline.radius * 0.66,
          0,
        ]}
      >
        <group ref={marker}>
          <mesh
            onPointerOver={enter}
            onPointerOut={() => onHover(null)}
            onClick={(event) => {
              event.stopPropagation();
              if (event.delta <= 5) onSelect(discipline.id);
            }}
          >
            <sphereGeometry args={[0.23, 16, 12]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.085, 24, 16]} />
            <meshStandardMaterial
              color={discipline.color}
              emissive={discipline.color}
              emissiveIntensity={emphasized ? 1.2 : 0.45}
              roughness={0.28}
              metalness={0.3}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.009, 6, 32]} />
            <meshBasicMaterial
              color={discipline.color}
              transparent
              opacity={emphasized ? 0.9 : 0.3}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function SceneLifecycle({ onReady, onLost }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event) => {
      event.preventDefault();
      onLost(true);
    };
    canvas.addEventListener("webglcontextlost", lost);
    onReady(true);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      onReady(false);
    };
  }, [gl, onReady, onLost]);
  return null;
}

function OrbitalCore({
  active,
  selectedId,
  hoveredId,
  onHover,
  onSelect,
  resetSignal,
  labelRefs,
}) {
  const group = useRef();
  const core = useRef();
  const surface = useRef();
  const rim = useRef();
  const controls = useRef();
  const dragging = useRef(false);
  const resetting = useRef(false);
  const camera = useThree((state) => state.camera);
  const tint = useMemo(() => new THREE.Color(), []);
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color("#aa94ff") } }),
    [],
  );
  const preview = disciplines.find(
    (discipline) => discipline.id === (hoveredId || selectedId),
  );

  useEffect(() => {
    if (resetSignal) resetting.current = true;
  }, [resetSignal]);
  useFrame((state, delta) => {
    if (!active) return;
    const dt = Math.min(delta, 0.05);
    const ease = 1 - Math.exp(-5 * dt);
    if (resetting.current) {
      controls.current.enabled = false;
      camera.position.lerp(HOME, ease);
      controls.current.target.lerp(ORIGIN, ease);
      camera.lookAt(controls.current.target);
      if (camera.position.distanceTo(HOME) < 0.006) {
        controls.current.reset();
        controls.current.enabled = true;
        resetting.current = false;
      }
    } else controls.current.enabled = true;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      dragging.current ? 0 : state.pointer.x * 0.1,
      4,
      dt,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      dragging.current ? 0 : state.pointer.y * 0.06,
      4,
      dt,
    );
    core.current.rotation.y += dt * 0.055;
    tint.set(preview.color);
    surface.current.emissive.lerp(tint, ease);
    rim.current.uniforms.uColor.value.lerp(tint, ease);
  });

  return (
    <>
      <group ref={group}>
        <group ref={core} scale={1.08}>
          <mesh
            onPointerOver={(event) => {
              event.stopPropagation();
              onHover(null);
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <sphereGeometry args={[0.98, 48, 32]} />
            <meshPhysicalMaterial
              ref={surface}
              color="#172238"
              emissive="#aa94ff"
              emissiveIntensity={0.055}
              metalness={0.55}
              roughness={0.32}
              clearcoat={0.7}
              clearcoatRoughness={0.25}
            />
          </mesh>
          <mesh scale={1.025}>
            <sphereGeometry args={[0.98, 48, 32]} />
            <shaderMaterial
              ref={rim}
              uniforms={uniforms}
              vertexShader={rimVertex}
              fragmentShader={rimFragment}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh rotation={[1.14, 0.1, -0.4]}>
            <torusGeometry args={[1.015, 0.012, 8, 96]} />
            <meshStandardMaterial
              color="#b9eaff"
              emissive="#82c5f6"
              emissiveIntensity={0.6}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
          <mesh rotation={[-0.4, 0.8, 0.45]}>
            <torusGeometry args={[1.025, 0.006, 6, 96]} />
            <meshBasicMaterial color="#8299d2" transparent opacity={0.5} />
          </mesh>
        </group>
        {disciplines.map((discipline) => (
          <DisciplineOrbit
            key={discipline.id}
            discipline={discipline}
            selected={selectedId === discipline.id}
            hovered={hoveredId === discipline.id}
            active={active}
            dragging={dragging}
            onHover={onHover}
            onSelect={onSelect}
            labelRefs={labelRefs}
          />
        ))}
      </group>
      <OrbitControls
        ref={controls}
        enabled={active}
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        minPolarAngle={0.4}
        maxPolarAngle={Math.PI - 0.4}
        onStart={() => {
          dragging.current = true;
          onHover(null);
        }}
        onEnd={() => {
          dragging.current = false;
        }}
      />
    </>
  );
}

function HeroScene({ active, onReady, fallback, ...props }) {
  const [lost, setLost] = useState(false);
  const labelRefs = useRef({});
  if (lost) return fallback;
  return (
    <>
      <Canvas
        aria-hidden="true"
        dpr={DPR}
        frameloop={active ? "always" : "demand"}
        camera={CAMERA}
        gl={GL}
      >
        <SceneLifecycle onReady={onReady} onLost={setLost} />
        <hemisphereLight
          color="#bfd8ff"
          groundColor="#10102b"
          intensity={1.3}
        />
        <spotLight
          position={[-3, 4, 5]}
          color="#d6e5ff"
          intensity={65}
          angle={0.65}
          penumbra={1}
        />
        <directionalLight position={[3, 1, -2]} color="#9678ff" intensity={4} />
        <pointLight
          position={[-3, -2, 0]}
          color="#497fff"
          intensity={12}
          distance={9}
        />
        <OrbitalCore active={active} {...props} labelRefs={labelRefs} />
      </Canvas>
      <div className="scene-label-layer" aria-hidden="true">
        {disciplines.map((discipline) => (
          <span
            key={discipline.id}
            ref={(element) => {
              labelRefs.current[discipline.id] = element;
            }}
            className={`scene-node-label ${props.selectedId === discipline.id || props.hoveredId === discipline.id ? "is-highlighted" : ""}`}
            style={{ "--discipline-color": discipline.color }}
          >
            {discipline.number}
            <span>{discipline.label}</span>
          </span>
        ))}
      </div>
    </>
  );
}

export default memo(HeroScene);
