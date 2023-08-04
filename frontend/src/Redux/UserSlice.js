import { createSlice } from '@reduxjs/toolkit';
 
const UserSlice= createSlice({
    name:'user',
    initialState:{
        refreshToken:null,
        accessToken:null,
        user:null,
        premium:null,
        requested:null
    },
    reducers:{
        UserLogin:(state,action)=>{
            state.refreshToken=action.payload.refreshToken
            state.accessToken=action.payload.accessToken
            state.user=action.payload.user
            state.premium=action.payload.premium
            state.requested=action.payload.requested           
        },
        UserLogout:(state,action)=>{
            state.refreshToken=null
            state.accessToken=null
            state.user=null
            state.premium=false
            state.requested=false
        },
        UserPremium:(state,action)=>{
            state.premium=true
        },
        UserPaymentRequest:(state,action)=>{
            state.requested=true
        }
    }
})

export const { UserLogin,UserLogout,UserPremium,UserPaymentRequest  }= UserSlice.actions
export default UserSlice.reducer