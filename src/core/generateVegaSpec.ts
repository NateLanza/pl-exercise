import { VegaData } from "./types";

const TIME_WINDOW = 30;

/**
 * Generates a spec for the VegaEmbed line chart, which plots 
 * tank and cell temperatures over time.
 * @param data VegaData containing the data points to plot
 * @param currentTime Current simulation time, for x-axis calculation
 * @param maxTemp Maximum temperature for the y-axis domain
 * @param width Width of the chart, not including margins and legend
 * @param height Height of the chart
 * @returns Vega specification object
 */
export function generateVegaSpec(width: number, height: number, data: VegaData, currentTime: number, maxTemp: number) {
  return {
    width,
    height,
    data: data,
    mark: {
      type: "line",
      clip: true,
    },
    transform: [
      // Calculate the time in the past for better x-axis labeling
      {calculate: `datum.time - ${currentTime}`, as: 'pastTime'},
      // Filter to the time window
      {filter: `datum.pastTime >= -${TIME_WINDOW}`},
    ],
    encoding: {
      x: {
        field: 'pastTime', 
        type: 'quantitative', 
        title: 'Time in Past (s)', 
        scale: {domain: [-TIME_WINDOW, 0]}
      },
      y: {
        field: 'temp', 
        axis: {orient: 'right'}, 
        type: 'quantitative', 
        title: 'Temperature (°C)',
        scale: {domain: [0, maxTemp]},
      },
      color: {field: 'type', legend: {title: 'Temperature of', orient: 'left'}},
    },
    title: 'System Temperatures Over Time',
  };
}