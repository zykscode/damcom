import React from 'react';

interface CurvedTextProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  letterSpacing?: number;
  textColor?: string;
  circlePathProps?: string;
  textPathProps?: React.SVGTextElementAttributes<SVGTextPathElement>;
  textProps?: React.SVGTextElementAttributes<SVGTextElement>;
}

const CurvedText: React.FC<CurvedTextProps> = ({
  text,
  textProps,
  textPathProps,
}) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" overflow="visible">
      <defs>
        <path
          id="curve"
          d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
          strokeWidth="none"
          fill="transparent"
        />
      </defs>
      <text {...textProps}>
        <textPath
          href="#curve"
          className="font-sussie"
          startOffset="0" // Start text from the beginning of the path
          dominantBaseline="middle"
          {...textPathProps}
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default CurvedText;
