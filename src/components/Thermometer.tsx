import React from 'react';
import { LABEL_SIZE, THERMOMETER_HEIGHT, TITLE_SIZE } from './constants';

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
  /** Bottom title of the thermometer */
  title: string;
  /** Whether to show axis labels */
  axisLabels?: boolean;
  /** Side to show tick marks, axis labels, etc on */
  axisSide?: 'left' | 'right';
}

const BORDER_WIDTH: number = 2;
/** Length for the longest scale line, used at 1/2 */
const SCALE_3_LENGTH: number = 30;
/** Length for the medium scale line, used at 1/5 */
const SCALE_2_LENGTH: number = 20;
/** Length for the shortest scale line, used at 1/10 */
const SCALE_1_LENGTH: number = 10;
/** X offset for labels */
const LABEL_X_OFFSET: number = 12;

/** Instance counter for unique gradient IDs; necessary to have different fills for each instance */
var instanceCount = 0;

/**
 * A thermometer component that displays a temperature value as a filled level.
 * Must be used within an SVG element.
 * @returns 
 */
export const Thermometer: React.FC<ThermometerProps> = ({ svgX, svgY, width, height, borderRadius = 0, minTemp, maxTemp, currentTemp, title, axisLabels = true, axisSide = 'right' }) => {

  const percentFilled = (currentTemp - minTemp) / (maxTemp - minTemp);
  const minMaxLineLength = axisLabels ? 100 : SCALE_3_LENGTH;
  /** Scale x direction multiplier; reverses scale for left axis */
  const scaleDir = axisSide === 'right' ? 1 : -1;

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
      {/* Axis scale tick lines group */}
      <g transform={`translate(${width / 2}, 0)`}>
        {/* Labels at 0 and 100 C */}
        <line x1={0} y1={0} x2={scaleDir * (width / 2 + minMaxLineLength)} y2={1} stroke="black" strokeWidth={2} />
        <line x1={0} y1={THERMOMETER_HEIGHT} x2={scaleDir * (width / 2 + minMaxLineLength)} y2={THERMOMETER_HEIGHT} stroke="black" strokeWidth={2} />
        {/* Lines marking 1/10 increments with longer lines at 1/5 increments */}
        {Array.from({ length: 10 }).map((_, i) => {
          if (i === 0) return null; // Skip the 0 line since we drew it above
          const y = (THERMOMETER_HEIGHT / 10) * i;
          const isLongLine = i % 2 === 0;
          return (
            <line
            key={i}
            x1={0}
            y1={y}
            x2={(i === 5 
              ? width / 2 + SCALE_3_LENGTH 
              : isLongLine 
                ? width / 2 + SCALE_2_LENGTH 
                : width / 2 + SCALE_1_LENGTH
            ) * scaleDir}
            y2={y}
            stroke="black"
            strokeWidth={2}
            />
          );
        })}
      </g>
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
        fill={`url(#thermometerGradient${instanceCount - 1})`}
        stroke="black"
        strokeWidth={BORDER_WIDTH}
      />
      {/* Text labels */}
      {axisLabels && (<>
        <text x={width + LABEL_X_OFFSET * scaleDir} y={15} fontSize={LABEL_SIZE}>{maxTemp}°C</text>
        <text x={width + LABEL_X_OFFSET * scaleDir} y={THERMOMETER_HEIGHT - 5} fontSize={LABEL_SIZE}>{minTemp}°C</text>
      </>)}
      <text y={THERMOMETER_HEIGHT + 20} x={width / 2 - 15} fontSize={TITLE_SIZE}>{title}</text>
    </g>
  );
};
