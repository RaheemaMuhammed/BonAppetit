import { createSlice } from "@reduxjs/toolkit";


const AdminSlice = createSlice({
    name:'admin',
    initialState:{
        refreshToken:null,
        accessToken:null,
        admin:null
    },
    reducers:{
        AdminLogin :(state,action) =>{
            state.refreshToken = action.payload.refreshToken
            state.accessToken = action.payload.accessToken
            state.admin = action.payload.admin
            },
        AdminTokenRefreshing:(state,action)=>{
                state.refreshToken=action.payload.refreshToken
                state.accessToken=action.payload.accessToken  
            },
        AdminLogout :(state,action) =>{
            state.refreshToken =  null
            state.accessToken = null
            state.admin = null;
        }
    }
})
export const { AdminLogin, AdminLogout,AdminTokenRefreshing } = AdminSlice.actions
export default AdminSlice.reducer