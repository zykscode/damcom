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
    <header className="sticky top-0 z-20 flex h-[6rem] justify-between overflow-hidden align-middle md:h-[6rem] lg:h-[8rem] ">
      <Logo />
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'close'}
        variants={container}
        className=" -mr-4 -mt-4 size-[6rem] lg:-mt-6 lg:size-[8rem] "
      >
        {children}
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.div>
    </header>
  );
};

export default Header;
