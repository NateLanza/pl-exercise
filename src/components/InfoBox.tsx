import React from 'react';

type InfoBoxProps = {
  height: number;
};

/**
 * A div-based box showing an info icon and text information.
 * @param height Height of the info box in pixels
 */
export const InfoBox: React.FC<InfoBoxProps> = ({height}) => {
    return (
        <div style={{height: `${height}px`, overflow: 'hidden'}}>
          <div>

          </div>
        </div>
    );
};
