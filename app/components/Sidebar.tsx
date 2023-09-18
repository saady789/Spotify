"use client"
import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { AiFillHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs"
import { BsMusicNoteList } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { setCurrentUser,openModal } from '../redux/userSlice';
const Sidebar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async() => {
            let x = localStorage.getItem("user");
            if(x){
                await dispatch(setCurrentUser(JSON.parse(x)));
            }
        }
      getUser();
    }, [])

    const handleOpen = async() => {
        await dispatch(openModal());
    }
    
    return (
        <div className='w-full h-full flex-col'>
            <div className='w-full h-1/5 bg-neutral-900 rounded-lg m-2 '>
                <div className='flex flex-col  items-start w-full h-full justify-evenly'>
                    <div className=' w-full h-1/2 flex justify start items-center cursor-pointer'>
                        <AiFillHome className="  text-neutral-400 m-1 text-2xl hover:text-white ml-2" />
                        <h1 className='m-1 text-xl font-bold text-neutral-400 hover:text-white ml-2'>Home</h1>
                    </div>
                    <div className=' w-full h-1/2 flex justify start items-center cursor-pointer'>
                        <BsSearch className="  text-neutral-400 m-1 text-2xl hover:text-white ml-2" />
                        <h1 className='m-1 text-xl font-bold text-neutral-400 hover:text-white ml-2'>Search</h1>
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

                <h1>List of songs</h1>
            </div>
        </div>
    )
}

export default Sidebar