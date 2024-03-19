'use client';

import React, { useCallback, useEffect, useState } from 'react';

import CoreCursor from './CoreCursor';

const AnimatedCursor = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleTouchStart, handleMouseLeave]);

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return <CoreCursor isVisible={isVisible} setIsVisible={setIsVisible} />;
};

export default AnimatedCursor;
