"use client"
import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from './firebase/firebase';
import { toast } from "react-toastify";
import { useCurrentUser } from './hooks/useCurrentUser';
import Modal from './components/Modal';
import Upload from './components/Upload';
import NotAllowed from './components/NotAllowed';
import { useAppSelector } from './hooks/hooks';
interface User {
  name: string | null;
  email: string | null;
  image: string | null;
  id: string | null;
}

export default function Home() {
  const m = useAppSelector((state) => state?.user?.currentUser);
  const [status, setStatus] = useState(false);
  const provider = new GoogleAuthProvider();

  // Declare currentUser and initialize it to null
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user data from localStorage when the component mounts
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      setCurrentUser(user);
    }
  }, []); // Empty dependency array to run only once when the component mounts

  const handleLogin = async () => {
    try {
      setStatus(true);
      const { user } = await signInWithPopup(firebaseAuth, provider);
      let obj = { name: user?.displayName, email: user?.email, image: user?.photoURL, id: user?.uid };
      console.log(obj);
      const url = "/api/createUser";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need here
        },
        body: JSON.stringify(obj),
      });

      const responseData = await response.json();


      if (responseData != "InternalServerError") {
        toast.success("Welcome Back");
        useCurrentUser("set", responseData)
        setCurrentUser(responseData); // Update the currentUser state
        window.location.href = "/";
      }

    } catch (e) {
      console.log("An error has occurred ", e);
    }
  }
  const handleLogout = async () => {
    setStatus(true);
    useCurrentUser("del", null)
    window.location.href = "/";

  }

  return (
    <>

      <div className='rounded-lg h-full w-full text-green-500 bg-gradient-to-t from-black via-black to-green-900'>
        <div className='w-full h-16 flex '>
          <div className='m-2 h-full w-1/2 flex justify-start '>
            <IoIosArrowBack className="bg-black rounded-full p-2 text-neutral-400 m-1 text-4xl hover:text-white ml-2 cursor-pointer" />
            <IoIosArrowForward className="bg-black rounded-full p-2 text-neutral-400 m-1 text-4xl hover:text-white ml-2 cursor-pointer" />
          </div>
          {currentUser ? (
            <div className='h-full w-1/2 flex justify-end m-2 text-center'>
              <button className='rounded-lg rounded-l-full rounded-r-full mr-4 h-1/2 p-2 font-semibold hover:text-white text-xl' onClick={handleLogout}>Logout</button>
              <img alt="img" src={currentUser.image || ''} className='rounded-full' />
            </div>
          ) : (
            <div className='h-full w-1/2 flex justify-end m-2 text-center'>
              <button className='rounded-lg rounded-l-full rounded-r-full mr-4 h-1/2 p-2 font-semibold hover:text-white text-xl' disabled={status} onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
        <h1 className='text-white text-4xl font-semibold m-2'>Welcome Back</h1>
      </div>
      <Modal>
        {
          m?( <Upload/>):(<NotAllowed/>)
        }
     
      </Modal>
    </>
  )
}
