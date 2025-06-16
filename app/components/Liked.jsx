"use client"
//X
import React from 'react'
import Login from './Login'
import Modal from './Modal';
import Upload from './Upload';
import NotAllowed from './NotAllowed';
import { useAppSelector } from '../hooks/hooks';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { setPage, setCurrentSong, getlikeSongAsync, likeSongAsync } from "../redux/userSlice";
import { useDispatch } from 'react-redux';
import { AiFillPlayCircle } from "react-icons/ai"
import { BiSolidLike, BiLike } from "react-icons/bi";
import Image from 'next/image';

const Liked = () => {
  const m = useAppSelector((state) => state?.user?.currentUser);
  const likedSongs = useAppSelector((state) => state?.user?.likedSongs);
  const dispatch = useDispatch();
  const handlePageChange = async () => {
    await dispatch(setPage("liked"));
  }

  return (
    <div className='rounded-lg h-full w-full text-green-500 bg-gradient-to-t from-black via-black to-green-900'>
      <Login />
      <div className=' cursor-pointer flex w-96 h-24 m-3 bg-white bg-opacity-10 rounded-lg items-center' onClick={handlePageChange}>
        <div className='bg-gradient-to-tl from-slate-100 to-indigo-600 h-full w-1/4 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-none flex justify-center items-center'>
          <AiFillHeart className="text-4xl text-white" />

        </div>
        <div className='flex flex-col justify-center items-center text-white font-semibold h-full w-3/4' > Liked Song</div>

      </div>


      <div className='w-full h-96 overflow-y-auto '>

        {likedSongs && (
          <div className="grid grid-cols-3 gap-0"> {/* Set gap-0 to remove the gap */}
            {likedSongs.map((card, index) => (
              <div key={index} className="bg-neutral-800 p-4 rounded-lg shadow-md mt-2 h-60 w-40 cursor-pointer flex flex-col justify-start items-center">
                {/* Card Content */}
                <Image alt="img" src={card?.likedSong?.thumbnail}   width={160}  height={160}  className=" rounded-lg" />
                <h2 className="text-lg mt-2 font-semibold">{card?.likedSong?.title}</h2>
                <div className="flex justify-start items-center w-full mt-2 ml-2">
                  <div className="w-1/2">
                    <AiFillPlayCircle
                      className="cursor-pointer mt-2 text-4xl rounded-full hover:text-green-300"
                      onClick={async () => {
                        await dispatch(setCurrentSong(card?.likedSong));
                      }}
                    />
                  </div>
                  <div className="w-1/2">
                    <BiSolidLike className="mt-2 text-4xl rounded-full hover:text-green-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}



        {!likedSongs &&
          <div className='w-full h-full flex justify-center items-center font-bold text-4xl'>No Liked Songs Yet</div>
        }
      </div>



      <Modal>
        {
          m ? (<Upload />) : (<NotAllowed />)
        }

      </Modal>
    </div>

  )
}

export default Liked