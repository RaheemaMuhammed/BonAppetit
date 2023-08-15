import axios from 'axios';
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'
import {store} from '../../Redux/Store'
import { TokenRefreshing } from '../../Redux/UserSlice';
import { getTokens } from './tokenUtils';
// const { accessToken,refreshToken} =getTokens()
let isRefreshing = false; // Flag to track ongoing token refresh
const refreshQueue = [];
 const storage=localStorage.getItem('persist:root') ? JSON.parse(localStorage.getItem('persist:root')):''

 const userReducerState = storage?.UserReducer ? JSON.parse(storage.UserReducer):''

const baseURL='http://127.0.0.1:8000/'

// export const axiosUserInstance=axios.create({
//     baseURL:'http://127.0.0.1:8000/',
//     headers:{Authorization:`Bearer ${accessToken}`}
// })
// axiosUserInstance.interceptors.request.use(async req =>{
    // const currentState=store.getState()
    // console.log(currentState);
    
    // let accessToken=currentState ? currentState.UserReducer.accessToken :''
    // let refreshToken=currentState ? currentState.UserReducer.refreshToken :''
//     console.log(accessToken,refreshToken);
    
//     console.log(accessToken,'**************');
//     const user = jwt_decode(accessToken)
//     console.log(user);
//     console.log(dayjs.unix(user.exp).diff(dayjs()));
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1 ;
//     console.log('isExpired:',isExpired);
//     if(!isExpired) return req
//     console.log(refreshToken,'lljkj');
//     if (isRefreshing) {
//         return new Promise((resolve) => {
            
//             refreshQueue.push(resolve);
//         });
//     }
//     try {
//         isRefreshing=true;
//         const response = await axios.post(`${baseURL}api/token/refresh/`,{
//             refresh:refreshToken
//          })
//          console.log(response);
//          const access=response?.data.access
//          const refresh =response?.data.refresh
//          console.log(access,refresh);


//          req.headers.Authorization = `Bearer ${access}`


//         store.dispatch(TokenRefreshing({accessToken: access, refreshToken: refresh}))

//         refreshQueue.forEach((resolve) => resolve(access));
//         refreshQueue.forEach((resolve) => console.log(resolve));
//         refreshQueue.length = 0; // Clear the queue
//     }catch (error) {
//         console.log(error,'am i printinggg');
//     }finally{
//         isRefreshing=false
//     }
//     console.log('lkkkkkkkjhhgtfdhtrtrd');
//     return req
// })

export const axiosCommonInstance=axios.create({baseURL:'http://127.0.0.1:8000/'})
export const axiosUserInstance=axios.create({baseURL:'http://127.0.0.1:8000/'})
export const axiosAdminInstance = axios.create({baseURL:'http://127.0.0.1:8000/adminpanel/'})

export const axiosInstance= 'http://127.0.0.1:8000'