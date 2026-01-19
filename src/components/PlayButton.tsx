import React from 'react';

interface PlayButtonProps {
  playing: boolean;
  onToggle: () => void;
}

const SIZE = 60;

export const PlayButton: React.FC<PlayButtonProps> = ({playing, onToggle}) => {
  return (
    <button 
      style={{
        backgroundColor: playing ? '#ffb731' : '#62ff3b',
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
