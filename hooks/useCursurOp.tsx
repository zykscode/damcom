'use client';

import $ from 'jquery';
import { useEffect } from 'react';

function useCursorOpEffect() {
  useEffect(() => {
    // Run jQuery code when component mounts
    $('.cursor-op').on('mouseenter mouseleave', function () {
      $('.class-name').text('open');
    });

    // Clean up jQuery events when component unmounts
    return () => {
      $('.cursor-op').off('mouseenter mouseleave');
    };
  }, []); // Run this effect only once when component mounts
}

export default useCursorOpEffect;
