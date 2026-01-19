import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SolarTankSystem, stepTankSystem } from './core/physics';
import { SvgBase } from './components/SvgBase';

const DEFAULT_TEMP: number = 0;
const DEFAULT_POWER: number = 50; // Watts
const DEFAULT_FLOW: number = 1; // L/s
const DEFAULT_TANK_MASS: number = 1; // kg

const STEP = .1; // seconds

function App() {
  const [time, setTime] = useState<number>(0);

  const [{tankTemp, solarPower, cellTemp, flowRate}, setSystemState] = useState<SolarTankSystem>({
    tankTemp: DEFAULT_TEMP,
    solarPower: DEFAULT_POWER,
    cellTemp: DEFAULT_TEMP,
    flowRate: DEFAULT_FLOW,
    tankMass: DEFAULT_TANK_MASS,
  });

  const setSolarPower = useCallback((power: number) => {
    setSystemState((prevState) => ({
      ...prevState,
      solarPower: power,
    }));
  }, [setSystemState]);

  const setFlowRate = useCallback((flow: number) => {
    setSystemState((prevState) => ({
      ...prevState,
      flowRate: flow,
    }));
  }, [setSystemState]);

  // Main simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemState((prevState) => stepTankSystem(prevState, STEP));
      setTime((prevTime) => prevTime + STEP);
    }, STEP * 1000); // Convert to milliseconds

    return () => clearInterval(interval);
  }, [setSystemState, tankTemp, cellTemp]);

  return (
    <div className="App">
      <div style={{textAlign: 'right', marginTop: '100px', marginRight: '20px'}}>
        <SvgBase 
          tankTemp={tankTemp} 
          solarPower={solarPower} 
          cellTemp={cellTemp} 
          flowRate={flowRate}
          onSolarPowerChange={setSolarPower}
          onFlowRateChange={setFlowRate} 
        />
      </div>
    </div>
  );
}

export default App;
