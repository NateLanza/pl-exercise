import React from 'react';
import { Thermometer } from './Thermometer';
import { Slider } from './Slider';
import { TITLE_SIZE, LABEL_SIZE, THERMOMETER_HEIGHT } from './constants';

interface SvgBaseProps {
  // Add your props here
}

export const SvgBase: React.FC<SvgBaseProps> = (props) => {
  return (
    <svg width="300" height="500">
      <g>
        {/* Control sliders */}
        <Slider
          x={50}
          y={20}
          value={50}
          min={0}
          max={100}
          width={200}
          height={20}
          color="yellow"
          title="Solar Cell Power"
          unit="W"
          onChange={(value) => {
            console.log("Slider changed to: ", value);
          }} 
        />
      </g>
      <g transform="translate(0, 100)">
        {/* Group for solar cell thermometer */}
        <g transform="translate(50, 0)">
          <text y={10} x={13} fontSize={TITLE_SIZE}>Cell</text>
          <Thermometer
            svgX={0} 
            svgY={20} 
            width={50} 
            height={THERMOMETER_HEIGHT} 
            minTemp={0}
            maxTemp={100} 
            currentTemp={45} 
            borderRadius={10} 
          />
        </g>
        {/* Group for tank thermometer and scale */}
        <g transform="translate(150, 0)">
          <text y={10} x={36} fontSize={TITLE_SIZE}>Tank</text>
          <g transform="translate(0, 20)">
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
            <text x={112} y={15} fontSize={LABEL_SIZE}>100°C</text>
            <line x1={75} y1={THERMOMETER_HEIGHT} x2={150} y2={THERMOMETER_HEIGHT} stroke="black" strokeWidth={2} />
            <text x={126} y={THERMOMETER_HEIGHT - 5} fontSize={LABEL_SIZE}>0°C</text>
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
        </g>
      </g>
    </svg>
  );
};
