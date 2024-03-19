'use client';

import React, { useEffect } from 'react';

import CoreCursor from './CoreCursor';

const AnimatedCursor = () => {
  const handleMouseMove = () => {
    // Handle mouse move logic here
  };

  const handleTouchStart = () => {
    // Handle touch start logic here
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleMouseMove, handleTouchStart]);

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return <CoreCursor />;
};

export default AnimatedCursor;
