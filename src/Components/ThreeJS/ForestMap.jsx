import { Box, Plane, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useState } from 'react';
import { DoubleSide, Vector3 } from 'three';
import { FullMap, HeightMap, NormalMap } from '../../assets/images';
import Cloud from './Cloud';
import Marker from './Marker';

const ForestMap = ({ ctrlRef }) => {
  const [texture, normalMap, heightMap] = useTexture([
    FullMap,
    NormalMap,
    HeightMap,
  ]);
  const planeRef = useRef();
  const { camera } = useThree();
  const [allPoints, setAllPoints] = useState([]);

  useEffect(() => {
    console.log('here');
    const handlekeyPress = (e) => {
      //   console.log(e);
      if (e.key === 'p') {
        console.log(ctrlRef.current);
        console.log({ pos: camera.position, rotation: camera.rotation });
        // console.log({ target: camera.getWorldDirection });
      }
    };
    document.addEventListener('keydown', handlekeyPress);
    return () => {
      document.removeEventListener('keydown', handlekeyPress);
    };
  });

  return (
    <>
      <Plane
        args={[64, 64, 64, 64]}
        ref={planeRef}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI]}>
        <meshStandardMaterial
          map={texture}
          side={DoubleSide}
          displacementMap={heightMap}
          displacementScale={8}
          bumpMap={heightMap}
          bumpScale={1}
        />
      </Plane>
      <Cloud />

      {/* <Box /> */}
    </>
  );
};

export default ForestMap;
