// These aren't helpful or necessary from the compilation standpoint,
// but they help readability and thinking about the physical equations.
export type Joules = number;
export type Watts = number;
/** Degrees celsius */
export type degC = number;
export type kg = number;
/** Liters per second */
export type LPerSec = number;

/** 
 * A record of data recorded at a single point in time,
 * designed for rendering with Vega-Lite.
 */
export type DataPoint = {
  time: number;
  tankTemp: degC;
  cellTemp: degC;
}

/**
 * For the 'data' attribute of a Vega spec.
 */
export type VegaData = {
  values: DataPoint[];
}

/**
 * Represents a full solar tank system, where water is pumped out of a tank
 * to a solar cell, heated, and returned to the tank.
 */
export type SolarTankSystem = {
  /** Current temperature of the tank- simulated */
  tankTemp: degC;
  /** Current solar power input- user-defined */
  solarPower: Watts;
  /** Temperature of water leaving the solar cell- simulated */
  cellTemp: degC;
  /** Flow rate of water through the solar cell- user-defined */
  flowRate: LPerSec;
  /** Mass of water in the tank- user-defined */
  tankMass: kg;
};