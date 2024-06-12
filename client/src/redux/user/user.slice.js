import { createSlice } from "@reduxjs/toolkit";

// initiating the value of state (inital State)
const initialState = {
  user: null,
  loading: false,
  error: false,
};
// making different types of reducers 
const userSlice = createSlice({
  name : 'user',
  initialState,
  reducers : {
    signInStart : (state) => {
      state.loading = true
    },
    signInSuccess : (state , action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
      
    },
    signInFailure : (state , action) => {
      state.error = action.payload
      state.loading = false
    },
    updateUserStart: (state) => {
      state.loading= true ;
    },
    updateUserSuccess : (state , action) => {
      state.currentUser = action.payload;
      state.loading = false ;
      state.error = false;
    },
    updateUserFailure : (state , action)=> {
      state.loading = false ;
      state.error = action.payload; 
    },
    deleteUserStart: (state) => {
      state.loading= true ;
    },
    deleteUserSuccess : (state ) => {
      state.currentUser = null;
      state.loading = false ;
      state.error = false;
    },
    deleteUserFailure : (state , action)=> {
      state.loading = false ;
      state.error = action.payload; 
    },
    SignOutUserSuccess : (state ,action) => {
      state.currentUser = null;
      state.loading = false ;
      state.error = false;
    }
   }
})

export const {signInFailure , signInStart , signInSuccess , updateUserFailure , updateUserStart , updateUserSuccess , deleteUserFailure , deleteUserStart , deleteUserSuccess , SignOutUserSuccess  } = userSlice.actions
export default userSlice.reducer