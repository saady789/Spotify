
'use client'
import { createSlice } from '@reduxjs/toolkit';

interface State { 
    currentUser: null | object ,
    modal : "close" | "open"
}

const initialState : State = {
    currentUser:null,
    modal:"close"

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
            state.modal = "open";
        },
        closeModal:(state) => {
            state.modal = "close";
        }
    },
    


});

export const { setCurrentUser,openModal,closeModal } = userSlice.actions;
export default userSlice.reducer;