"use client";

import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  title: string;
  thumbnail: FileList;
  song: FileList;
}

const Upload: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    // Now you can access the form data in a type-safe way:
    const { title, thumbnail, song } = data;

    // Handle form submission here, e.g., send data to the server
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Song Upload</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            {...register('title', { required: true })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-600">
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            accept=".jpg,.jpeg,.png"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            {...register('thumbnail', { required: true })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="song" className="block text-gray-600">
            Audio File
          </label>
          <input
            type="file"
            id="song"
            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            accept=".mp3,.mp4,.wav,.ogg"
            {...register('song', { required: true })}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Upload Song
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
