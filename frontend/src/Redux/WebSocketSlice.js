import { createSlice } from "@reduxjs/toolkit";


const WebSocketSlice = createSlice({
    name:'webSocket',
    initialState:{
        notifs:[],
         
    },
    reducers:{
        setNotifs: (state, action) => {
            state.notifs.push(action.payload)
            
          },
        clearNotifs: (state,action) => {
            state.notifs = [];
            
          },
          handleStatus:(state,action)=>{
            state.notifs.map(item=>item.is_read=true)
          }
    }
})
export const { setNotifs,clearNotifs,handleStatus } = WebSocketSlice.actions
export default WebSocketSlice.reducer