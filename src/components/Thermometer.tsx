import React from 'react';

interface ThermometerProps {
  /** X position of the thermometer */
  svgX: number;
  /** Y position of the thermometer */
  svgY: number;
  /** Width of the thermometer */
  width: number;
  /** Height of the thermometer */
  height: number;
  /** Border radius of the thermometer corners */
  borderRadius?: number;
  /** Minimum temperature value */
  minTemp: number;
  /** Maximum temperature value */
  maxTemp: number;
  /** Current temperature value */
  currentTemp: number;
  /** Background color of the thermometer; defaults to a blue/red gradient */
  background?: string
}

const BORDER_WIDTH: number = 2;

/** Instance counter for unique gradient IDs; necessary to have different fills for each instance */
var instanceCount = 0;

/**
 * A thermometer component that displays a temperature value as a filled level.
 * Must be used within an SVG element.
 * @returns 
 */
export const Thermometer: React.FC<ThermometerProps> = ({ svgX, svgY, width, height, borderRadius = 0, minTemp, maxTemp, currentTemp, background }) => {

  const percentFilled = (currentTemp - minTemp) / (maxTemp - minTemp);

  return (
    <g transform={`translate(${svgX}, ${svgY})`}>
      <defs>
        <linearGradient id={`thermometerGradient${instanceCount++}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'blue', stopOpacity: 1 }} />
          {/* Make the red more opaque as we go up in temp to redden the gradient */}
          <stop offset={percentFilled} style={{ stopColor: 'red', stopOpacity: percentFilled }} />
          <stop offset={percentFilled} style={{ stopColor: 'white', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect
        // To simulate becoming redder as we heat up, we draw a filled blue rectangle
        // behind and make the red less opaque as we go up.
        x={0}
        y={0}
        width={width}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
        fill="blue"
      />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={borderRadius}
        ry={borderRadius}
        fill={background ?? `url(#thermometerGradient${instanceCount - 1})`}
        stroke="black"
        strokeWidth={BORDER_WIDTH}
      />
    </g>
  );
};
