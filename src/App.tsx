import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { stepTankSystem } from './core/physics';
import { SvgBase } from './components/SvgBase';
import { PlayButton } from './components/PlayButton';
import useWindowDimensions from './core/useWindowDimensions';
import { SolarTankSystem, DataPoint, VegaData } from './core/types';
import { VegaEmbed } from 'react-vega';
import { generateVegaSpec } from './core/generateVegaSpec';

// Physics sim constants
const DEFAULT_TEMP: number = 0;
const DEFAULT_POWER: number = 1000; // Watts
const DEFAULT_FLOW: number = .5; // L/s
const DEFAULT_TANK_MASS: number = 1; // kg
const STEP = .1; // seconds
const RECORD_INTERVAL = .5; // seconds

// Styling constants
const SVG_WIDTH = 270;
const SVG_HEIGHT = 650;
const PAGE_MARGIN = 20;
/** Accounts for both the legend and the margins that Vega adds */
const CHART_MARGIN = 150;

function App() {
  const [time, setTime] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const [data, setData] = useState<VegaData>({values: []});

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
      if (!playing) return;
      const cellRecord: DataPoint = {time: 0, temp: 0, type: 'cell'};
      const tankRecord: DataPoint = {time: 0, temp: 0, type: 'tank'};

      // Using function form so we don't have to put the values we're setting in the dependency array
      setSystemState((prevState) => {
        const result = stepTankSystem(prevState, STEP);
        tankRecord.temp = result.tankTemp;
        cellRecord.temp = result.cellTemp;
        return result;
      });
      setTime((prevTime) => {
        const result = prevTime + STEP;
        tankRecord.time = result;
        cellRecord.time = result;
        return result;
      });
      setData((prevData) => ({
        values: [...prevData.values, tankRecord, cellRecord],
      }));
    }, STEP * 1000); // Convert to milliseconds

    return () => clearInterval(interval);
  }, [playing, setSystemState, setData, setTime, ]);

  const chartWidth = width - SVG_WIDTH - PAGE_MARGIN * 2 - CHART_MARGIN;

  return (
    <div className="App" style={{margin: PAGE_MARGIN}}>
      <div style={{position: 'relative', height: `${SVG_HEIGHT}px`}}>
        <span style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: chartWidth + 'px'
        }}>
          <VegaEmbed 
            spec={generateVegaSpec(chartWidth, SVG_HEIGHT, data, time)}
          />
        </span>
        <span
          style={{position: 'absolute', top: 0, right: 0}}
        >
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>
              <PlayButton playing={playing} onToggle={() => setPlaying(!playing)} />
              <h1 style={{marginLeft: '20px'}}>{time.toFixed(1)}s</h1>
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
          />
        </span>
      </div>
    </div>
  );
}

export default App;
