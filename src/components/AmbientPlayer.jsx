import React, { useState, useEffect } from 'react';
import { toggleAmbientMusic, isAmbientMusicPlaying, playClickSound } from '../utils/audio';

export default function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Keep local state in sync with actual playing state
    setIsPlaying(isAmbientMusicPlaying());
  }, []);

  const handleToggle = () => {
    playClickSound();
    const playing = toggleAmbientMusic();
    setIsPlaying(playing);
  };

  return (
    <button
      className={`ambient-badge ${isPlaying ? 'playing' : ''}`}
      onClick={handleToggle}
      aria-label="Toggle ambient soundtrack"
      title="Generative Ambient Soundtrack"
    >
      <div className="ambient-bars">
        <span className="ambient-bar"></span>
        <span className="ambient-bar"></span>
        <span className="ambient-bar"></span>
      </div>
      <span>AMBIENT: {isPlaying ? 'ON' : 'OFF'}</span>
    </button>
  );
}
