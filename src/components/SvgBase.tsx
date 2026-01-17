import React from 'react';
import { Thermometer } from './Thermometer';

interface SvgBaseProps {
  // Add your props here
}

const THERMOMETER_HEIGHT: number = 300;

export const SvgBase: React.FC<SvgBaseProps> = (props) => {
  return (
    <svg width="300" height="500">
      <g transform="translate(150, 1)">
        <Thermometer // For the tank temperature
          svgX={0} 
          svgY={0} 
          width={100} 
          height={THERMOMETER_HEIGHT} 
          minTemp={0} 
          maxTemp={100} 
          currentTemp={70} 
          borderRadius={25} 
        />
        {/* Labels at 0 and 100 C */}
        <line x1={75} y1={0} x2={150} y2={1} stroke="black" strokeWidth={2} />
        <text x={112} y={15} fontSize={13}>100°C</text>
        <line x1={75} y1={THERMOMETER_HEIGHT} x2={150} y2={THERMOMETER_HEIGHT} stroke="black" strokeWidth={2} />
        <text x={126} y={THERMOMETER_HEIGHT - 5} fontSize={13}>0°C</text>
        {/* Lines marking 1/10 increments with longer lines at 1/5 increments */}
        {Array.from({ length: 10 }).map((_, i) => {
          if (i === 0) return null; // Skip the 0 line since we drew it above
          const y = (THERMOMETER_HEIGHT / 10) * i;
          const isLongLine = i % 2 === 0;
          return (
            <line
              key={i}
              x1={100}
              y1={y}
              x2={i === 5 ? 130 : isLongLine ? 120 : 110}
              y2={y}
              stroke="black"
              strokeWidth={2}
            />
          );
        })}
      </g>
    </svg>
  );
};
