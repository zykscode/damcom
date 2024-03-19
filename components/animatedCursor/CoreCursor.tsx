'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useEventListener } from '#/hooks/useEventListener';
import type { Coordinates } from '#/types/types';

import CursorRender from './CursorRender';

const CoreCursor = ({ isVisible, options }: any) => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });
  const [hasMouse, setHasMouse] = useState(false);

  const endX = useRef<number>(0);
  const endY = useRef<number>(0);

  const trailingSpeed = 10;

  // Handle mouse move event
  const onMouseMove = useCallback((event: MouseEvent) => {
    setHasMouse(true);
    const { clientX, clientY } = event;
    setCoords({ x: clientX, y: clientY });
    if (cursorInnerRef.current !== null) {
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
    }
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  // Handle touch start event
  const onTouchStart = useCallback(() => {
    setHasMouse(true);
  }, []);

  // Handle touch end event
  const onTouchEnd = useCallback(() => {
    setHasMouse(false);
  }, []);

  // Animate the outer cursor
  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== null) {
        coords.x += (endX.current - coords.x) / trailingSpeed;
        coords.y += (endY.current - coords.y) / trailingSpeed;
        if (cursorOuterRef.current !== null) {
          cursorOuterRef.current.style.top = `${coords.y}px`;
          cursorOuterRef.current.style.left = `${coords.x}px`;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [trailingSpeed],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateOuterCursor]);

  useEventListener('mousemove', onMouseMove);
  useEventListener('touchstart', onTouchStart);
  useEventListener('touchend', onTouchEnd);

  return (
    <CursorRender
      cursorInnerRef={cursorInnerRef}
      cursorOuterRef={cursorOuterRef}
      isVisible={isVisible && hasMouse}
      options={options}
    />
  );
};

export default CoreCursor;
