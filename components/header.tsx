'use client';

import { motion, useCycle } from 'framer-motion';
import React from 'react';

import Logo from './logo';
import MenuToggle from './menuToggle';

const container = {
  close: {},
  open: {},
};
const Header = ({ children }: any) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <header className="sticky top-0 z-20 flex h-24 justify-between overflow-hidden align-middle md:h-24 lg:h-32 ">
      <Logo />
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'close'}
        variants={container}
        className=" cursor-drag -mr-4 -mt-4 size-24 lg:-mt-6 lg:size-32 "
      >
        {children}
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.div>
    </header>
  );
};

export default Header;
