import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { AiOutlineClose, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';
import { removeCurrentSong } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useSound } from 'use-sound';
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { FaVolumeMute } from "react-icons/fa"
import { VscUnmute } from "react-icons/vsc";
const Player = () => {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(0); // Track current playback position

  const [volume, setVolume] = useState(0.6); // 1 is full volume, 0 is muted
  const [muted, setMuted] = useState(false);

  const currentSong = useAppSelector((state) => state?.user?.currentSong);
  const [play, { pause, stop }] = useSound(currentSong?.song, {
    position: position, // Set the initial playback position
    volume: volume
  });



  const handlePlay = async () => {
    if (!playing) {
      if (position === 0) {
        // If it's the first play, start from the beginning
        play();
      } else {
        // Otherwise, resume from the last position
        play({ position });
      }
      setPlaying(true);
    }
  }

  const handlePause = async () => {
    if (playing) {
      const newPosition = await pause(); // Pause and get the current position
      setPosition(newPosition);
      setPlaying(false);
    }
  }

  const handleStop = async () => {
    if (playing) {
      stop();
      setPosition(0); // Reset the position when stopped
      setPlaying(false);
    }
  }

  const handleStart = async () => {
    if (playing) {
      stop();
      setPosition(0); // Reset the position when stopped
      setPlaying(false);
    }
    else {
      stop();
      setPosition(0); // Reset the position when stopped
      setPlaying(false);
    }
    play();
    setPlaying(true);
  }






  useEffect(() => {
    handleStop();

  }, [currentSong])

  const handleVolumeChange = (event) => {
    // if (muted === false) {
      const newVolume = parseFloat(event.target.value);
      setVolume(newVolume);
      console.log("volume updated to ", newVolume);
      setMuted(false);
    // }
    // else {
    //   return;
    // }

  };

  const toggleMuted = () => {
    if(muted===true){
      setMuted(false);
      setVolume(0.6)

    }
    else {
      setMuted(true);
      setVolume(0)
    }
  }

  useEffect(() => {
   if(volume ==0 ){
    setMuted(true);
   }
   else {
    setMuted(false);
   }
  }, [volume])
  



  return (
    <>
      {currentSong && (
        <div className="fixed inset-x-0 bottom-0 h-20 bg-neutral-800 text-white p-4 bg-opacity-100 flex ">
          {/* Modal content */}
          <div className="flex  items-center w-1/3 h-full ">
            <img alt="img" src={currentSong?.thumbnail} className='rounded-lg h-16 w-30 ' />
            <div className='flex flex-col'>
              <h1 className='font-bold text-2xl ml-2 text-green-500'>{currentSong?.title}</h1>
              <BiLike className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" />
            </div>
          </div>
          <div className='flex flex-col h-full w-1/3 justify-center items-center'>

            <div className=' flex w-full h-3/4 justify-center items-center'>
              <AiFillStepBackward className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" onClick={handleStart} />
              {playing ? (
                <BsPauseCircleFill className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" onClick={handlePause} />
              ) : (
                <BsPlayCircleFill className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" onClick={handlePlay} />
              )}
              <AiFillStepForward className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" />
            </div>

            <div className='w-full h-1/4 mt-2 '>
              {/* the slider functionality */}
            </div>



          </div>
          <div className="flex flex-row justify-start items-center h-full w-1/3 ">
            {muted === true &&
              <FaVolumeMute onClick={toggleMuted} className="cursor-pointer mr-2 text-2xl rounded-full  hover:text-green-300 ml-2 text-green-500" />

            }
            {
              muted === false &&
              <VscUnmute onClick={toggleMuted} className="cursor-pointer mr-2 text-2xl rounded-full  hover:text-green-300 ml-2 text-green-500" />

            }

            <input
              className='bg-green-500 appearance-none w-1/3 h-1 rounded-full outline-none focus:ring focus:ring-green-500'
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
            />

          </div>

        </div>
      )}
    </>
  );
};

export default Player;
