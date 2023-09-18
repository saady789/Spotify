import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { closeModal } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/hooks';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const status = useAppSelector((state) => state?.user?.modal);

  const dispatch = useDispatch();

  return (
    <>
      {status === 'open' && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-md bg-opacity-50 ">
          <div className="bg-slate-300 p-4 rounded-lg shadow-lg max-w-md w-full h-7/8">
            <div className=' w-full h-15 flex justify-end items-center'>
              <AiOutlineClose
                className="font-bold cursor-pointer"
                onClick={async () => await dispatch(closeModal())}
              />
            </div>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;


