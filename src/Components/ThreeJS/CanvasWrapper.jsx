import {
  Box,
  Environment,
  EnvironmentMap,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { MOUSE, Vector3 } from 'three';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';
import { BG } from '../../assets/images';
import useGsap from '../../customHooks/useGsap';
import BackgroundPlane from './BackgroundPlane';
import ForestMap from './ForestMap';
import Marker from './Marker';

const CanvasWrapper = () => {
  const { camera } = useThree();
  const bgtexture = useTexture(BG);

  useEffect(() => {
    if (camera) {
      console.log('changing cam');
      console.log(camera);
      camera.fov = 30;
      camera.position.set(-0.516, 7.076, -16.788);
      camera.rotation.set(-2.012, -0.045, -3.045);
      ctrlRef.current.enabled = true;
      console.log(camera);
    }
  }, [camera]);
  //   x: -0.5162350414046275
  // y: 7.070801880238701
  // z: -16.788346457083616

  // _x: -2.0127386628304444
  // _y: -0.04560897519171728
  // _z: -3.045529459100607

  useFrame(() => {
    const minPan = new Vector3(-14, 0, -15);
    const maxPan = new Vector3(9, 21.5, 15);
    ctrlRef.current.target.clamp(minPan, maxPan);
  });
  const ctrlRef = useRef();
  const [enabled] = useGsap('initial', ctrlRef.current);
  console.log(enabled);
  const [markerPoints] = useState([
    new Vector3(8, 0, 5),
    // new Vector3(3, 0, 3),
    new Vector3(-5, 0, -8),
    new Vector3(-5, 0, 4),
    new Vector3(5, 0, -2),
  ]);
  return (
    <>
      <directionalLight color={0xe2ffa1} position={[1, 1, 1]} intensity={1} />
      <ambientLight color={0xffffff} intensity={0.3} />
      <OrbitControls
        ref={ctrlRef}
        // panSpeed={3}
        // enableRotate={false}
        minDistance={25}
        maxDistance={35}
        zoomSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.1}
        // // enableRotate={false}
        minPolarAngle={degToRad(30)}
        maxPolarAngle={degToRad(60)}
        panSpeed={0.5}
        rotateSpeed={0.1}
        // enableRotate={false}
        // minAzimuthAngle={degToRad(0)}
        // maxAzimuthAngle={degToRad(10)}
        enabled={false}
        mouseButtons={{
          LEFT: MOUSE.PAN,
          RIGHT: MOUSE.ROTATE,
          MIDDLE: MOUSE.DOLLY,
        }}
      />
      <PerspectiveCamera makeDefault={true} />
      {/* <OrbitControls ref={ctrlRef} enabled={false} /> */}
      <ForestMap ctrlRef={ctrlRef} />
      <Environment files={'./fields.hdr'} background={'only'} intensity={0.5} />
      <Suspense>{/* <BackgroundPlane /> */}</Suspense>
      {/* <Box position={[-5, -5, -15]}></Box>
      <Box></Box> */}

      {!enabled &&
        markerPoints.map((point, i) => {
          return <Marker position={point} enableMarkers={!enabled} key={i} />;
        })}
    </>
  );
};

export default CanvasWrapper;
