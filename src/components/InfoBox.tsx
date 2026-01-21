import React from 'react';
import { LABEL_SIZE } from './constants';

type InfoBoxProps = {
  height: number;
  type: 'info' | 'success';
};

const ICON_COLOR = '#555';
const ICON_SIZE = '35px';
const ICON_X_MARGIN = '10px';

const INFO_MSG = 
  "This is a simulation of a solar water heating system. " + 
  "Water is pumped from a 1L tank through a solar cell, where it is heated based on the cell's current power. " + 
  "Play and pause the simulation using the buttons on the top right. " +
  "Adjust the solar cell power and pump flow rate using the sliders below the play/pause button. " +
  "The two thermometers on the bottom right show the tank temperature (right) " + 
  "and the temperature of water exiting the solar cell before being mixed back into the tank (left). " +
  "When the tank temperature reaches 100°C, the simulation is complete. ";

const SUCCESS_MSG =
  "Simulation complete! The tank temperature has reached 100°C. " +
  "Refresh the page to run the simulation again. " + 
  "For an additional challenge, try heating the tank as quickly as possible without allowing the solar cell " +
  "to overheat (exceed 105°C); you may notice that low flow rates slightly increase heating power, but risk overheating the cell.";

/**
 * A div-based box showing an info icon and text information.
 * @param height Height of the info box in pixels
 */
export const InfoBox: React.FC<InfoBoxProps> = ({height, type}) => {
    return (
        <div style={{ height: `${height}px`, overflow: 'hidden', paddingBottom: '20px', paddingRight: '43px'}}>
          <div style={{border: `2px solid ${ICON_COLOR}`, borderRadius: '20px', height: '100%', overflowY: 'auto'}}>
            <span style={{
              display: 'flex', 
              height: '100%', 
              alignItems: 'center', 
              width: ICON_SIZE, 
              justifyContent: 'center', 
              marginLeft: ICON_X_MARGIN, 
              marginRight: ICON_X_MARGIN,
              float: 'left',
            }}>
              {type === 'info' && (
                <svg height={ICON_SIZE} viewBox="0 -960 960 960" width={ICON_SIZE} fill={ICON_COLOR}>
                  <path d="M453-280h60v-240h-60v240Zm26.98-314q14.02 0 23.52-9.2T513-626q0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2Zm.29 514q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/>
                </svg>
              )}
              {type === 'success' && (
                <svg height={ICON_SIZE} viewBox="0 -960 960 960" width={ICON_SIZE} fill={ICON_COLOR}>
                  <path d="M422-297.33 704.67-580l-49.34-48.67L422-395.33l-118-118-48.67 48.66L422-297.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z"/>
                </svg>
              )}
            </span>
            <p style={{fontSize: LABEL_SIZE + 'px', margin: '5px', verticalAlign: 'middle'}}>{type === 'info' ? INFO_MSG : SUCCESS_MSG}</p>
          </div>
        </div>
    );
};
