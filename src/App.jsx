import { Canvas } from '@react-three/fiber';
import CanvasWrapper from './Components/ThreeJS/CanvasWrapper';
import Flex from './Components/UIHelpers/Flex';
import Section from './Components/UIHelpers/Section';
import { useEffect, useState } from 'react';
import Home from './Components/UI/Home';
import About from './Components/UI/About';
import { motion } from 'framer-motion';

function App() {
  const [hdri, sethdri] = useState('fields');
  const [showAbout, setShowAbout] = useState(false);

  const onThumbnailSelect = (hdriname) => {
    console.log(hdriname);
    console.log('Thumbnail Selected ');
    sethdri(hdriname);
  };

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
          <Section.Fit className='absolute w-1/2 bg-gray-400 bottom-100 h-max right-0 m-0 -mt-12 '>
            <About />
          </Section.Fit>
        )}
      </div>
    </div>
  );
}
// studio.initialize();
// studio.extend(extention);
export default App;
