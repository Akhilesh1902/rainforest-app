import { Box } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Vector3 } from 'three';
import { motion } from 'framer-motion';
const Marker = ({ position, enableMarkers, onThumbnailSelect, data }) => {
  console.log(enableMarkers);
  const { gl, camera } = useThree();
  const canvas = gl.domElement;
  const markerRef = useRef();
  const elemRef = useRef();

  useEffect(() => {
    const labelContainerElem = document.querySelector('#labels');
    const label = renderToStaticMarkup(
      <Label
        name={data.name || 'garden'}
        // initialAnim={initialAnim}
        hdri={data.hdri}
        imageUrl={data.image}
        pos={position}
      />
    );
    const obj = markerRef.current;
    const elem = document.createElement('div');

    const onClick = (e) => {
      console.log('thumnail click');
      const elem = e.target.closest('#label-div');
      console.log(elem);
      const hdriName = elem.getAttribute('data-hdri');
      console.log(hdriName);
      onThumbnailSelect(hdriName);
      if (camera) {
        console.log('changing cam');
        // console.log(camera);
        // console.log(hdri);
        if (hdriName === 'fields') {
          camera.fov = 30;
        } else {
          camera.fov = 80;
        }
        camera.position.set(-0.516, 7.076, -16.788);
        camera.rotation.set(-2.012, -0.045, -3.045);
        ctrlRef.current.enabled = true;
        console.log(camera);
      }
    };

    elem.addEventListener('click', (e) => {
      onClick(e);
    });

    elem.innerHTML = label;
    obj.material.transparent = true;
    obj.material.opacity = 0;
    // console.log(markerRef.current);
    labelContainerElem.appendChild(elem);

    elemRef.current = elem;
    return () => {
      elem.removeEventListener('click', (e) => {
        onClick(e, obj);
      });
      labelContainerElem.removeChild(elem);
    };
  }, [canvas, camera, position]);

  const tempV = new Vector3();
  // console.log(markerRef.current);
  console.log(markerRef.current);
  console.log(enableMarkers);
  useFrame(() => {
    // console.log(markerRef.current);
    markerRef.current.updateWorldMatrix(true, false);
    // console.log({ pos: markerRef.current.position });
    markerRef.current.getWorldPosition(tempV);
    tempV.project(camera);
    const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight;
    elemRef.current.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    // data-pos={JSON.stringify(pos)}
    // console.log(elemRef.current);
    elemRef.current
      .querySelector('#label-div')
      .setAttribute(
        'data-pos',
        JSON.stringify(markerRef.current.getWorldPosition(new Vector3()))
      );
  });

  return <>{enableMarkers && <Box ref={markerRef} position={position} />}</>;
};

export default Marker;

export const Label = ({
  name,
  initialAnim,
  imageUrl,
  pos,
  hdri,
  onThumbnailSelect,
}) => {
  console.log(initialAnim);
  console.log(pos);

  return (
    <div
      data-pos={JSON.stringify(pos)}
      data-name={name}
      data-hdri={hdri}
      onClick={(e) => {
        console.log('clickie');
        const elem = e.target.closest('#label-div');
        const hdriName = elem.getAttribute('data-hdri');
        console.log(hdriName);
        onThumbnailSelect(hdriName);
      }}
      id='label-div'
      className={` ${
        initialAnim ? 'hidden' : 'flex'
      }  flex-col gap-2 w-max items-center pointer-events-auto text-cyan-100  cursor-pointer`}>
      <div className='rounded-full bg-slate-900'>
        <img
          src={`./hdri/${imageUrl}`}
          // src='./vite.svg'
          alt=''
          className='object-cover h-16 w-16 border-slate-300 border-2  rounded-full'
        />
      </div>
      <p className='text-2xl w-max font-poppins capitalize font-medium '>
        {name}
      </p>
    </div>
  );
};
