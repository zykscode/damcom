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

export type { AnimatedCursorProps, Clickable, Coordinates, Options };
