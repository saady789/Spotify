import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import {AiFillPlayCircle} from "react-icons/ai"
import {BiSolidLike} from "react-icons/bi";

const Allsongs = () => {
    const mySongs = useAppSelector((state) => state?.user?.mySongs);

    return (
        <>
            <h1 className='text-white text-2xl font-semibold m-2'>Newest Songs</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 m-2  w-1/2">
                {mySongs?.map((card, index) => (
                    <div key={index} className=" bg-neutral-800 p-4 rounded-lg shadow-md mt-2 h-60 w-40 gap-0 cursor-pointer flex flex-col justify-start items-center">
                        {/* Card Content */}
                        <img alt="img" src={card?.thumbnail} className='w-7/8 h-7/8 rounded-lg' />
                        <h2 className="text-lg mt-2 font-semibold">{card.title}</h2>
                        <div className='flex justify-start items-center w-full mt-2 ml-2 '>
                            <div className='w-1/2' ><  AiFillPlayCircle  className=" mt-2 text-4xl rounded-full  hover:text-green-300"/></div>
                            <div className='w-1/2' ><  BiSolidLike   className=" mt-2 text-4xl rounded-full  hover:text-green-300"/></div>

                        </div>
                        
                    </div>
                ))}
            </div>
        </>
    );
}

export default Allsongs;
