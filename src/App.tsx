import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { SolarTankSystem, stepTankSystem } from './core/physics';
import { SvgBase } from './components/SvgBase';
import { PlayButton } from './components/PlayButton';
import useWindowDimensions from './core/useWindowDimensions';

// Physics sim constants
const DEFAULT_TEMP: number = 0;
const DEFAULT_POWER: number = 50; // Watts
const DEFAULT_FLOW: number = 1; // L/s
const DEFAULT_TANK_MASS: number = 1; // kg
const STEP = .1; // seconds

// Styling constants
const SVG_WIDTH = 270;
const SVG_HEIGHT = 650;
const PAGE_MARGIN = 20;

function App() {
  const [time, setTime] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const { width } = useWindowDimensions();

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
      console.log('tick', playing);
      if (!playing) return;
      setSystemState((prevState) => stepTankSystem(prevState, STEP));
      setTime((prevTime) => prevTime + STEP);
    }, STEP * 1000); // Convert to milliseconds

    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="App" style={{margin: PAGE_MARGIN}}>
      <div style={{position: 'relative', height: `${SVG_HEIGHT}px`}}>
        <span
          style={{position: 'absolute', top: 0, left: ((width - 3 * PAGE_MARGIN) - SVG_WIDTH)}}
        >
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '10px'}}>
            <PlayButton playing={playing} onToggle={() => setPlaying(!playing)} />
          </div>
          <SvgBase 
            tankTemp={tankTemp} 
            solarPower={solarPower} 
            cellTemp={cellTemp} 
            flowRate={flowRate}
            onSolarPowerChange={setSolarPower}
            onFlowRateChange={setFlowRate}
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            // I don't know why we need 3 * PAGE_MARGIN here to align properly; the div appears to be
            // less than width - 2 * PAGE_MARGIN wide for some reason.
          />
        </span>
      </div>
    </div>
  );
}

export default App;
