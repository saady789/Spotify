"use client"
import React, { useState, useEffect } from 'react';
import { useAppSelector } from './hooks/hooks';
import Search from './components/Search';
import Liked from './components/Liked';
import Main from './components/Main';
import Player from './components/Player';
import {getlikeSongAsync} from "./redux/userSlice";
import { useDispatch } from 'react-redux';
export default function Home() {
  
  const dispatch = useDispatch();
  // const m = useAppSelector((state) => state?.user?.currentUser);
  const currentPage = useAppSelector((state) => state?.user?.currentPage);
  const currentsong = useAppSelector((state) => state?.user?.currentSong);
  const currentUser = useAppSelector((state) => state?.user?.currentUser);

 
  useEffect(() => {
    if(!currentUser) return;
    const dis = async() => {
      await dispatch(getlikeSongAsync({id:currentUser?.id}))
    }
    dis();
  }, [currentUser,dispatch])

  
 

  return (
    <>
{ currentPage ==="main" && <Main/> }
{ currentPage ==="search" && <Search/> }
{ currentPage ==="liked" && <Liked/> }
{ currentsong && <Player />}


      
    </>
  )
}
