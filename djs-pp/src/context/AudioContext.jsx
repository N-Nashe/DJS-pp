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

//Audio provider component puts audio state in context

export const AudoProvider =({children}) =>{
        
        // points to the html audio element
    
        const audioRef = useRef(null)
//audio state management
        const [currentEpisode, setCurrentEpisode] = useState(null);
        const [isPlaying, setIsPlaying] =useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration]= useState(0);
        const [isLoading, setIsLoading]= useState(false);

        //function to load and play episode


        //values for use by other components
        const audioValues ={
            currentEpisode,
            isPlaying,
            currentTime,
            duration,
            isLoading,
        }

        return(
            <AudioContext.Provider value={audioValues}>
                {children}
            </AudioContext.Provider>
        )
}