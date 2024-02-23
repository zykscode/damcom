/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useEventListener } from '#/hooks/useEventListener';
import useIsTouchdevice from '#/hooks/useIsTouchdevice';
import find from '#/lib/find';

interface Clickable {
  target: string;
}

interface Options {
  children?: React.ReactNode;
  color: string;
  innerScale: number;
  innerSize: number;
  innerStyle?: React.CSSProperties;
  outerAlpha: number;
  outerScale: number;
  outerSize: number;
  outerStyle?: React.CSSProperties;
}

interface Coordinates {
  x: number;
  y: number;
}

interface AnimatedCursorProps {
  clickables?: Array<string | Clickable> | any;
  children?: React.ReactNode;
  color?: string;
  innerScale?: number;
  innerSize?: number;
  innerStyle?: React.CSSProperties;
  outerAlpha?: number;
  outerScale?: number;
  outerSize?: number;
  outerStyle?: React.CSSProperties;
  showSystemCursor?: boolean;
  trailingSpeed?: number;
}

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
  innerSize = 8,
  innerStyle,
  outerAlpha = 0.4,
  outerScale = 1,
  outerSize = 80,
  outerStyle,
  showSystemCursor = false,
  trailingSpeed = 8,
}: AnimatedCursorProps) {
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveClickable, setIsActiveClickable] = useState<boolean>(false);
  const endX = useRef<number>(0);
  const endY = useRef<number>(0);

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

  const getScaleAmount = (orignalSize: number, scaleAmount: number) => {
    return `${parseInt(String(orignalSize * scaleAmount), 10)}px`;
  };

  const scaleBySize = useCallback(
    (
      cursorRef: HTMLDivElement | null,
      orignalSize: number,
      scaleAmount: number,
    ) => {
      if (cursorRef) {
        cursorRef.style.height = getScaleAmount(orignalSize, scaleAmount);
        cursorRef.style.width = getScaleAmount(orignalSize, scaleAmount);
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
        .map((clickable: { target: any }) =>
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

  const coreStyles: React.CSSProperties = {
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
      width: !options.children ? '150px' : 'auto',
      height: !options.children ? '150px' : 'auto',
      backgroundColor: !options.children ? 'hsl(var(--drk))' : 'transparent',
      ...coreStyles,
      ...(options.innerStyle && options.innerStyle),
    },
    cursorOuter: {
      width: 'options.outerSize',
      height: options.outerSize,
      backgroundColor: `rgba(225, 255, 2, ${options.outerAlpha})`,
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
}

function AnimatedCursor(props: AnimatedCursorProps) {
  const isTouchdevice = useIsTouchdevice();
  if (typeof window !== 'undefined' && isTouchdevice) {
    return <></>;
  }
  return <CursorCore {...props} />;
}

export default AnimatedCursor;
