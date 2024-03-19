/* eslint-disable no-param-reassign */
// CursorCore.tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useEventListener } from '#/hooks/useEventListener';
import find from '#/lib/find';
import type { Coordinates, Options } from '#/types/types';

import CursorRender from './CursorRender';

interface CursorCoreProps {
  clickables?: Array<string | { target: string }>;
  children?: React.ReactNode;
  color?: string;
  innerScale?: number;
  innerSize?: number;
  innerStyle?: React.CSSProperties;
  outerAlpha?: number;
  outerScale?: number;
  outerSize?: number;
  outerStyle?: React.CSSProperties;
  trailingSpeed?: number;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>; 
  
}

/**
 * CursorCore component
 *
 * This component handles the logic for rendering and animating the custom cursor.
 * It manages the cursor's position, scaling, and interactions with clickable elements.
 *
 * @param {CursorCoreProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
function CursorCore({
  clickables = [
    'a',
    'input[type="text"]',
    'input[type="email"]',
    'input[type="number"]',
    'input[type="submit"]',
    'input[type="image"]',
    'label[for]',
    'select',
    'textarea',
    'button',
    '.link',
  ],
  children,
  color = 'hsl(var(--drk))',
  innerScale = 1,
  innerSize = 90,
  innerStyle,
  outerAlpha = 0.4,
  outerScale = 1,
  outerSize = 90,
  outerStyle,
  trailingSpeed = 8,
  isVisible,
  setIsVisible,
}: CursorCoreProps) {
  const defaultOptions = useMemo<Options>(
    () => ({
      children,
      color,
      innerScale,
      innerSize,
      innerStyle,
      outerAlpha,
      outerScale,
      outerSize,
      outerStyle,
    }),
    [
      children,
      color,
      innerScale,
      innerSize,
      innerStyle,
      outerAlpha,
      outerScale,
      outerSize,
      outerStyle,
    ],
  );

  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveClickable, setIsActiveClickable] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>(defaultOptions);
  const endX = useRef<number>(0);
  const endY = useRef<number>(0);

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

  // Scale the cursor based on size and scale amount
  const scaleBySize = useCallback(
    (
      cursorRef: HTMLDivElement | null,
      originalSize: number,
      scaleAmount: number,
    ) => {
      if (cursorRef) {
        const scaledSize = parseInt(String(originalSize * scaleAmount), 10);
        cursorRef.style.height = `${scaledSize}px`;
        cursorRef.style.width = `${scaledSize}px`;
      }
    },
    [],
  );

  // Handle mouse down event
  const onMouseDown = useCallback(() => setIsActive(true), []);

  // Handle mouse up event
  const onMouseUp = useCallback(() => setIsActive(false), []);

  // Handle mouse enter viewport event
  const onMouseEnterViewport = useCallback(
    () => setIsVisible(true),
    [setIsVisible],
  );

  // Handle mouse leave viewport event
  const onMouseLeaveViewport = useCallback(
    () => setIsVisible(false),
    [setIsVisible],
  );

  // Add event listeners
  useEventListener('mousemove', onMouseMove);
  useEventListener('mousedown', onMouseDown);
  useEventListener('mouseup', onMouseUp);
  useEventListener('mouseover', onMouseEnterViewport);
  useEventListener('mouseout', onMouseLeaveViewport);

  // Scale the cursor based on active state
  useEffect(() => {
    if (isActive) {
      scaleBySize(
        cursorInnerRef.current,
        options.innerSize,
        options.innerScale,
      );
      scaleBySize(
        cursorOuterRef.current,
        options.outerSize,
        options.outerScale,
      );
    } else {
      scaleBySize(cursorInnerRef.current, options.innerSize, 1);
      scaleBySize(cursorOuterRef.current, options.outerSize, 1);
    }
  }, [
    isActive,
    options.innerSize,
    options.innerScale,
    options.outerSize,
    options.outerScale,
    scaleBySize,
  ]);

  // Scale the cursor based on active clickable state
  useEffect(() => {
    if (isActiveClickable) {
      scaleBySize(
        cursorInnerRef.current!,
        options.innerSize,
        options.innerScale * 1.2,
      );
      scaleBySize(
        cursorOuterRef.current!,
        options.outerSize,
        options.outerScale * 1.4,
      );
    }
  }, [
    isActiveClickable,
    options.innerSize,
    options.innerScale,
    options.outerSize,
    options.outerScale,
    scaleBySize,
  ]);

  // Add event listeners to clickable elements
  useEffect(() => {
    const clickableEls = document.querySelectorAll<HTMLElement>(
      clickables
        .map((clickable) =>
          typeof clickable === 'object' && clickable?.target
            ? clickable.target
            : clickable ?? '',
        )
        .join(','),
    );

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickableOptions =
        typeof clickables === 'object'
          ? find(
              clickables,
              (clickable) =>
                typeof clickable === 'object' &&
                target.matches(clickable.target),
            )
          : {};

      const newOptions = {
        ...defaultOptions,
        ...clickableOptions,
      };

      setIsActive(true);
      setOptions(newOptions);
    };

    const handleClick = () => {
      setIsActiveClickable(false);
    };

    const handleMouseDown = () => {
      setIsActiveClickable(true);
    };

    const handleMouseUp = () => {
      setIsActive(true);
    };

    const handleMouseOut = () => {
      setIsActive(false);
      setIsActiveClickable(false);
      setOptions(defaultOptions);
    };

    const addListeners = (el: HTMLElement) => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('click', handleClick);
      el.addEventListener('mousedown', handleMouseDown);
      el.addEventListener('mouseup', handleMouseUp);
      el.addEventListener('mouseout', handleMouseOut);
    };

    const removeListeners = (el: HTMLElement) => {
      el.removeEventListener('mouseover', handleMouseOver);
      el.removeEventListener('click', handleClick);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mouseout', handleMouseOut);
    };

    clickableEls.forEach(addListeners);

    return () => {
      clickableEls.forEach(removeListeners);
    };
  }, [clickables, defaultOptions]);

  return (
    <CursorRender
      cursorInnerRef={cursorInnerRef}
      cursorOuterRef={cursorOuterRef}
      isVisible={isVisible}
      options={options}
    />
  );
}

export default CursorCore;
