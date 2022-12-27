import { Canvas } from '@react-three/fiber';
import CanvasWrapper from './Components/ThreeJS/CanvasWrapper';
import Flex from './Components/UI/Flex';
import Section from './Components/UI/Section';
import { useState } from 'react';

function App() {
  const [hdri, sethdri] = useState('fields');

  const onThumbnailSelect = (hdriname) => {
    console.log(hdriname);
    console.log('Thumbnail Selected ');
    sethdri(hdriname);
  };

  return (
    <div className='App w-full'>
      <div className='absolute z-0 w-screen h-screen'>
        <div className='relative h-full w-full'>
          {/* <div className='absolute w-full h-full -top-52'>
            <img src={BG1} alt='' className='object-cover' />
          </div> */}
          {/* <SheetProvider sheet={sheet}> */}
          <div
            className='absolute overflow-hidden h-full w-full pointer-events-none top-0 left-0 z-10'
            id={'labels'}></div>

          <Canvas>
            <CanvasWrapper hdri={hdri} onThumbnailSelect={onThumbnailSelect} />
          </Canvas>
          {/* </SheetProvider> */}
        </div>
      </div>
      <div className='absolute z-10'>
        <div className='h-20 bg-gray-400 '>
          <Section.Fit>
            <Flex.Col>
              <h1>this is an app</h1>
              <h1>This is another app</h1>
            </Flex.Col>
          </Section.Fit>
        </div>
      </div>
    </div>
  );
}
// studio.initialize();
// studio.extend(extention);
export default App;
