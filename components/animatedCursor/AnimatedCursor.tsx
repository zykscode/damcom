/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */

'use client';

// import React, { useCallback, useEffect, useState } from 'react';
// import CoreCursor from './CoreCursor';
// const AnimatedCursor = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const handleMouseMove = useCallback(() => {
//     setIsVisible(true);
//   }, []);
//   const handleTouchStart = useCallback(() => {
//     setIsVisible(false);
//   }, []);
//   const handleMouseLeave = useCallback(() => {
//     setIsVisible(false);
//   }, []);
//   useEffect(() => {
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('touchstart', handleTouchStart);
//     window.addEventListener('mouseleave', handleMouseLeave);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('touchstart', handleTouchStart);
//       window.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [handleMouseMove, handleTouchStart, handleMouseLeave]);
//   useEffect(() => {
//     document.body.style.cursor = 'none';
//     return () => {
//       document.body.style.cursor = 'auto';
//     };
//   }, []);
//   return <CoreCursor isVisible={isVisible} setIsVisible={setIsVisible} />;
// };
// export default AnimatedCursor;
import type { CSSProperties, ReactNode } from 'react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useEventListener } from '#/hooks/useEventListener';
import useIsTouchDevice from '#/hooks/useIsTouchDevice';
import find from '#/lib/find';

interface AnimatedCursorOptions {
  children?: ReactNode;
  color?: string;
  innerScale?: number;
  innerSize?: number;
  innerStyle?: CSSProperties;
  outerAlpha?: number;
  outerScale?: number;
  outerSize?: number;
  outerStyle?: CSSProperties;
}

type Clickable = string | ({ target: string } & AnimatedCursorOptions);

interface AnimatedCursorProps extends AnimatedCursorOptions {
  clickables?: Clickable[];
  showSystemCursor?: boolean;
  trailingSpeed?: number;
}

interface AnimatedCursorCoordinates {
  x: number;
  y: number;
}

const CursorCore: React.FC<AnimatedCursorProps> = ({
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
  color = '220, 90, 90',
  innerScale = 0.6,
  innerSize = 8,
  innerStyle,
  outerAlpha = 0.4,
  outerScale = 6,
  outerSize = 8,
  outerStyle,
  showSystemCursor = false,
  trailingSpeed = 8,
}) => {
  const defaultOptions = useMemo<AnimatedCursorOptions>(
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
  const [coords, setCoords] = useState<AnimatedCursorCoordinates>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [isActive, setIsActive] = useState<boolean | AnimatedCursorOptions>(
    false,
  );
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  const endX = useRef(0);
  const endY = useRef(0);

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

  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
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

  const getScaleAmount = (originalSize: number, scaleAmount: number) => {
    return `${parseInt(String(originalSize * scaleAmount), 10)}px`;
  };

  const scaleBySize = useCallback(
    (
      cursorRef: HTMLDivElement | null,
      originalSize: number,
      scaleAmount: number,
    ) => {
      if (cursorRef) {
        cursorRef.style.height = getScaleAmount(originalSize, scaleAmount);
        cursorRef.style.width = getScaleAmount(originalSize, scaleAmount);
      }
    },
    [],
  );

  const onMouseDown = useCallback(() => setIsActive(true), []);
  const onMouseUp = useCallback(() => setIsActive(false), []);
  const onMouseEnterViewport = useCallback(() => setIsVisible(true), []);
  const onMouseLeaveViewport = useCallback(() => setIsVisible(false), []);

  useEventListener('mousemove', onMouseMove);
  useEventListener('mousedown', onMouseDown);
  useEventListener('mouseup', onMouseUp);
  useEventListener('mouseover', onMouseEnterViewport);
  useEventListener('mouseout', onMouseLeaveViewport);

  useEffect(() => {
    if (isActive) {
      scaleBySize(
        cursorInnerRef.current,
        options.innerSize!,
        options.innerScale!,
      );
      scaleBySize(
        cursorOuterRef.current,
        options.outerSize!,
        options.outerScale!,
      );
    } else {
      scaleBySize(cursorInnerRef.current, options.innerSize!, 1);
      scaleBySize(cursorOuterRef.current, options.outerSize!, 1);
    }
  }, [
    options.innerSize,
    options.innerScale,
    options.outerSize,
    options.outerScale,
    scaleBySize,
    isActive,
  ]);

  useEffect(() => {
    if (isActiveClickable) {
      scaleBySize(
        cursorInnerRef.current,
        options.innerSize!,
        options.innerScale! * 1.2,
      );
      scaleBySize(
        cursorOuterRef.current,
        options.outerSize!,
        options.outerScale! * 1.4,
      );
    }
  }, [
    options.innerSize,
    options.innerScale,
    options.outerSize,
    options.outerScale,
    scaleBySize,
    isActiveClickable,
  ]);

  useEffect(() => {
    if (cursorInnerRef.current == null || cursorOuterRef.current == null)
      return;

    if (isVisible) {
      cursorInnerRef.current.style.opacity = '1';
      cursorOuterRef.current.style.opacity = '1';
    } else {
      cursorInnerRef.current.style.opacity = '0';
      cursorOuterRef.current.style.opacity = '0';
    }
  }, [isVisible]);

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

    clickableEls.forEach((el) => {
      if (!showSystemCursor) el.style.cursor = 'none';

      const clickableOptions =
        typeof clickables === 'object'
          ? find(
              clickables,
              (clickable: Clickable) =>
                typeof clickable === 'object' && el.matches(clickable.target),
            )
          : {};

      const options = {
        ...defaultOptions,
        ...clickableOptions,
      };

      el.addEventListener('mouseover', () => {
        setIsActive(true);
        setOptions(options);
      });
      el.addEventListener('click', () => {
        setIsActive(true);
        setIsActiveClickable(false);
      });
      el.addEventListener('mousedown', () => {
        setIsActiveClickable(true);
      });
      el.addEventListener('mouseup', () => {
        setIsActive(true);
      });
      el.addEventListener('mouseout', () => {
        setIsActive(false);
        setIsActiveClickable(false);
        setOptions(defaultOptions);
      });
    });

    return () => {
      clickableEls.forEach((el) => {
        const clickableOptions =
          typeof clickables === 'object'
            ? find(
                clickables,
                (clickable: Clickable) =>
                  typeof clickable === 'object' && el.matches(clickable.target),
              )
            : {};

        const options = {
          ...defaultOptions,
          ...clickableOptions,
        };

        el.removeEventListener('mouseover', () => {
          setIsActive(true);
          setOptions(options);
        });
        el.removeEventListener('click', () => {
          setIsActive(true);
          setIsActiveClickable(false);
        });
        el.removeEventListener('mousedown', () => {
          setIsActiveClickable(true);
        });
        el.removeEventListener('mouseup', () => {
          setIsActive(true);
        });
        el.removeEventListener('mouseout', () => {
          setIsActive(false);
          setIsActiveClickable(false);
          setOptions(defaultOptions);
        });
      });
    };
  }, [isActive, clickables, showSystemCursor, defaultOptions]);

  useEffect(() => {
    if (typeof window === 'object' && !showSystemCursor) {
      document.body.style.cursor = 'none';
    }
  }, [showSystemCursor]);

  const coreStyles: CSSProperties = {
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    transition:
      'opacity 0.15s ease-in-out, height 0.2s ease-in-out, width 0.2s ease-in-out',
  };

  const styles = {
    cursorInner: {
      width: !options.children ? options.innerSize : 'auto',
      height: !options.children ? options.innerSize : 'auto',
      backgroundColor: !options.children
        ? `rgba(${options.color}, 1)`
        : 'transparent',
      ...coreStyles,
      ...(options.innerStyle && options.innerStyle),
    },
    cursorOuter: {
      width: options.outerSize,
      height: options.outerSize,
      backgroundColor: `rgba(${options.color}, ${options.outerAlpha})`,
      ...coreStyles,
      ...(options.outerStyle && options.outerStyle),
    },
  };

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner}>
        <div
          style={{
            opacity: !options.children ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {options.children}
        </div>
      </div>
    </>
  );
};

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  children,
  clickables,
  color,
  innerScale,
  innerSize,
  innerStyle,
  outerAlpha,
  outerScale,
  outerSize,
  outerStyle,
  showSystemCursor,
  trailingSpeed,
}) => {
  const isTouchDevice = useIsTouchDevice();

  if (typeof window !== 'undefined' && isTouchDevice) {
    return null;
  }

  return (
    <CursorCore
      clickables={clickables}
      color={color}
      innerScale={innerScale}
      innerSize={innerSize}
      innerStyle={innerStyle}
      outerAlpha={outerAlpha}
      outerScale={outerScale}
      outerSize={outerSize}
      outerStyle={outerStyle}
      showSystemCursor={showSystemCursor}
      trailingSpeed={trailingSpeed}
    >
      {children}
    </CursorCore>
  );
};

export default AnimatedCursor;
