
'use client'
import { createSlice } from '@reduxjs/toolkit';

interface State { 
    currentUser: null | object ,
    currentPage:"main" | "search" | "liked"
    modal : "close" | "open",
    socket :"on" | "off",
    mySongs: object
}

const initialState : State = {
    currentUser:null,
    modal:"close",
    socket:"on",
    currentPage:"main",
    mySongs:[]

};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        
        setCurrentUser:(state,action) => {
            
            state.currentUser = action.payload
        },
        openModal:(state) => {
            if(state.socket=="on"){
                state.modal = "open";
            }
            
        },
        closeModal:(state) => {
            if(state.socket=="on"){
                state.modal = "close";
            }
        },
        onModal:(state) => {
            state.socket = "on";
        },
        offModal:(state) => {
            state.socket = "off";
        },
        setPage:(state,action) => {
            state.currentPage = action.payload;
        },
        setMySongs:(state,action) => {
            state.mySongs = action.payload;
        }
    },
    


});

export const { setCurrentUser,openModal,closeModal,onModal,offModal ,setPage,setMySongs } = userSlice.actions;
export default userSlice.reducer;