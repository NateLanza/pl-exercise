import React from 'react';

interface PlayButtonProps {
  /** When true, shows a pause button, otherwise shows a play button */
  playing: boolean;
  /** Callback when the button is clicked */
  onToggle: () => void;
  /** Whether the button is disabled */
  disabled: boolean;
}

const SIZE = 60;

export const PlayButton: React.FC<PlayButtonProps> = ({playing, onToggle, disabled}) => {
  return (
    <button 
      style={{
        backgroundColor: disabled ? '#aaa' : (playing ? '#ffb731' : '#62ff3b'),
        border: 'none',
        borderRadius: `${SIZE / 2}px`,
        height: `${SIZE}px`,
        width: `${SIZE}px`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onToggle}
    >
      {playing ? (
        <svg 
          height={`${SIZE}px`}
          width={`${SIZE}px`} 
          fill="white"
        >
          <rect x="13" y="15" width="10" height="30" />
          <rect x="30" y="15" width="10" height="30" />
        </svg>
      ) : (
        <svg 
          height={`${SIZE}px`}
          width={`${SIZE}px`} 
          fill="white"
        >
          <path d="M20 16 l 20 14 l -20 14 Z" />
        </svg>
        )}
    </button>
  );
};
