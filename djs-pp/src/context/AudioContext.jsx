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
        const playEpisode = async(episode) =>{
            try{
                setIsLoading(true);

                const audioUrl = await fetchPodcastAudio(episode.file);

                setCurrentEpisode(episode);

                if(!audioRef.current){
                    audioRef.current new Audio();
                }

                //set audio source and play
                audioRef.current.src = audioUrl
                await audioRef.current.play()

                setIsLoading(false)
            } catch (error){
                console.error('Error playing episode:', error);
                setIsLoading(false);
            }

            //function to pause audio
            const pauseAudio =() =>{
                if (audioRef.current){
                    audioRef.current.pause();
                    setIsPlaying(false);
                }
            }

            //function to toggle play/pause
            const togglePlayPause = () =>{
                if (isPlaying){
                    pauseEpisode();

                } else if (currentEpisode && audioRef.current){
                    audioRef.current.play();
                    setIsPlaying(true);
                }
            }

               
            }
        }


        //values for use by other components
        const audioValues ={
            currentEpisode,
            isPlaying,
            currentTime,
            duration,
            isLoading,

            //calling functions
            playEpisode,
            pauseEpisode,
            togglePlayPause,
        
        }

        return(
            <AudioContext.Provider value={audioValues}>
                {children}
            </AudioContext.Provider>
        )
}