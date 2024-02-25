import type { SVGMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import React from 'react';

const circle = {
  close: {
    scale: 1.2,
    borderColor: '#0d0628',
    transition: { duration: 0.4 },
  },
  open: {
    scale: 1,
    borderColor: '#e9c6dd',
    transition: { duration: 0.4 },
  },
};

const Path = (
  props: React.JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>,
) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.875"
    stroke="yellow"
    strokeLinecap="round"
    {...props}
  />
);

function MenuToggle({ toggle }: any) {
  return (
    <motion.div
      className="flex size-full flex-col justify-center rounded-full border-2 "
      variants={circle}
    >
      <motion.button
        className="cursor-op size-1/2 self-center"
        onClick={toggle}
      >
        <svg className="" height={'100%'} width={'100%'} viewBox="0 0 100 100">
          <Path
            variants={{
              close: { d: 'M 20 40 L 80 40' },
              open: { d: 'M 20 30 L 80 70' },
            }}
          />
          <Path
            variants={{
              close: { d: 'M 20 60 L 80 60' },
              open: { d: 'M 20 70 L 80 30' },
            }}
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}

export default MenuToggle;
