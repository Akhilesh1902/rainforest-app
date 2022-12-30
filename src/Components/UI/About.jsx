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
        staggerChildren: 0.3,
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
        <Flex.Col style={{ maxHeight: '70vh' }}>
          <motion.div
            variants={container}
            initial='hidden'
            animate='show'
            className='font-sans flex flex-col gap-2 text-slate-300'>
            <motion.h1
              variants={listItem}
              className={
                'text-2xl font-bold text-yellow-400 underline underline-offset-4'
              }>
              AXYZ GLobal Technology
            </motion.h1>
            <motion.h2
              variants={listItem}
              className='font-semibold text-yellow-200'>
              Lorem ipsum dolor sit amet.
            </motion.h2>
            <motion.p variants={listItem} className='first-letter:ml-10'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
              nesciunt. Quis laudantium, ullam eveniet magni quae voluptates a
              aspernatur maiores fugiat velit consequatur commodi possimus
              tempore, architecto magnam quasi alias assumenda asperiores? Odit,
              eaque unde ipsa earum velit iusto? Optio magnam sequi dolor
              accusamus aperiam delectus dolores placeat ut? Quas quaerat
            </motion.p>
            <motion.h2
              variants={listItem}
              className='font-semibold text-yellow-200'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
              impedit.
            </motion.h2>

            <motion.p variants={listItem} className='first-letter:ml-10'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,
              nesciunt. Quis laudantium, ullam eveniet magni quae voluptates a
              aspernatur maiores fugiat velit consequatur commodi possimus
              tempore, architecto magnam quasi alias assumenda asperiores? Odit,
              eaque unde ipsa earum velit iusto? Optio magnam sequi dolor
              accusamus aperiam delectus dolores placeat ut? Quas quaerat
            </motion.p>
          </motion.div>
        </Flex.Col>
      </Section.Yscroll>
    </>
  );
};

export default About;
