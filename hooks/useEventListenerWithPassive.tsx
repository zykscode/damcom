/* eslint-disable consistent-return */

'use client';

import { useEffect } from 'react';

export function useEventListenerWithPassive<K extends keyof WindowEventMap>(
  eventType: K,
  listener: (evt: WindowEventMap[K]) => void,
  element: EventTarget | null = window,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    if (!element) return;

    const optionsWithCapture = options || {};
    element.addEventListener(
      eventType,
      listener as EventListener,
      optionsWithCapture,
    );

    return () => {
      element.removeEventListener(
        eventType,
        listener as EventListener,
        optionsWithCapture,
      );
    };
  }, [eventType, listener, element, options]);
}
