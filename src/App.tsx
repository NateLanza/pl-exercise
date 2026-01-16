import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SolarTankSystem, stepTankSystem } from './core/physics';

const DEFAULT_TEMP: number = 0;
const DEFAULT_POWER: number = 500; // Watts
const DEFAULT_FLOW: number = 1; // L/s
const DEFAULT_TANK_MASS: number = 100; // kg

function App() {
  const [systemState, setSystemState] = useState<SolarTankSystem>({
    tankTemp: DEFAULT_TEMP,
    solarPower: DEFAULT_POWER,
    solarOutTemp: DEFAULT_TEMP,
    flowRate: DEFAULT_FLOW,
    tankMass: DEFAULT_TANK_MASS,
  });

  return (
    <div className="App">
      <p>Tank Temp: {systemState.tankTemp}°C</p>
      <p>Solar Power: {systemState.solarPower} W</p>
      <p>Solar Out Temp: {systemState.solarOutTemp}°C</p>
      <p>Flow Rate: {systemState.flowRate} L/s</p>
      <button onClick={() => {
        // Advance the system by one second when the button is clicked
        setSystemState(stepTankSystem(systemState, 1));
      }}>Step</button>
    </div>
  );
}

export default App;
