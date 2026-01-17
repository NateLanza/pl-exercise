import React from 'react';
import { Thermometer } from './Thermometer';
import { Slider } from './Slider';
import { TITLE_SIZE, LABEL_SIZE, THERMOMETER_HEIGHT, WATER_COLOR, SOLAR_COLOR } from './constants';

interface SvgBaseProps {
  // Add your props here
}

export const SvgBase: React.FC<SvgBaseProps> = (props) => {
  return (
    <svg width="300" height="650">
      {/* Control sliders */}
      <g>
        <Slider
          x={50}
          y={0}
          value={50}
          min={0}
          max={1000}
          width={200}
          height={20}
          color={SOLAR_COLOR}
          title="Solar Cell Power"
          unit="W"
          onChange={(value) => {
            console.log("Slider changed to: ", value);
          }} 
        />
        <Slider
          x={50}
          y={75}
          value={25}
          min={1}
          max={10}
          width={200}
          height={20}
          color={WATER_COLOR}
          title="Pump Flow Rate"
          unit="L/s"
          onChange={(value) => {
            console.log("Slider changed to: ", value);
          }} 
        />
      </g>
      {/* Group for both thermometers */}
      <g transform="translate(0, 230)">
        {/* Group for solar cell thermometer */}
        <g transform="translate(50, 0)">
          <Thermometer
            svgX={0} 
            svgY={0} 
            width={50} 
            height={THERMOMETER_HEIGHT} 
            minTemp={0}
            maxTemp={100} 
            currentTemp={45} 
            borderRadius={10} 
          />
          <text y={THERMOMETER_HEIGHT + 20} x={13} fontSize={TITLE_SIZE}>Cell</text>
        </g>
        {/* Group for tank thermometer and scale */}
        <g transform="translate(150, 0)">
          <g transform="translate(0, 0)">
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
            <text y={THERMOMETER_HEIGHT + 20} x={36} fontSize={TITLE_SIZE}>Tank</text>
          </g>
        </g>
      </g>
      {/* Group for cosmetic elements denoting pump, etc */}
      <g>
        {/* The water flow path */}
        <g transform="translate(200, 229)">
          <path d="
            M 0 0 
            l 0 -25
            l -125 0
            l 0 25
            " width={5} stroke={WATER_COLOR} strokeWidth="8" fill="transparent" />
          <path d="
            M -4 0
            l 0 -21
            l -117 0
            l 0 21
            " width={5} stroke="black" strokeWidth="1" fill="transparent"
          />
          <path d="
            M 4 0
            l 0 -29
            l -133 0
            l 0 29
            " width={5} stroke="black" strokeWidth="1" fill="transparent"
          />
        </g>
        {/* The pump */}
        <path d="
          M 160 204
          l 20 15
          l 0 -30
          Z
        " width={3} stroke="black" strokeWidth={2} fill={WATER_COLOR} />
        {/* The solar cell */}
        <rect
          x={90}
          y={188}
          width={30}
          height={30}
          fill={SOLAR_COLOR}
          stroke="black"
          strokeWidth={2}
        />
        {/* "Wires" from controls to pump and solar cell, pump first */}
        <line x1={173} y1={193} x2={173} y2={145} stroke="black" strokeWidth={2} />
        <path d="
          M 105 188
          l -60 -40
          l 0 -90
          l 5 0
        " stroke="black" strokeWidth={2} fill="transparent" />
      </g>
    </svg>
  );
};
