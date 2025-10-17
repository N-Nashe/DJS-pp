import React from 'react';
import { useAudioContext } from '../../../context/AudioContext';

const AudioControls = () => {
    const {
        currentTime,
        isPlaying,
        duration,
    } = useAudioContext();

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

return (
    <div className="audio-controls">
        {/*controls will go here*/}
    </div>
);
};
export default AudioControls;
  