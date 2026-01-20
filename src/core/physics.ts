import { degC, Joules, kg, SolarTankSystem } from "./types";

const SPEC_HEAT_H2O: number = 4186; // J/(kg·K) Specific heat capacity of water
const DENSITY_H2O: number = 1; // kg/L

/**
 * Calculate the outlet temperature of water after absorbing energy in a solar cell.
 * @param tempIn - The inlet temperature of the water in Celsius.
 * @param energyIn - The energy absorbed by the water in Joules.
 * @param massFlow - The amount of mass that flows through the solar cell in this timestep.
 * @returns The outlet temperature of the water in Celsius.
 */
export function solarCellHeat(tempIn: degC, energyIn: Joules, massFlow: kg): degC {
  return tempIn + energyIn / (massFlow * SPEC_HEAT_H2O);
}

/**
 * Calculate the temperature change of a tank of water 
 * when a certain mass of water at a different temperature is added.
 * @param tankTemp - The current temperature of the tank in Celsius.
 * @param tankMass - The current mass of water in the tank in kg.
 * @param addedMass - The mass of water being added to the tank in kg.
 * @param addedTemp - The temperature of the water being added in Celsius.
 * @returns The change in temperature of the tank in Celsius.
 */
export function tankTempChange(tankTemp: degC, tankMass: kg, addedMass: kg, addedTemp: degC): degC {
  return (addedMass * (addedTemp - tankTemp)) / (tankMass + addedMass);
}

/**
 * Step the solar tank system forward in time by a given number of seconds.
 * Does not modify the input object; returns a new object with the updated state.
 * @param system - The current state of the solar tank system.
 * @param seconds - The number of seconds to step forward.
 * @returns The new state of the solar tank system after the time step.
 */
export function stepTankSystem(system: SolarTankSystem, seconds: number): SolarTankSystem {
  // Mass flowing through the cell in this timestep
  const massFlow: kg = system.flowRate * seconds * DENSITY_H2O;
  const energyIn: Joules = system.solarPower * seconds; // Total energy absorbed over the time step
  const cellTemp: degC = solarCellHeat(system.tankTemp, energyIn, massFlow);
  const tempChange: degC = tankTempChange(system.tankTemp, system.tankMass, massFlow, cellTemp);

  return {
    tankTemp: system.tankTemp + tempChange,
    solarPower: system.solarPower,
    cellTemp: cellTemp,
    flowRate: system.flowRate,
    tankMass: system.tankMass,
  };
}
