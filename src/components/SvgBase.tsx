import React, { CSSProperties } from 'react';
import { Thermometer } from './Thermometer';
import { Slider } from './Slider';
import { TITLE_SIZE, LABEL_SIZE, THERMOMETER_HEIGHT, WATER_COLOR, SOLAR_COLOR } from './constants';

interface SvgBaseProps {
  width: number;
  height: number;
  /** Maximum temperature for the thermometer scales */
  maxTemp: number;
  /** Style for the SVG container */
  style?: CSSProperties;
  /** Current power for the solar cell, set by user */
  solarPower: number;
  /** Current flow rate for the pump, set by user */
  flowRate: number;
  /** Current temperature of the solar cell */
  cellTemp: number;
  /** Current temperature of the water tank */
  tankTemp: number;
  /** Callback when solar power slider changes */
  onSolarPowerChange: (value: number) => void;
  /** Callback when flow rate slider changes */
  onFlowRateChange: (value: number) => void;
}

export const SvgBase: React.FC<SvgBaseProps> = (
  { solarPower, flowRate, cellTemp, tankTemp, onSolarPowerChange, onFlowRateChange, style, height, width, maxTemp }
) => {

  return (
    <svg width={width} height={height} style={style} viewBox={`${300 - width} 0 ${width} ${height}`}>
      {/* Control sliders */}
      <g transform='translate(-10, 0)'>
        <Slider
          x={50}
          y={0}
          value={solarPower}
          min={0}
          max={10000}
          width={200}
          height={20}
          color={SOLAR_COLOR}
          title="Solar Cell Power"
          unit="W"
          onChange={onSolarPowerChange}
        />
        <Slider
          x={50}
          y={75}
          value={flowRate}
          min={0.01}
          max={1}
          width={200}
          height={20}
          color={WATER_COLOR}
          title="Pump Flow Rate"
          unit="L/s"
          decimals={2}
          onChange={onFlowRateChange}
        />
      </g>
      {/* Group for both thermometers */}
      <g transform="translate(0, 230)">
        {/* Solar cell thermometer */}
        <Thermometer
          svgX={50} 
          svgY={0} 
          width={50} 
          height={THERMOMETER_HEIGHT} 
          minTemp={0}
          maxTemp={maxTemp} 
          currentTemp={cellTemp}
          borderRadius={10}
          title="Cell"
          axisLabels={false}
          axisSide="left"
        />
        {/* Tank thermometer */}
        <Thermometer // For the tank temperature
          svgX={150} 
          svgY={0} 
          width={100} 
          height={THERMOMETER_HEIGHT} 
          minTemp={0} 
          maxTemp={maxTemp}
          currentTemp={tankTemp}
          borderRadius={25}
          title="Tank"
        />
      </g>
      {/* Group for cosmetic elements denoting pump, etc */}
      <g>
        {/* The water flow "pipe" */}
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
          l -70 -40
          l 0 -90
          l 5 0
        " stroke="black" strokeWidth={2} fill="transparent" />
        {/* The returning "pipe" from cell to tank */}
        <g transform='translate(101, 550)'>
          <line x1={0} y1={0} x2={48} y2={0} stroke={WATER_COLOR} strokeWidth="8" />
          <line x1={0} y1={4} x2={48} y2={4} stroke="black" strokeWidth="1" />
          <line x1={0} y1={-4} x2={48} y2={-4} stroke="black" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
};
