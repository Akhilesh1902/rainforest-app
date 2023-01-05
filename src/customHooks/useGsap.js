import { useThree } from '@react-three/fiber';
import React, { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';

const useGsap = (userType, ctrlref) => {
  const [enabled, setEnabled] = useState(false);
  const { camera } = useThree();
  const [type, setType] = useState(userType);
  const [done, setDone] = useState(false);

  const initialCameraData = [
    {
      pos: {
        x: -24.37509682250806,
        y: 17.83611007561217,
        z: -26.20050083808467,
      },
      rotation: { x: -1.57, y: -0.002, z: -3.08 },
    },
    {
      pos: {
        x: -3.8718716268528954,
        y: 24.201013600194106,
        z: -41.57152597357387,
      },
      rotation: {
        x: -2.5274842877457004,
        y: 0.10696724612018954,
        z: -3.0664606361670845,
      },
    },
    {
      pos: {
        x: 2.559235501354898,
        y: 17.126133843186388,
        z: -44.397007722058696,
      },
      rotation: {
        x: -2.886888859093818,
        y: -0.045671581897097864,
        z: -3.1297063639924283,
      },
    },
    {
      // pos: { x: 0.36, y: 8.075, z: -14.067 },
      pos: {
        x: -2.0399999999999987,
        y: 14.130000000000017,
        z: -26.500000000000025,
      },
      rotation: {
        x: -2.651733262855006,
        y: -0.06782388569014837,
        z: -3.1054718831033807,
      },
    },
  ];
  const onInitailAnimationComplete = () => {
    console.log('complete');
    ctrlref.enabled = true;
    setEnabled(false);
    setDone(true);
  };
  useLayoutEffect(() => {
    const duration = 3;

    let ctx = gsap.context(() => {
      //   console.log(tl);
      console.log(ctrlref);
      //   console.log(userType);
      if (userType === 'initial' && ctrlref && !done) {
        const tl = gsap.timeline({
          onStart: () => {
            console.log('start');
            ctrlref.enabled = false;
            setEnabled(true);
          },
          onComplete: () => {
            onInitailAnimationComplete();
          },
        });
        console.log('initalUser');
        // return;
        initialCameraData.forEach((data, i) => {
          tl.to(
            camera.position,
            { ...data.pos, duration, ease: 'ease-in' },
            duration * i
          );
          tl.to(
            camera.rotation,
            {
              ...data.rotation,
              duration,
              ease: 'ease-in',
            },
            duration * i
          );
        });
        console.log('after loop');
        console.log(tl._last);
      }
    });
    return () => ctx.revert();
  }, [userType, camera, ctrlref]);

  return [enabled, type, setType];
};

export default useGsap;
