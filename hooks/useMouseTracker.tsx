'use client';

/* eslint-disable import/no-extraneous-dependencies */

import $ from 'jquery';
import { useEffect, useState } from 'react';

function useMouseOver() {
  const [hoveredElement, setHoveredElement] = useState<{
    className: string;
    element: HTMLElement | null;
  } | null>(null);

  useEffect(() => {
    const handleMouseOver = (event: any) => {
      const element = event.target as HTMLElement;
      const classNames = ['cursor-drag', 'cursor-op', 'cursor-click'];

      // Check if the target element has any of the specified class names
      const hoveredClass = classNames.find((className) =>
        element.classList.contains(className),
      );

      // Update the state based on whether the target element has any of the specified class names
      if (hoveredClass) {
        setHoveredElement({ className: hoveredClass, element });
      } else {
        setHoveredElement(null);
      }
    };

    $('.cursor-op').on('mouseenter', function () {
      $('.smallerCursor').text('open');
      console.log('mouse over cursor-op');
    });

    $('.cursor-drag').on('mouseenter', function () {
      $('.smallerCursor').text('drag');
      console.log('mouse over cursordarg');
    });

    document.body.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return hoveredElement;
}

export default useMouseOver;
