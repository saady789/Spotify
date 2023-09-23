
'use client'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';

interface State { 
    currentUser: null | object ,
    currentPage:"main" | "search" | "liked"
    modal : "close" | "open",
    socket :"on" | "off",
    mySongs: object,
    navigation:string[],
    currentSong:object | null,
    likedSongs:object | null;
}

const initialState : State = {
    currentUser:null,
    modal:"close",
    socket:"on",
    currentPage:"main",
    mySongs:[],
    navigation:[],
    currentSong:null,
    likedSongs:[]

};

export const likeSongAsync = createAsyncThunk(
    'song/likeSong',
    async (data) => {
        console.log("The data is" ,data)
        let url = "/api/likeSong";
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            body:JSON.stringify(data)
        });
        const d = await response.json();
        console.log(d);
        return d;
    }
);

export const getlikeSongAsync = createAsyncThunk(
    'song/getlikeSong',
    async (data) => {
        
        let url = "/api/getLikedSong";
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            body:JSON.stringify(data)
        });
        const d = await response.json();
        console.log(d);
        return d;
    }
);



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
            state.navigation.push(action.payload);
            state.currentPage = action.payload;
        },
        setMySongs:(state,action) => {
            state.mySongs = action.payload;
        },
        setCurrentSong:(state,action) => {
            state.currentSong = action.payload;
        },
        removeCurrentSong:(state) => {
            state.currentSong = null;
        }
    },
    extraReducers: (builder) => {
        builder
           
            .addCase(likeSongAsync.pending, (state) => {
                
            })
            .addCase(likeSongAsync.fulfilled, (state, action) => {
                
            })
            .addCase(getlikeSongAsync.pending, (state) => {
                
            })
            .addCase(getlikeSongAsync.fulfilled, (state, action) => {
                if(action.payload==="InternalServerError" || action.payload ==="Not Found"){}
                else {
                    state.likedSongs = action.payload;
                }
            })
            
    },
    


});

export const { setCurrentUser,openModal,closeModal,onModal,offModal ,setPage,setMySongs,setCurrentSong,removeCurrentSong} = userSlice.actions;
export default userSlice.reducer;