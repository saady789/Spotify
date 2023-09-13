import Image from 'next/image'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
export default function Home() {
  return (
    <div className=' rounded-lg h-full w-full text-green-500 bg-gradient-to-t from-black via-black to-green-900 '>
      <div className='w-full h-16 flex '>
        <div className='m-2 h-full w-1/2 flex justify-start '>
          <IoIosArrowBack className=" bg-black rounded-full p-2  text-neutral-400 m-1 text-4xl hover:text-white ml-2 cursor-pointer" />
          <IoIosArrowForward className=" bg-black rounded-full p-2  text-neutral-400 m-1 text-4xl hover:text-white ml-2 cursor-pointer" />
        </div>
        <div className='h-full w-1/2 flex justify-end m-2 text-center'>
        <button className='rounded-lg rounded-l-full rounded-r-full mr-4 h-1/2 p-2 font-semibold hover:text-white  text-xl'>Login</button>


          
        </div>
      </div>
      <h1 className='text-white text-xl font-semibold m-2'>Welcome Back</h1>

    </div>
  )
}

// this is the front page of the application 
