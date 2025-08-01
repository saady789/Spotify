"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "./hooks/hooks";
import Search from "./components/Search";
import Liked from "./components/Liked";
import Main from "./components/Main";
import Player from "./components/Player";
import { getlikeSongAsync } from "./redux/userSlice";
import { useDispatch } from "react-redux";
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            This app is not compatible with mobile devices
          </h1>
          <p className="text-lg text-gray-300">
            Please use a desktop or laptop to access this website.
          </p>
        </div>
      </div>
    );
  }
  const dispatch = useDispatch();
  // const m = useAppSelector((state) => state?.user?.currentUser);
  const currentPage = useAppSelector((state) => state?.user?.currentPage);
  const currentsong = useAppSelector((state) => state?.user?.currentSong);
  const currentUser = useAppSelector((state) => state?.user?.currentUser);

  useEffect(() => {
    if (!currentUser) return;
    const dis = async () => {
      await dispatch(getlikeSongAsync({ id: currentUser?.id }));
    };
    dis();
  }, [currentUser, dispatch]);

  return (
    <>
      {currentPage === "main" && <Main />}
      {currentPage === "search" && <Search />}
      {currentPage === "liked" && <Liked />}
      {currentsong && <Player />}
    </>
  );
}
