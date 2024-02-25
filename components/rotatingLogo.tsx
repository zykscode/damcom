/* eslint-disable unused-imports/no-unused-vars */

'use client';

import {
  motion,
  useAnimationFrame,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useRef } from 'react';

import CurvedText from './curvedText';

const RotatingLogo = ({ baseVelocity = 100 }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // baseX.set(baseX.get() + moveBy);
  });

  // useMotionValueEvent(scrollY, 'change', (latest) =>
  //   // console.log(latest, velocityFactor.getVelocity()),
  // );
  return (
    <motion.div
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: 'linear',
        repeatDelay: 0,
      }}
      animate={{ rotate: 360 }}
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
  );
};

export default RotatingLogo;
