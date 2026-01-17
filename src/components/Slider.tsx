import React, { useCallback, useEffect, useRef, useState } from 'react';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { LABEL_SIZE, TITLE_SIZE } from './constants';

interface SliderProps {
  /** SVG X position of the slider */
  x: number;
  /** SVG Y position of the slider */
  y: number;
  /** Current value of the slider */
  value: number;
  /** Minimum value of the slider */
  min: number;
  /** Maximum value of the slider */
  max: number;
  /** Width of the slider */
  width: number;
  /** Height of the slider */
  height: number;
  /** Color of the slider fill */
  color: string;
  /** Title of the slider */
  title: string;
  /** Unit of the slider value */
  unit: string;
  /** Number of decimal places to display */
  decimals?: number;
  /** Callback function when the slider value changes */
  onChange: (value: number) => void;
}

/**
 * Adjustable SVG slider which can be used to control parameters.
 * @returns 
 */
export const Slider: React.FC<SliderProps> = ({ x, y, value, width, height, min, max, color, title, unit, decimals, onChange }) => {

  const slider = useRef<SVGRectElement>(null);
  const sliderParent = useRef<SVGRectElement>(null);
  const [curValue, setCurValue] = useState(value);

  const handleDrag = useCallback((x: number) => {
    const clampedX = Math.max(0, Math.min(x, width));
    const newValue = min + (clampedX / width) * (max - min);
    setCurValue(newValue);
    onChange(newValue);
  }, [min, max, width, onChange]);

  useEffect(() => {
    const { current: parent } = sliderParent;
    const { current } = slider;
    if (!current || !parent) return () => null;
    
    const dragBehavior = drag()
      .container(parent)
      // I don't like 'any' but goooood luck with d3 types...
      .on('drag', (event: any) => {
        handleDrag(event.x);
      })
      .on('start', (event: any) => {
        handleDrag(event.x);
      });

    // Again, I'm not the 'any' guy, but d3 types... this works fine
    select(parent).call(dragBehavior as any);
    select(current).call(dragBehavior as any);


    return () => {
      dragBehavior.on('drag', null);
    };
  }, [max, min, onChange, width]);

  return (
    // Lots of little adjustments to positioning... this could be cleaned up
    <g transform={`translate(${x - 1}, ${y + 1})`}>
      <rect
        x={0}
        y={0}
        strokeWidth='2px' 
        fill='white' 
        stroke='black' 
        width={width + 50} 
        height={height + 48} 
      />
      <g transform="translate(15, 25)">
        <text width={width} textAnchor='middle' x={width / 2} y={-5} fontSize={TITLE_SIZE}>{title}</text>
        <text 
          width={width} 
          textAnchor='middle' 
          x={width / 2} 
          y={height + 15} 
          fontSize={LABEL_SIZE}>
            {curValue.toFixed(decimals !== undefined ? decimals : 1)} {unit}
          </text>
        <text x={-10} y={height / 2 + 5} fontSize={LABEL_SIZE}>{min}</text>
        <text x={width + 2} y={height / 2 + 5} fontSize={LABEL_SIZE}>{max}</text>
        <rect
          ref={sliderParent}
          x={0}
          y={0}
          width={width}
          height={height}
          cursor="col-resize"
          fill="lightgray"
        />
        <rect
          ref={slider}
          x={0}
          y={0}
          width={width * (curValue - min) / (max - min)}
          height={height}
          fill={color}
          cursor="col-resize"
        />
        {/* Tick marks at 1/10 intervals */}
        {Array.from({ length: 11 }).map((_, i) => {
          const tickX = (i / 10) * (width - 2) + 1; // Slight adjustments because of stroke width
          let tickHeight = 4; // 1/10 intervals
          if (i % 2 === 0) tickHeight = 6; // 1/5 intervals
          if (i % 5 === 0) tickHeight = 10; // start, middle, end
          
          return (
            <g key={i}>
              {/* Top tick */}
              {/* <line x1={tickX} y1={1} x2={tickX} y2={tickHeight} stroke="black" strokeWidth={1} /> */}
              {/* Bottom tick */}
              <line x1={tickX} y1={height} x2={tickX} y2={height - tickHeight} stroke="black" strokeWidth={1} />
            </g>
          );
        })}
      </g>
    </g>
  );
};