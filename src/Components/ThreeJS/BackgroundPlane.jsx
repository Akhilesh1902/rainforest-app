import { Plane, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { DoubleSide } from 'three';
import { BG } from '../../assets/images';

const BackgroundPlane = () => {
  const texture = useTexture(BG);
  const planeRef = useRef();
  const { camera } = useThree();

  useFrame((_, delta) => {
    planeRef.current?.quaternion.copy(camera.quaternion);
  });
  return (
    <>
      <Plane
        args={[200, 100, 128, 128]}
        ref={planeRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position-z={-100}>
        <meshStandardMaterial
          map={texture}
          side={DoubleSide}
          // displacementMap={heightMap}
          displacementScale={5}
        />
      </Plane>
      {/* <Box /> */}
    </>
  );
};

export default BackgroundPlane;
