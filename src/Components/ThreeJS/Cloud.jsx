import { Plane, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { DoubleSide, Vector3 } from 'three';
import { CloudImg } from '../../assets/images';
const Cloud = () => {
  const map = useTexture(CloudImg);
  const posArr = [
    new Vector3(0, 1.01, 0),
    new Vector3(20, 1, 20),
    new Vector3(-20, 1.02, 10),
    new Vector3(20, 1.03, -10),
    new Vector3(-20, 1.04, -10),
    new Vector3(-20, 1.2, -10),
  ];
  const grpref = useRef();
  useFrame((_, delta) => {
    if (grpref.current.position.x > 50) {
      grpref.current.position.x = -50;
    }
    grpref.current.position.x += delta;
  });
  // console.log(grpref.current);
  return (
    <group ref={grpref} position={[0, 5, -15]}>
      {posArr.map((pos, i) => (
        <Plane
          position={pos}
          key={i}
          rotation-x={Math.PI / 2}
          scale={8}
          scale-x={16}>
          <meshStandardMaterial
            map={map}
            side={DoubleSide}
            transparent={true}
            opacity={0.6}
          />
        </Plane>
      ))}
    </group>
  );
};

export default Cloud;
