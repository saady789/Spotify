"use client"
import React, { useState, useEffect } from 'react';
import { useAppSelector } from './hooks/hooks';
import Search from './components/Search';
import Liked from './components/Liked';
import Main from './components/Main';


export default function Home() {
  // const m = useAppSelector((state) => state?.user?.currentUser);
  const currentPage = useAppSelector((state) => state?.user?.currentPage);

 

  return (
    <>
{ currentPage ==="main" && <Main/> }
{ currentPage ==="search" && <Search/> }
{ currentPage ==="liked" && <Liked/> }

      
    </>
  )
}
