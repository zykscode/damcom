'use client';

import { useEffect, useState } from 'react';

interface DeviceInfo {
  info: string;
  Android: () => RegExpMatchArray | null;
  BlackBerry: () => RegExpMatchArray | null;
  IEMobile: () => RegExpMatchArray | null;
  iOS: () => RegExpMatchArray | null;
  iPad: () => boolean;
  OperaMini: () => RegExpMatchArray | null;
  any: () => boolean;
}

const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    info: '',
    Android: () => null,
    BlackBerry: () => null,
    IEMobile: () => null,
    iOS: () => null,
    iPad: () => false,
    OperaMini: () => null,
    any: () => false,
  });

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent;

      setDeviceInfo((prevDeviceInfo) => ({
        ...prevDeviceInfo,
        info: ua,
        Android: () => ua.match(/Android/i),
        BlackBerry: () => ua.match(/BlackBerry/i),
        IEMobile: () => ua.match(/IEMobile/i),
        iOS: () => ua.match(/iPhone|iPad|iPod/i),
        iPad: () =>
          !!(
            ua.match(/Mac/) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2
          ),
        OperaMini: () => ua.match(/Opera Mini/i),
        any: () => {
          const { Android, BlackBerry, iOS, iPad, OperaMini, IEMobile } =
            prevDeviceInfo;
          return !!(
            Android()?.length ||
            BlackBerry()?.length ||
            iOS()?.length ||
            iPad() ||
            OperaMini()?.length ||
            IEMobile()?.length
          );
        },
      }));
    }
  }, []);

  return deviceInfo;
};

export default useDeviceInfo;
