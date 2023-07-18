import { createSlice } from '@reduxjs/toolkit';
 
const UserSlice= createSlice({
    name:'user',
    initialState:{
        refreshToken:null,
        accessToken:null,
        user:null,
        recipes:null
    },
    reducers:{
        UserLogin:(state,action)=>{
            state.refreshToken=action.payload.refreshToken
            state.accessToken=action.payload.accessToken
            state.user=action.payload.user
            state.recipes=action.payload.recipes
        },
        RecipeAdd:(state,action)=>{
            if (state.recipes){
                state.recipes.push(action.payload.recipes)
            }else{
                state.recipes=[action.payload.recipes]
            }

        },
        UserLogout:(state,action)=>{
            state.refreshToken=null
            state.accessToken=null
            state.user=null
            state.recipes=null

        }
    }
})

export const { UserLogin,UserLogout ,RecipeAdd }= UserSlice.actions
export default UserSlice.reducer