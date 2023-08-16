import axios from 'axios';
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'
import { AdminTokenRefreshing } from '../../Redux/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance,baseURLAdmin } from './Instance';


const useAdminAxios = ()=>{
    const dispatch=useDispatch();
    
  
    const accessToken =useSelector(state=>state.AdminReducer.accessToken);
    const refreshToken =useSelector(state=>state.AdminReducer.refreshToken);
    let isRefreshing = false; // Flag to track ongoing token refresh
    const refreshQueue = []; //to store pending requests
     const baseURL = baseURLAdmin
     const axiosAdminInstance=axios.create({
        baseURL,
        headers:{Authorization:`Bearer ${accessToken}`}
    });
    // console.log(accessToken,refreshToken,baseURL);
    // interceptor
    axiosAdminInstance.interceptors.request.use(async req =>{
 
        // know expiry
        const user = jwt_decode(accessToken);
        console.log(user);
      // checking expired or not
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1 ;
        console.log(isExpired,'expired');
        if(!isExpired){
            return req
        } 
            
       // to ensure that multiple request not send to api/refresh end point
       console.log(isRefreshing,'####################################33');
        if (isRefreshing) {
            console.log('am i working o r=r mirnw12222@@@@@@@@@@@@@@@@@@@@@@@');
            return new Promise((resolve) => {
                refreshQueue.push(resolve);
            });
        };
        // refreshing token
        try {
            isRefreshing=true ; 
        console.log(isRefreshing,'anhii dekhoooooooooooooooooooooooo');
            const response = await axios.post(`${axiosInstance}/api/token/refresh/`,{
                refresh:refreshToken
             });
             console.log(response);
             const access=response?.data.access;
             const refresh =response?.data.refresh;

            //  change header of current requests
             req.headers.Authorization = `Bearer ${access}`;

             //  send pending requests
             await retryFailedRequests(access);
             
            //  refreshQueue.forEach((resolve) => resolve(access));
             refreshQueue.length = 0; // Clear the queue
             
            dispatch(AdminTokenRefreshing({accessToken: access, refreshToken: refresh}));

          
        }catch (error) {
            console.log(error,'am i printinggg');
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

    return axiosAdminInstance
}

export default useAdminAxios;