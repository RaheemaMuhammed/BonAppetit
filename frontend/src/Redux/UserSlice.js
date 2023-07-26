import { createSlice } from '@reduxjs/toolkit';
 
const UserSlice= createSlice({
    name:'user',
    initialState:{
        refreshToken:null,
        accessToken:null,
        user:null,
        premium:null,
    },
    reducers:{
        UserLogin:(state,action)=>{
            state.refreshToken=action.payload.refreshToken
            state.accessToken=action.payload.accessToken
            state.user=action.payload.user
            state.premium=action.payload.premium           
        },
        UserLogout:(state,action)=>{
            state.refreshToken=null
            state.accessToken=null
            state.user=null
            state.premium=false
        },
        UserPremium:(state,action)=>{
            state.premium=true
        }
    }
})

export const { UserLogin,UserLogout,UserPremium  }= UserSlice.actions
export default UserSlice.reducer