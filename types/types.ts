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

type CursorStyles = {
  cursorOuter: {
    width: string;
    height: string;
    backgroundColor: string;
  };
  cursorInner: {
    width: string;
    height: string;
    backgroundColor: string;
  };
  visible: {
    opacity: number;
  };
  hidden: {
    opacity: number;
  };
};

interface CursorRenderProps {
  cursorInnerRef: React.RefObject<HTMLDivElement>;
  cursorOuterRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  text?: string;
  options: Options;
  styles?: CursorStyles;
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

export type {
  AnimatedCursorProps,
  Clickable,
  Coordinates,
  CursorRenderProps,
  Options,
};
