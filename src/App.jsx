import { Canvas } from '@react-three/fiber';
import CanvasWrapper from './Components/ThreeJS/CanvasWrapper';
import Flex from './Components/UIHelpers/Flex';
import Section from './Components/UIHelpers/Section';
import { useEffect, useState } from 'react';
import Home from './Components/UI/Home';
import About from './Components/UI/About';
import { motion } from 'framer-motion';

import { Label } from './Components/ThreeJS/Marker';
import { propertyData } from './Components/constants';

function App() {
  const [hdri, sethdri] = useState('forest');
  const [showAbout, setShowAbout] = useState(false);

  const onThumbnailSelect = (hdriname) => {
    console.log(hdriname);
    console.log('Thumbnail Selected ');
    sethdri(hdriname);
    setShowNextMaps(hdriname === 'forest' ? false : true);
  };
  const [showNextMaps, setShowNextMaps] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const toggleAbout = () => {
    setShowAbout((s) => !s);
  };

  return (
    <div className='App w-full'>
      <div className='absolute z-0 w-screen h-screen'>
        <div className='relative h-full w-full'>
          {/* <div className='absolute w-full h-full -top-52'>
            <img src={BG1} alt='' className='object-cover' />
          </div> */}
          {/* <SheetProvider sheet={sheet}> */}
          <motion.div
            // variants={container}
            // initial='hidden'
            // animate='show'
            className='absolute overflow-hidden h-full w-full pointer-events-none top-0 left-0 z-10'
            id={'labels'}></motion.div>

          <Canvas>
            <CanvasWrapper hdri={hdri} onThumbnailSelect={onThumbnailSelect} />
          </Canvas>
          {/* </SheetProvider> */}
        </div>
      </div>
      <div className='absolute z-10 w-full'>
        <div className='h-40 bg-gray400   w-full'>
          <Section.Fit>
            <Home toggleAbout={toggleAbout} />
          </Section.Fit>
        </div>
        {showAbout && (
          <Section.Fit
            className='absolute  bg-green-900 bg-opacity-70 bottom-100 h-max right-0 m-0 -mt-12 '
            style={{ maxWidth: '30vw' }}>
            <About />
          </Section.Fit>
        )}
        {showNextMaps && (
          <div className='w-fit absolute left-10'>
            <Flex.Col className='gap-5'>
              {propertyData.map((item, i) => {
                return (
                  <Label
                    // name={item.name}
                    hdri={item.hdri}
                    imageUrl={item.image}
                    onThumbnailSelect={onThumbnailSelect}
                  />
                );
              })}
              {/* <Flex.Col className='items-center justify-cente'>
                <div className='w-fit'>
                  <img
                    src='./vite.svg'
                    alt=''
                    className='object-cover h-16 w-16 rounded-full border-2'
                  />
                </div>
                <h1 className='w-fit font-poppins font-semibold text-slate-200 text-lg'>
                  ksdjf
                </h1>
              </Flex.Col> */}
            </Flex.Col>
          </div>
        )}
      </div>
    </div>
  );
}
// studio.initialize();
// studio.extend(extention);
export default App;
