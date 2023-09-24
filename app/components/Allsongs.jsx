import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import { AiFillPlayCircle } from "react-icons/ai"
import { BiSolidLike, BiLike } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { setCurrentSong, getlikeSongAsync, likeSongAsync } from "../redux/userSlice";

const Allsongs = () => {
    const dispatch = useDispatch();
    const mySongs = useAppSelector((state) => state?.user?.mySongs);
    const allSongs = useAppSelector((state) => state?.user?.allSongs);

    // const currentsong = useAppSelector((state) => state?.user?.currentSong);
    const currentUser = useAppSelector((state) => state?.user?.currentUser);
    const Lsongs = useAppSelector((state) => state?.user?.likedSongs);
    const handleLike = async (card) => {
        console.log("The card is ",card);
        let currentSong = card;
        let data = {};
        data.currentUser = currentUser;
        data.currentSong = currentSong;
        await dispatch(likeSongAsync(data));
        await dispatch(getlikeSongAsync({ id: currentUser?.id }))
    }

    const checkSong = (song) =>{
        console.log("The song is",song)
        console.log("ALl songs are ",Lsongs)
        let ID = song.id;
        Lsongs.map((item)=>{
            if(item.likedSongId === ID){
                console.log("true");
                return true;
                
            }
        })


        // console.log("false");
        // return false;


        
     }

    return (
        <>
            <h1 className='text-white text-2xl font-semibold m-2'>Newest Songs</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 m-2  w-1/2">
                {allSongs?.map((card, index) => (
                    <div key={index} className=" bg-neutral-800 p-4 rounded-lg shadow-md mt-2 h-60 w-40 gap-0 cursor-pointer flex flex-col justify-start items-center">
                        {/* Card Content */}
                        <img alt="img" src={card?.thumbnail} className='w-7/8 h-7/8 rounded-lg' />
                        <h2 className="text-lg mt-2 font-semibold">{card.title}</h2>
                        <div className='flex justify-start items-center w-full mt-2 ml-2 '>
                            <div className='w-1/2' ><  AiFillPlayCircle className=" cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300" onClick={async () => { await dispatch(setCurrentSong(card)) }} /></div>
                            <div className='w-1/2' >
                                {checkSong(card) ? (
                                    <  BiSolidLike className=" mt-2 text-4xl rounded-full  hover:text-green-300" />

                                ) : (
                                    <  BiLike className="cursor-pointer mt-2 text-4xl rounded-full  hover:text-green-300" onClick={() => handleLike(card)} />

                                )}

                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}

export default Allsongs;
