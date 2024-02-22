'use client';

import { motion } from 'framer-motion';
import React, { useRef } from 'react';

import { useFollowPointer } from '#/hooks/use-follow-pointer';

const FollowPointer = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div
      ref={ref}
      className="box size-40 rounded-full bg-red-400"
      animate={{ x, y }}
      transition={{
        type: 'spring',
        damping: 3,
        stiffness: 50,
        restDelta: 0.001,
      }}
    />
  );
};

export default FollowPointer;
