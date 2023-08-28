import axios from 'axios';
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'
import { TokenRefreshing } from '../../Redux/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance,baseURLUser } from './Instance';


const useAxios = ()=>{
    const dispatch=useDispatch();
    
    const accessToken =useSelector(state=>state.UserReducer.accessToken)
    const refreshToken =useSelector(state=>state.UserReducer.refreshToken)
    const refreshQueue = []; //to store pending requests
    let isRefreshing = false; 
     const baseURL = baseURLUser 
     const axiosUserInstance=axios.create({
        baseURL,
        headers:{Authorization:`Bearer ${accessToken}`}
    });
    // console.log(accessToken,refreshToken,baseURL);
    // interceptor
    axiosUserInstance.interceptors.request.use(async req =>{
 
        // know expiry
        const user = jwt_decode(accessToken);
      // checking expired or not
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1 ;
        if(!isExpired){
            return req
        } 
            
       // to ensure that multiple request not send to api/refresh end point
        if (isRefreshing) {
            return new Promise((resolve) => {
                refreshQueue.push(resolve);
            });
        };
        // refreshing token
        try {
            isRefreshing=true ; 
     
            const response = await axios.post(`${axiosInstance}/api/token/refresh/`,{
                refresh:refreshToken
             });
             const access=response?.data.access;
             const refresh =response?.data.refresh;

            //  change header of current requests
             req.headers.Authorization = `Bearer ${access}`;

             //  send pending requests
             await retryFailedRequests(access);
             
            //  refreshQueue.forEach((resolve) => resolve(access));
             refreshQueue.length = 0; // Clear the queue
            
            dispatch(TokenRefreshing({accessToken: access, refreshToken: refresh}));
              
        }catch (error) {
            console.log(error,'error');
        }finally{
            isRefreshing=false
        }
        return req
    })
    // sending pending requests
    const retryFailedRequests= async (newAccess)=>{
        while (refreshQueue.length>0) {
            const resolve = refreshQueue.shift();
            const value = await resolve(newAccess);
            console.log(value);
           
            
        }
    }

    return axiosUserInstance
}

export default useAxios;