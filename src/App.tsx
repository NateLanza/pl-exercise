import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SolarTankSystem, stepTankSystem } from './core/physics';
import { SvgBase } from './components/SvgBase';

const DEFAULT_TEMP: number = 0;
const DEFAULT_POWER: number = 500; // Watts
const DEFAULT_FLOW: number = 1; // L/s
const DEFAULT_TANK_MASS: number = 100; // kg

const STEP = .1; // seconds

function App() {
  const [time, setTime] = useState<number>(0);

  const [systemState, setSystemState] = useState<SolarTankSystem>({
    tankTemp: DEFAULT_TEMP,
    solarPower: DEFAULT_POWER,
    solarOutTemp: DEFAULT_TEMP,
    flowRate: DEFAULT_FLOW,
    tankMass: DEFAULT_TANK_MASS,
  });

  return (
    <div className="App">
      <div style={{textAlign: 'right', marginTop: '100px', marginRight: '20px'}}>
        <SvgBase />
      </div>
    </div>
  );
}

export default App;
