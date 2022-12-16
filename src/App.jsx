import { Canvas } from '@react-three/fiber';
import CanvasWrapper from './Components/ThreeJS/CanvasWrapper';
import Flex from './Components/UI/Flex';
import Section from './Components/UI/Section';
import { BG, BG1 } from './assets/images';
import { Environment, EnvironmentMap } from '@react-three/drei';

function App() {
  return (
    <div className='App w-full'>
      <div className='absolute z-0 w-screen h-screen'>
        <div className='relative h-full w-full'>
          {/* <div className='absolute w-full h-full -top-52'>
            <img src={BG1} alt='' className='object-cover' />
          </div> */}
          <Canvas>
            <CanvasWrapper />
          </Canvas>
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

export default App;
