import { Box } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Vector3 } from 'three';

const Marker = ({ position, enableMarkers, onThumbnailSelect, name }) => {
  console.log(enableMarkers);
  const { gl, camera } = useThree();
  const canvas = gl.domElement;
  // console.log(position);
  const divRef = useRef(null);
  const markerRef = useRef();
  const elemRef = useRef();

  useEffect(() => {
    const labelContainerElem = document.querySelector('#labels');
    const label = renderToStaticMarkup(
      <Label
        name={name || 'garden'}
        // initialAnim={initialAnim}
        imageUrl={''}
        pos={position}
      />
    );
    const obj = markerRef.current;
    const elem = document.createElement('div');
    elem.addEventListener('click', (e) => {
      console.log('thumnail click');
      const elem = e.target.closest('#label-div');
      console.log(elem);
      const hdriName = elem.getAttribute('data-name');
      console.log(hdriName);
      onThumbnailSelect(hdriName);
    });
    elem.innerHTML = label;
    // obj.material.transparent = true;
    // obj.material.opacity = 0;
    // console.log(markerRef.current);
    labelContainerElem.appendChild(elem);

    elemRef.current = elem;
    return () => {
      elem.removeEventListener('click', (e) => {
        onClick(e, obj);
      });
      labelContainerElem.removeChild(elem);
    };
    // Calculate the 2D position of the Box on the canvas
    const canvasSize = {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };
    const vector = position.clone();
    vector.project(camera);
    const x = Math.round(((vector.x + 1) * canvasSize.width) / 2);
    const y = Math.round(((-vector.y + 1) * canvasSize.height) / 2);

    // Update the position of the div
    if (divRef.current) {
      divRef.current.style.left = `${x}px`;
      divRef.current.style.top = `${y}px`;
    }
  }, [canvas, camera, position]);

  const tempV = new Vector3();
  // console.log(markerRef.current);
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

const Label = ({ name, initialAnim, imageUrl, pos }) => {
  console.log(initialAnim);
  console.log(pos);

  return (
    <div
      data-pos={JSON.stringify(pos)}
      data-name={name}
      id='label-div'
      className={` ${
        initialAnim ? 'hidden' : 'flex'
      }  flex-col gap-2 w-max items-center pointer-events-auto text-cyan-100 `}>
      <div className='rounded-full bg-slate-900'>
        <img
          // src={`./buildings/${imageUrl}`}
          src='./vite.svg'
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
