import axios from 'axios';
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'
import { TokenRefreshing } from '../../Redux/UserSlice';
import { AdminTokenRefreshing } from '../../Redux/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance,baseURLAdmin,baseURLUser } from './Instance';
// const baseURL='http://127.0.0.1:8000/'


const useAxios = ()=>{
    const dispatch=useDispatch();
    
    const user = useSelector(state => state.UserReducer.user)
    const admin = useSelector(state => state.AdminReducer.admin)
    const accessToken =user? useSelector(state=>state.UserReducer.accessToken):useSelector(state=>state.AdminReducer.accessToken);
    const refreshToken =user ?  useSelector(state=>state.UserReducer.refreshToken):useSelector(state=>state.AdminReducer.refreshToken)
    let isRefreshing = false; // Flag to track ongoing token refresh
    const refreshQueue = []; //to store pending requests
     const baseURL =user ? baseURLUser : baseURLAdmin
     const axiosUserInstance=axios.create({
        baseURL,
        headers:{Authorization:`Bearer ${accessToken}`}
    });
    
    // interceptor
    axiosUserInstance.interceptors.request.use(async req =>{
 
        // know expiry
        const user = jwt_decode(accessToken);
      // checking expired or not
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1 ;
        console.log(isExpired,'expired');
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
            isRefreshing=true; //make flag true
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
             if(user){
                 dispatch(TokenRefreshing({accessToken: access, refreshToken: refresh}));
                }else if(admin){
                 dispatch(AdminTokenRefreshing({accessToken: access, refreshToken: refresh}));

             }
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
           
            
        }
    }

    return axiosUserInstance
}

export default useAxios;