import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { AiOutlineClose, AiFillStepForward, AiFillStepBackward } from 'react-icons/ai';
import { removeCurrentSong } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useSound } from 'use-sound';
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { BiSolidLike, BiLike } from "react-icons/bi";

const Player = () => {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(0); // Track current playback position

  const currentSong = useAppSelector((state) => state?.user?.currentSong);
  const [play, { pause, stop }] = useSound(currentSong?.song, {
    position: position, // Set the initial playback position
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
    }
    play();
  }

  const handleClose = async() => {
   
    await dispatch(removeCurrentSong());
    
  }

  useEffect(() => {
    handleStop();
    
  }, [currentSong])


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
          <div className='flex h-full w-1/3 justify-center items-center'>
            <AiFillStepBackward className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" onClick={handleStart} />
            {playing ? (
              <BsPauseCircleFill className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" onClick={handlePause} />
            ) : (
              <BsPlayCircleFill className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" onClick={handlePlay} />
            )}
            <AiFillStepForward className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" />
          </div>
          <div className="flex flex-row-reverse justify-end h-full w-1/3 ">
            <div className="ml-auto">
            <AiOutlineClose className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300 ml-2 text-green-500" onClick={handleClose} />

            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Player;
