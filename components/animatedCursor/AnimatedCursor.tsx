'use client';

import React, { useEffect, useState } from 'react';

import CoreCursor from './CoreCursor';

const AnimatedCursor = () => {
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setHasMouse(true);
    };

    const handleTouchStart = () => {
      setHasMouse(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return hasMouse ? <CoreCursor /> : null;
};

export default AnimatedCursor;
