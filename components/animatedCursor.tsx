/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

// AnimatedCursor.tsx
import React, { useEffect, useState } from 'react';

import useIsTouchDevice from '#/hooks/useIsTouchDevice';
import type { AnimatedCursorProps } from '#/types/types';

import CursorCore from './CursorCore';

/**
 * AnimatedCursor component
 *
 * This component renders a custom animated cursor with an outer and inner circle.
 * It checks if the current device is a touch device and renders the cursor only if it's not.
 *
 * @param {AnimatedCursorProps} props - Component props
 * @returns {JSX.Element | null} Rendered component or null if touch device
 */
function AnimatedCursor(props: AnimatedCursorProps) {
  const isTouchDevice = useIsTouchDevice();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Don't render the cursor on touch devices
  if (isTouchDevice) {
    return true;
  }

  // Hide the system cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <CursorCore {...props} isVisible={isVisible} setIsVisible={setIsVisible} />
  );
}

export default AnimatedCursor;
