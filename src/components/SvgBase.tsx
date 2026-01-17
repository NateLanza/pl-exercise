import React from 'react';
import { Thermometer } from './Thermometer';

interface SvgBaseProps {
  // Add your props here
}

export const SvgBase: React.FC<SvgBaseProps> = (props) => {
  return (
    <svg width="500" height="250">
      <Thermometer svgX={1} svgY={1} width={100} height={200} minTemp={0} maxTemp={100} currentTemp={70} borderRadius={20} />
    </svg>
  );
};
