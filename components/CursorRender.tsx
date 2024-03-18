// CursorRender.tsx
import React from 'react';

import type { Options } from '#/types/types';

import styles from './AnimatedCursor.module.css';

/**
 * CursorRender component
 *
 * This component renders the inner and outer cursor elements with the provided styles and options.
 *
 * @param {CursorRenderProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */

interface CursorRenderProps {
  cursorInnerRef: React.RefObject<HTMLDivElement>;
  cursorOuterRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  options: Options;
}

function CursorRender({
  cursorInnerRef,
  cursorOuterRef,
  isVisible,
  options,
}: CursorRenderProps) {
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

  return (
    <>
      <div
        ref={cursorOuterRef}
        className={`${styles.cursorOuter} ${isVisible ? styles.visible : styles.hidden}`}
        style={{
          ...coreStyles,
          ...(options.outerStyle && options.outerStyle),
        }}
      />
      <div
        ref={cursorInnerRef}
        className={`${styles.cursorInner} ${isVisible ? styles.visible : styles.hidden}`}
        style={{
          ...coreStyles,
          ...(options.innerStyle && options.innerStyle),
        }}
      >
        <div
          style={{
            opacity: !options.children ? 0 : 1,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {options.children}
        </div>
      </div>
    </>
  );
}

export default CursorRender;
