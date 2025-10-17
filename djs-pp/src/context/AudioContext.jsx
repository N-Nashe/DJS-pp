import React,{ createContext, useContext, useState, useRef }  from 'react';
import {fetchPodcastAudio} from '../services/api';

//audio context 
const AudioContext = createContext();

//Custom hook to use context
export const useAudioContext = () =>{
    const audioContextValue = useContext(AudioContext);
    if (!audioContextValue){
        throw new Error('useAudioContext must be used within an AudioProvider');
    
    } return audioContextValue;
}
