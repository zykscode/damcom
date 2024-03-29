import React from 'react';

import type { CursorRenderProps } from '#/types/types';

const CursorRender = ({
  cursorInnerRef,
  cursorOuterRef,
  isVisible,
  options,
  styles,
  text,
}: CursorRenderProps) => {
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

  console.log(isVisible);
  return (
    <>
      <div
        ref={cursorOuterRef}
        className={`${styles?.cursorOuter} size-24 bg-green-400 ${isVisible ? styles?.visible : 'hidden'}`}
        style={{
          ...coreStyles,
          ...(options?.outerStyle && options.outerStyle),
        }}
      />
      <div
        ref={cursorInnerRef}
        className={`size-24 bg-yellow-300  ${isVisible ? styles?.visible : 'hidden'}`}
        style={{
          ...coreStyles,
          ...(options?.innerStyle && options.innerStyle),
        }}
      >
        <div
          style={{
            opacity: !options?.children ? 0 : 1,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
};

export default CursorRender;
