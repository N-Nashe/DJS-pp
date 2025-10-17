import React from 'react';
import { useAudioContext } from '../../../../context/AudioContext';
import './AudioControls.css';

const AudioControls = () => {
    const {
        currentTime,
        isPlaying,
        duration,
        pauseEpisode,
        playEpisode,
        seekToTime,
    } = useAudioContext();

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressClick = (e) => {
        if (!duration) return;
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressWidth = rect.width;
        const clickedTime = (clickX / progressWidth) * duration;
        seekToTime(clickedTime);
    };

    return (
        <div className="audio-controls">
            <button
                className="play-pause-btn"
                onClick={isPlaying ? pauseEpisode : playEpisode}
            >
                {isPlaying ? '⏸️' : '▶️'}
            </button>

            <div className="progress-container">
                <span className="time-display">{formatTime(currentTime)}</span>

                <div className="progress-bar" 
                onClick={handleProgressClick}>

                  <div className="progress-fill"
                  style ={{width:`${(currentTime /duration) *100}%`}}>
                    </div>  

                </div>
                
                <span className="time-display">{formatTime(duration)}</span>
            </div>
        </div>
    );
};

export default AudioControls;
