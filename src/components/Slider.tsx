import React, { useCallback, useEffect, useRef, useState } from 'react';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

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
  /** Callback function when the slider value changes */
  onChange: (value: number) => void;
}

/**
 * Adjustable SVG slider which can be used to control parameters.
 * @returns 
 */
export const Slider: React.FC<SliderProps> = ({ x, y, value, width, height, min, max, color, onChange }) => {

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
    <g transform={`translate(${x}, ${y})`}>
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
    </g>
  );
};