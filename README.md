# Hydrothermal Heat Transfer Simulation

This is a web app which simulates a water tank—pump—solar cell system, written for a job application coding exercise. 
In the simulation, water is pumped from a tank, heated in a solar cell, and returned to the tank, thereby heating the tank.
The solar cell power and flow rate are both adjustable, and visualizations show the temperature of the system at the tank and cell output. 

## Installation and Running

1. Make sure you have [Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your system.
2. Pull this git repo into a folder.
3. Run `npm i` in the repo folder; this should install all required dependencies into `/node_modules`.
4. Run `npm start` in the repo folder to launch the web app and simulation.
5. If a browser window does not automatically open, go to `localhost:3000`. If port 3000 is occupied on your machine, the console should indicate the alternative port used.

## Physical Assumptions

- The pump is perfectly efficient and loses no energy to heat (ie does not heat the water).
- The increase in temperature of the water due to pressure increase after pumping is negligible (and neglected in this simulation).
- The solar cell is perfectly efficient and all energy is transferred into the water.
- The solar cell is absorbing 10kw from the sun and it's possible to reduce this amount (presumably by adjusting a cover over the cell).
- The water circuit is pre-primed with water, so the tank loses no volume to it.
- The entire system is closed and loses no heat to the outside environment.
- High pressure capacity of the pipes allows output water temperature from the cell to exceed 100C; the resulting high-temperature or even supercritical fluid still mixes back into the tank normally.
