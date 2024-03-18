/* eslint-disable unused-imports/no-unused-vars */

'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useRef, useState } from 'react';

import CurvedText from './curvedText';

const RotatingLogo = ({ baseVelocity = 100 }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
    mass: 0.5,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [-2000, 0, 2000], // Adjust the velocity range for rotation speed
    [-10, 0, 10], // Adjust the rotation speed range
    {
      clamp: false,
    }
  );

  const [rotateDirection, setRotateDirection] = useState(1);
  const rotateX = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    let moveBy = rotateDirection * baseVelocity * (delta / 1000);

    // Use the smooth velocity factor to adjust the rotation speed
    moveBy += moveBy * Math.abs(velocityFactor.get());

    // Change rotation direction based on scroll direction
    if (scrollVelocity.get() > 0) {
      setRotateDirection(1);
    } else if (scrollVelocity.get() < 0) {
      setRotateDirection(-1);
    }

    rotateX.set(rotateX.get() + moveBy);
  });

  return (
    <div>
      <motion.div
        style={{ rotate: rotateX }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'linear',
          repeatDelay: 0,
        }}
        className="fixed bottom-2 right-2 size-12 overflow-hidden rounded-full border-2 px-1 md:size-24 md:px-2 "
      >
        <CurvedText
          text="DAMCOM  DAMCOM "
          textPathProps={{
            style: { fontSize: '1rem', letterSpacing: '0.7em' },
            offset: 0,
          }}
        />
        <div className="absolute left-[20%] top-[20%] size-3/5 rounded-full border-2 object-center"></div>
      </motion.div>
    </div>
  );
};

export default RotatingLogo;