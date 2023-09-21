"use client"
import React from 'react'
import Login from './Login'
import Modal from '../components/Modal';
import Upload from '../components/Upload';
import NotAllowed from '../components/NotAllowed';
import { useAppSelector } from '../hooks/hooks';


const Search = () => {
    const m = useAppSelector((state) => state?.user?.currentUser);

  return (
    <div className='rounded-lg h-full w-full text-green-500 bg-gradient-to-t from-black via-black to-green-900'>
        <Login />

        <Modal>
                {
                    m ? (<Upload />) : (<NotAllowed />)
                }

            </Modal>
    </div>
  )
}

export default Search