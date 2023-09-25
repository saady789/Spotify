
"use client"
import React, { } from 'react';
import Login from './Login';
import Modal from './Modal';
import Upload from './Upload';
import NotAllowed from './NotAllowed';
import { useAppSelector } from '../hooks/hooks';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { setPage, setCurrentSong, getlikeSongAsync, likeSongAsync } from "../redux/userSlice";
import { useDispatch } from 'react-redux';
import Allsongs from './Allsongs';
import { RotateLoader } from 'react-spinners'; // Import the PacmanLoader spinner


const Main = () => {
    const dispatch = useDispatch();
    const m = useAppSelector((state) => state?.user?.currentUser);
    const allSongs = useAppSelector((state) => state?.user?.allSongs);

    const handlePageChange = async () => {
        await dispatch(setPage("liked"));
    }

    return (
        <>
            {allSongs.length &&
                <>
                    <div className='rounded-lg h-full w-full text-green-500 bg-gradient-to-t from-black via-black to-green-900'>
                        <Login />
                        <h1 className='text-white text-4xl font-semibold m-2'>Welcome Back</h1>
                        <div className=' cursor-pointer flex w-96 h-16 m-3 bg-white bg-opacity-10 rounded-lg items-center' onClick={handlePageChange}>
                            <div className='bg-gradient-to-tl from-slate-100 to-indigo-600 h-full w-1/4 rounded-t-lg rounded-b-lg rounded-l-lg rounded-r-none flex justify-center items-center'>
                                <AiFillHeart className="text-4xl text-white" />

                            </div>
                            <div className='flex flex-col justify-center items-center text-white font-semibold h-full w-3/4' > Liked Song</div>

                        </div>
                        {/* components starts here */}
                        <Allsongs />

                    </div>
                    <Modal>
                        {
                            m ? (<Upload />) : (<NotAllowed />)
                        }

                    </Modal>
                </>
            }
            {!allSongs.length &&
                <div className='rounded-lg h-full w-full text-green-500 bg-gradient-to-t from-black via-black to-green-900 flex justify-center items-center'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <RotateLoader color="#1DB954" size={100} />
                    </div>


                </div>
            }

        </>
    )
}

export default Main