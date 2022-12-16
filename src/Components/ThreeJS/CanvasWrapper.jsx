import {
  Box,
  Environment,
  EnvironmentMap,
  OrbitControls,
  OrthographicCamera,
  useTexture,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';
import { BG } from '../../assets/images';
import BackgroundPlane from './BackgroundPlane';
import ForestMap from './ForestMap';

const CanvasWrapper = () => {
  const { camera } = useThree();
  const bgtexture = useTexture(BG);

  useEffect(() => {
    if (camera) {
      console.log(camera);
      camera.fov = 30;
    }
  }, [camera]);

  useFrame(() => {
    const minPan = new Vector3(-10, 0, -10);
    const maxPan = new Vector3(9, 21.5, 15);
    ctrlRef.current.target.clamp(minPan, maxPan);
  });
  const ctrlRef = useRef();
  return (
    <>
      <directionalLight color={0xffffff} position={[1, 1, 1]} intensity={1.5} />
      <ambientLight color={0xffffff} intensity={0.3} />
      {/* <OrbitControls
        ref={ctrlRef}
        panSpeed={3}
        minDistance={5}
        maxDistance={8}
        enableRotate={false}
        minPolarAngle={degToRad(0)}
        maxPolarAngle={degToRad(30)}
        minAzimuthAngle={degToRad(0)}
        maxAzimuthAngle={degToRad(10)}
      /> */}
      <OrbitControls ref={ctrlRef} />
      <ForestMap ctrlRef={ctrlRef} />
      <Environment files={'./forest.hdr'} background={'only'} intensity={0.5} />
      <Suspense>{/* <BackgroundPlane /> */}</Suspense>
    </>
  );
};

export default CanvasWrapper;
