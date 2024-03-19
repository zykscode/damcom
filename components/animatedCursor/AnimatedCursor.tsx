'use client';

import React, { useEffect, useState } from 'react';

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

  return hasMouse ? <div>AnimatedCursor mouse detected</div> : null;
};

export default AnimatedCursor;
