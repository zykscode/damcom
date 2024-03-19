'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useEventListener } from '#/hooks/useEventListener';
import { useEventListenerWithPassive } from '#/hooks/useEventListenerWithPassive';
import type { Coordinates } from '#/types/types';

import CursorRender from './CursorRender';

const CoreCursor = ({ isVisible, setIsVisible, options }: any) => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });

  const endX = useRef<number>(0);
  const endY = useRef<number>(0);

  const trailingSpeed = 10;

  // Handle mouse move event
  const onMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    setCoords({ x: clientX, y: clientY });
    if (cursorInnerRef.current !== null) {
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
    }
    endX.current = clientX;
    endY.current = clientY;
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

  //   // Handle mouse down event
  //   const onMouseDown = useCallback(() => setIsActive(true), []);

  //   // Handle mouse up event
  //   const onMouseUp = useCallback(() => setIsActive(false), []);

  // Handle mouse enter viewport event
  const onMouseEnterViewport: EventListener = useCallback(
    (event: Event) => {
      const { clientX, clientY } = event as MouseEvent;
      const isWithinViewport =
        clientX >= 0 &&
        clientX <= window.innerWidth &&
        clientY >= 0 &&
        clientY <= window.innerHeight;

      if (isWithinViewport) {
        setIsVisible(true);
      }
    },
    [setIsVisible],
  );

  // Handle mouse leave viewport event
  const onMouseLeaveViewport: EventListener = useCallback(
    (event: Event) => {
      const { clientX, clientY } = event as MouseEvent;
      const isOutsideViewport =
        clientX < 0 ||
        clientX > window.innerWidth ||
        clientY < 0 ||
        clientY > window.innerHeight;

      if (isOutsideViewport) {
        setIsVisible(false);
      }
    },
    [setIsVisible],
  );

  useEventListener('mousemove', onMouseMove);
  //   useEventListener('mousedown', onMouseDown);
  //   useEventListener('mouseup', onMouseUp);
  useEventListenerWithPassive('mousemove', onMouseEnterViewport, window, {
    passive: true,
  });
  useEventListenerWithPassive('mousemove', onMouseLeaveViewport, window, {
    passive: true,
  });

  return (
    <CursorRender
      cursorInnerRef={cursorInnerRef}
      cursorOuterRef={cursorOuterRef}
      isVisible={isVisible}
      options={options}
    />
  );
};

export default CoreCursor;
