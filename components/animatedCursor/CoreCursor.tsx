/* eslint-disable unused-imports/no-unused-vars */

'use client';

import React, { useRef } from 'react';

import CursorRender from './CursorRender';

const CoreCursor = ({ isVisible, options }: any) => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

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
