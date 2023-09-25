"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs"
import { BsMusicNoteList } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { setCurrentUser, openModal , setCurrentSong } from '../redux/userSlice';
import { setPage, setMySongs } from '../redux/userSlice';
import { useAppSelector } from '../hooks/hooks';
import {AllSongAsync} from "../redux/userSlice";

const Sidebar = () => {
    const m = useAppSelector((state) => state?.user?.currentUser);
    const mySongs = useAppSelector((state) => state?.user?.mySongs);


    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSongs = async() => {
            await dispatch(AllSongAsync());
        }
      fetchSongs();
    }, [])
    
    useEffect(() => {
        if (!m) return;
        const getMySongs = async () => {
            const url = "/api/getMySong";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add any other headers you need here
                },
                body: JSON.stringify({ id: m.id })

            });
            const responseData = await response.json();
            if (responseData != "InternalServerError") {
                await dispatch(setMySongs(responseData));
            }

        }
        getMySongs();
    }, [m])

    useEffect(() => {
        const getUser = async () => {
            let x = localStorage.getItem("user");
            if (x) {
                await dispatch(setCurrentUser(JSON.parse(x)));
            }
        }
        getUser();
    }, [])

    const handleOpen = async () => {
        await dispatch(openModal());
    }
    const goHome = async () => {
        await dispatch(setPage("main"))
    }
    const goSearch = async () => {
        await dispatch(setPage("search"))
    }
    return (
        <div className='w-full h-full flex-col'>
            <div className='w-full h-1/5 bg-neutral-900 rounded-lg m-2 '>
                <div className='flex flex-col  items-start w-full h-full justify-evenly'>
                    <div className=' w-full h-1/2 flex justify start items-center cursor-pointer'>
                        <AiFillHome className="  text-neutral-400 m-1 text-2xl hover:text-white ml-2" onClick={goHome} />
                        <h1 className='m-1 text-xl font-bold text-neutral-400 hover:text-white ml-2' onClick={goHome}>Home</h1>
                    </div>
                    <div className=' w-full h-1/2 flex justify start items-center cursor-pointer'>
                        <BsSearch className="  text-neutral-400 m-1 text-2xl hover:text-white ml-2" onClick={goSearch} />
                        <h1 className='m-1 text-xl font-bold text-neutral-400 hover:text-white ml-2' onClick={goSearch}>Search</h1>
                    </div>
                </div>
            </div>
            <div className='w-full h-3/4 bg-neutral-900 rounded-lg m-2 flex flex-col'>
                <div className=' w-full h-16 flex justify start items-center cursor-pointer m-0'>
                    <BsMusicNoteList className="  text-neutral-400 m-1 text-2xl hover:text-white ml-2" />
                    <h1 className='m-1 text-xl font-bold text-neutral-400 hover:text-white ml-2'>Your Library</h1>
                    <div className=' w-32 flex justify-end' onClick={handleOpen}>
                        <AiOutlinePlus className="  text-neutral-400 m-1 text-2xl hover:text-white ml-2" />

                    </div>

                </div>

                {!m && <h1 className='text-white flex justify-center items-center '>Please Login First</h1>}
                {m && mySongs.length === 0 && <h1 className='text-white  flex justify-center items-center'>No Songs Uploaded Yet</h1>}
                {m && mySongs.length !== 0 &&
                    <div className='w-full overflow-y-auto'>
                        {mySongs.map((song, index) => (
                            <div className='w-full h-20 mt-2 flex items-center cursor-pointer rounded-lg hover:bg-neutral-700' key={index} onClick={async()=>{await dispatch(setCurrentSong(song))}}>
                                <img src={song?.thumbnail} alt="img" className='w-1/3 h-3/4 rounded-lg ml-4' />
                                <h1 className='text-white font-semibold ml-4' >{song?.title}</h1>

                            </div>
                        ))}

                    </div>

                }

            </div>
        </div>
    )
}

export default Sidebar