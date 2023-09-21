"use client";

import React, { useState } from 'react';
import { useAppSelector } from '../hooks/hooks';

const Player = () => {
  const currentSong = useAppSelector((state) => state?.user?.currentSong);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (currentSong) {
    return (
      <>
        <div>I am the song player</div>
        <button onClick={openModal}>Open Modal</button>

        {currentSong && (
          <div className="fixed inset-x-0 bottom-0 h-32 bg-gray-800 text-white p-4 bg-opacity-100">
            {/* Modal content */}
            <div className="flex justify-between items-center">
              <p>{currentSong.title}</p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return null; // Render nothing if there's no current song
  }
};

export default Player;
