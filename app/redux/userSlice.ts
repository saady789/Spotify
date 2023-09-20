
'use client'
import { createSlice } from '@reduxjs/toolkit';

interface State { 
    currentUser: null | object ,
    modal : "close" | "open",
    socket :"on" | "off"
}

const initialState : State = {
    currentUser:null,
    modal:"close",
    socket:"on"

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
        }
    },
    


});

export const { setCurrentUser,openModal,closeModal,onModal,offModal  } = userSlice.actions;
export default userSlice.reducer;