import { VegaData } from "./types";

/**
 * Generates a spec for the VegaEmbed line chart, which plots 
 * tank and cell temperatures over time.
 * @param data 
 */
export function generateVegaSpec(data: VegaData) {
  return {
    data: data,
    mark: 'line',
    encoding: {
      x: {field: 'time', type: 'quantitative', title: 'Time (s)'},
      y: {field: 'tankTemp', type: 'quantitative', title: 'Temperature (°C)'},
      color: {value: 'blue', legend: {title: 'Tank Temperature'}},
    },
    width: 400,
    height: 300,
    title: 'Solar Tank System Temperatures Over Time',
  };
}