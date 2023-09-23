"use client"
import React, { useState, useRef } from 'react'
import Login from './Login'
import Modal from './Modal';
import Upload from './Upload';
import NotAllowed from './NotAllowed';
import { useAppSelector } from '../hooks/hooks';
import { BsSearch } from "react-icons/bs";
import debounce from 'lodash/debounce'; // Import debounce from lodash
import { RotateLoader } from 'react-spinners'; // Import the PacmanLoader spinner
import { AiFillPlayCircle } from "react-icons/ai"
import { BiSolidLike, BiLike } from "react-icons/bi";
import { setCurrentSong, getlikeSongAsync, likeSongAsync } from "../redux/userSlice";
import { useDispatch } from 'react-redux';
const Search = () => {
  // const currentsong = useAppSelector((state) => state?.user?.currentSong);
  const currentUser = useAppSelector((state) => state?.user?.currentUser);
  const Lsongs =  useAppSelector((state) => state?.user?.likedSongs);

  const dispatch = useDispatch();
  const inputRef = useRef < HTMLInputElement | null > (null); // Create a ref for the input element
  const m = useAppSelector((state) => state?.user?.currentUser);
  const [status, setStatus] = useState("start"); // either idle or searching; initially start 
  const [songs, setSongs] = useState([]);
  const searchsong = async () => {
    if (inputRef.current) {
      setStatus("working");
      const inputValue = inputRef.current.value;
      const arr = inputValue.split(" ");
      console.log(arr);
      if (arr.length) {
        let url = "/api/searchSong";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers you need here
          },
          body: JSON.stringify({ data: arr })

        });
        const responseData = await response.json();
        console.log(responseData);
        if (responseData !== "InternalServerError") {
          setSongs(responseData);
        }
        setStatus("idle");
      }



    }

  }
  const searchSong = debounce(searchsong, 1000);
  const handleLike = async (item) => {
    let data = {};
    let currentsong = item;
    data.currentUser = currentUser;
    data.currentsong = currentsong;
    await dispatch(likeSongAsync(data));
    await dispatch(getlikeSongAsync({ id: currentUser?.id }))
  }


  return (
    <div className='rounded-lg h-full w-full text-green-500 bg-gradient-to-t from-black via-black to-green-900'>
      <Login />
      <div className="relative w-full max-w-md mx-auto bg-neutral-700 text-white">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <BsSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          id="song"
          onChange={searchSong}
          type="text"
          placeholder="Search Any Song..."
          className="w-full py-2 pl-10 pr-4 text-white bg-neutral-800  border rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className='w-full overflow-y-auto h-3/4 '>
        {status === "working" &&
          <div className='w-full h-full flex justify-center items-center'>
            <RotateLoader color="#1DB954" size={100} />
          </div>
        }
        {status === "idle" && songs.length !== 0 &&
          <div className='w-full h-full flex flex-col justify-center items-center '>
            {songs?.map((item) => (
              <div className='h-20 w-full flex justify-start items-center  mt-2 ml-2  rounded-lg m-2'>
                <img alt="img" src={item?.thumbnail} className='h-full rounded-lg ' />
                <div className='flex flex-col justify-center items-center h-full  '>
                  <h1 className='font-semibold text-xl ml-2'>{item?.title}</h1>
                  <div className='flex justify-center items-center'>
                    <div className='w-1/2 ' ><  AiFillPlayCircle className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300" onClick={async () => { await dispatch(setCurrentSong(item)) }} /></div>
                    <div className='w-1/2 ' >
                      {Lsongs?.includes(item)?(
                      <  BiSolidLike className=" mt-2 text-4xl rounded-full  hover:text-green-300" />

                      ):(
                        <  BiLike className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300" onClick={() => handleLike(item)}/>

                      )}
                    
                    
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
        }
        {status === "idle" && songs.length === 0 &&
          <div className='w-full h-full flex justify-center items-center'>
            <h1 className='font-bold text-4xl'>No Songs Found</h1>
          </div>
        }
        {status === "start" &&
          <div className='w-full h-full flex justify-center items-center'>
            <h1 className='font-bold text-4xl'>Try Searching Something</h1>
          </div>
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

export default Search