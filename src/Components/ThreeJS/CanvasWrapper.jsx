import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { MOUSE, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import useGsap from '../../customHooks/useGsap';
import ForestMap from './ForestMap';
import Marker from './Marker';
import { propertyData } from '../constants';

const CanvasWrapper = ({ onThumbnailSelect, hdri }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (camera) {
      console.log('changing cam');
      // console.log(camera);
      // console.log(hdri);
      if (hdri === 'fields') {
        camera.fov = 30;
      } else {
        camera.fov = 80;
      }
      camera.position.set(-0.516, 7.076, -16.788);
      camera.rotation.set(-2.012, -0.045, -3.045);
      ctrlRef.current.enabled = true;
      console.log(camera);
    }
  }, [camera, hdri]);

  useFrame(() => {
    const minPan = new Vector3(-10, 0, -15);
    const maxPan = new Vector3(9, 12, 5);
    // const maxPan = new Vector3(9, 21.5, 15);
    ctrlRef.current.target.clamp(minPan, maxPan);
  });
  // useFrame(({ clock }) => {
  //   if (fpc.current === undefined) return;
  //   fpc.current.update(clock.getElapsedTime());
  // });

  const ctrlRef = useRef();
  const [enabled] = useGsap('initial', ctrlRef.current);
  console.log(enabled);
  const [markerPoints] = useState([
    new Vector3(8, 0, 5),
    new Vector3(-5, 0, -8),
    new Vector3(-5, 0, 4),
    new Vector3(5, 0, -2),
  ]);

  useEffect(() => {
    if (!enabled) {
      console.log('here');
    }
  }, [enabled]);

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
        enablePan={hdri === 'fields' ? true : false}
        enableDamping={true}
        dampingFactor={0.1}
        // // enableRotate={false}
        minPolarAngle={degToRad(hdri === 'fields' ? 30 : 0)}
        maxPolarAngle={degToRad(hdri === 'fields' ? 60 : 180)}
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
      <Environment
        files={`./hdri/${hdri}.hdr`}
        background={'only'}
        intensity={0.5}
      />
      {hdri === 'forest' ? (
        <>
          <ForestMap ctrlRef={ctrlRef} />
          {!enabled &&
            markerPoints.map((point, i) => {
              return (
                <Marker
                  position={point}
                  onThumbnailSelect={onThumbnailSelect}
                  enableMarkers={!enabled}
                  key={i}
                  // imgUrl={propertyData[i].image}
                  // name={propertyData[i].name}
                  data={propertyData[i]}
                />
              );
            })}
        </>
      ) : (
        <>
          {/* <Box /> */}
          <Marker
            surroundMarker={true}
            position={[10, 0, 1]}
            enableMarkers={!enabled}
            name={'fields'}
            onThumbnailSelect={onThumbnailSelect}
            data={{ name: 'fields', hdri: 'fields', image: 'forest.jpg' }}
          />
        </>
      )}
    </>
  );
};

export default CanvasWrapper;
