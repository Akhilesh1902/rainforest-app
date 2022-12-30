import React from 'react';
import Flex from '../UIHelpers/Flex';
import Section from '../UIHelpers/Section';
import { motion } from 'framer-motion';

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <>
      <Section.Yscroll className=' m-0'>
        <Flex.Col>
          <motion.div
            variants={container}
            initial='hidden'
            animate='show'
            className='font-sans'>
            <motion.h1 variants={listItem} className={'text-2xl font-bold'}>
              AXYZ GLobal Technology
            </motion.h1>
            <motion.p variants={listItem} className='first-letter:ml-10'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
              nesciunt. Quis laudantium, ullam eveniet magni quae voluptates a
              aspernatur maiores fugiat velit consequatur commodi possimus
              tempore, architecto magnam quasi alias assumenda asperiores? Odit,
              eaque unde ipsa earum velit iusto? Optio magnam sequi dolor
              accusamus aperiam delectus dolores placeat ut? Quas quaerat
              aliquam impedit! Facilis suscipit voluptas cum doloribus, sapiente
              velit obcaecati voluptate consequuntur asperiores aliquid.
              Incidunt quasi perspiciatis temporibus natus enim sapiente
              accusamus nobis! Facere laudantium voluptate harum inventore
              nobis, soluta maiores, totam quos mollitia, odio sint! Iusto
              maxime laudantium accusamus blanditiis itaque, vero soluta,
              sapiente nam minus repellat qui.
            </motion.p>
          </motion.div>
        </Flex.Col>
      </Section.Yscroll>
    </>
  );
};

export default About;
