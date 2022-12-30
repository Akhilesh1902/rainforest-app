import React from 'react';
import Flex from '../UIHelpers/Flex';
import { motion } from 'framer-motion';
import { ImFacebook2, ImLinkedin2 } from 'react-icons/im';
const Home = ({ toggleAbout }) => {
  const links = [<ImFacebook2 />, <ImLinkedin2 />, 'About'];

  const handleButtonClick = (e) => {
    // console.log(e.target.textContent);
    toggleAbout();
  };

  return (
    <Flex.Row className='m-0 justify-between'>
      <motion.div className='mr-19'>
        <img src='./logo.png' alt='' className='w-52' />
      </motion.div>
      <Flex.Row className='gap-6 bg-green-700 p-4 h-max self-center '>
        {links.map((link, i) => (
          <button
            className='font-bold font-sans text-slate-200 hover:scale-110'
            onClick={handleButtonClick}>
            {link}
          </button>
        ))}
        {/* <button>link</button> */}
        {/* <button>link</button> */}
        {/* <button>link</button> */}
      </Flex.Row>
    </Flex.Row>
  );
};

export default Home;
