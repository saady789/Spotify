import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from './firebase/firebase';

interface User {
  name: string | null;
  email: string | null;
  image: string | null;
  id: string | null;
}

export default function Home() {
  const [status, setStatus] = useState(false);
  const provider = new GoogleAuthProvider();

  // Declare currentUser outside the if block
  let currentUser: User | null = null;

  if (localStorage.getItem("user")) {
    // Parse the user object from localStorage
    currentUser = JSON.parse(localStorage.getItem("user")) as User;
  }

  const handleLogin = async () => {
    try {
      setStatus(true);
      const { user } = await signInWithPopup(firebaseAuth, provider);
      let obj = { name: user?.displayName, email: user?.email, image: user?.photoURL, id: user?.uid };
      localStorage.setItem("user", JSON.stringify(obj));
      currentUser = obj; // Update the currentUser
      window.location.href = "/";
    } catch (e) {
      console.log("An error has occurred ", e);
    }
  }

  return (
    <div className='rounded-lg h-full w-full text-green-500 bg-gradient-to-t from-black via-black to-green-900'>
      <div className='w-full h-16 flex '>
        <div className='m-2 h-full w-1/2 flex justify-start '>
          <IoIosArrowBack className="bg-black rounded-full p-2 text-neutral-400 m-1 text-4xl hover:text-white ml-2 cursor-pointer" />
          <IoIosArrowForward className="bg-black rounded-full p-2 text-neutral-400 m-1 text-4xl hover:text-white ml-2 cursor-pointer" />
        </div>
        {currentUser ? (
          <div className='h-full w-1/2 flex justify-end m-2 text-center'>
            <button className='rounded-lg rounded-l-full rounded-r-full mr-4 h-1/2 p-2 font-semibold hover:text-white text-xl' disabled={status} onClick={handleLogin}>Logout</button>
            <img alt="img" src={currentUser.image} />
          </div>
        ) : (
          <div className='h-full w-1/2 flex justify-end m-2 text-center'>
            <button className='rounded-lg rounded-l-full rounded-r-full mr-4 h-1/2 p-2 font-semibold hover:text-white text-xl' disabled={status} onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
      <h1 className='text-white text-xl font-semibold m-2'>Welcome Back</h1>
    </div>
  )
}
