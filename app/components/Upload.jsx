"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { app } from "../firebase/firebase";
import { toast } from "react-toastify";
import { closeModal, onModal, offModal } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";


const Upload = () => {
  const m = useSelector((state) => state?.user?.currentUser);

  const dispatch = useDispatch();
  const [status, setStatus] = useState("0");
  // 0 for normal case : 1 means uploading state : 2 means error : 3 means successfully uploaded 


  let obj = {
    title: "",
    thumbnail: "",
    song: "",

  };
  const {
    register,
    handleSubmit,

  } = useForm();

  const onSubmit = async (data) => {

    await dispatch(offModal());
    setStatus("1");
    obj.title = data.title;
    let thumbnail = data.thumbnail[0];
    let song = data.song[0];
    const storage = getStorage(app);

    const thumbnailRef = ref(storage, `thumbnail/${thumbnail.name}`);
    const thumbnailUploadTask = uploadBytesResumable(thumbnailRef, thumbnail);

    const songRef = ref(storage, `song/${song.name}`);
    const songUploadTask = uploadBytesResumable(songRef, song);

    try {
      await Promise.all([
        new Promise((resolve, reject) => {
          thumbnailUploadTask.on('state_changed',
            (snapshot) => {
              const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            async (error) => {
              toast.error('Song uploading failed. Try again');
              setStatus("2");
              await dispatch(closeModal());
              setTimeout(() => {
                setStatus("0");
              }, 450);
              return;
            },
            () => {
              getDownloadURL(thumbnailRef).then((url) => {
                console.log("The thumbnail url is ", url);
                obj.thumbnail = url;
                resolve(1);
              });
            }
          );
        }),
        new Promise((resolve, reject) => {
          songUploadTask.on('state_changed',
            (snapshot) => {
              const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            async (error) => {
              toast.error('Song uploading failed. Try again');
              setStatus("2");
              await dispatch(closeModal());
              setTimeout(() => {
                setStatus("0");
              }, 450);
              return;
            },
            () => {
              getDownloadURL(songRef).then((url) => {
                console.log("The song url is ", url);
                obj.song = url;
                resolve(1);
              });
            }
          );
        }),
      ]);
      if (m) {
        obj.currentUser = m;
      }

      const url = "/api/createSong";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need here
        },
        body: JSON.stringify(obj)

      });
      const responseData = await response.json();
      console.log("the response is", responseData);
      if (responseData == "InternalServerError") {
        toast.error('Song uploading failed. Try again');
        setStatus("2");
        await dispatch(closeModal());
        setTimeout(() => {
          setStatus("0");
        }, 450);
        return;
      }
      // Both uploads are complete
      setStatus("3");
      await dispatch(onModal());
      await dispatch(closeModal());
      toast.success("Song successfully uploaded");

      // Now you can access the form data in a type-safe way:
      console.log("The song data is", obj);

      setTimeout(() => {
        setStatus("0");
      }, 450);
    } catch (error) {
      toast.error('Song uploading failed. Try again');
      setStatus("2");
      await dispatch(closeModal());
      setTimeout(() => {
        setStatus("0");
      }, 450);
      return;

    }
  };




  return (
    <div className="container mx-auto mt-8">
      {status === "0" &&
        <>
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
        </>
      }

      {status === "1" &&
        <div className='flex flex-col justify-center items-center'>
          <h1 className='font-bold m-4 text-xl'>Please wait as the song is getting uploaded</h1>
          <div className='m-4 ' ><ClipLoader color="#3498db" loading={true} size={50} /></div>
        </div>
      }
    </div>
  );
};

export default Upload;
