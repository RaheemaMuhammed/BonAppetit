import axios from 'axios';
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'
import { TokenRefreshing } from '../../Redux/UserSlice';
// import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const baseURL='http://127.0.0.1:8000/'


const useAxios = ()=>{
    const dispatch=useDispatch();
    const accessToken = useSelector(state=>state.UserReducer.accessToken);
    const refreshToken = useSelector(state=>state.UserReducer.refreshToken);
    let isRefreshing = false; // Flag to track ongoing token refresh
    const refreshQueue = [];

     const axiosUserInstance=axios.create({
        baseURL,
        headers:{Authorization:`Bearer ${accessToken}`}
    });


    axiosUserInstance.interceptors.request.use(async req =>{
 
        const user = jwt_decode(accessToken);

        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1 ;
        console.log(isExpired);
        if(!isExpired){
            return req
        } 
            

        if (isRefreshing) {
            return new Promise((resolve) => {
                refreshQueue.push(resolve);
            });
        };
        try {
            isRefreshing=true;
            const response = await axios.post(`${baseURL}api/token/refresh/`,{
                refresh:refreshToken
             });
             console.log(response);
             const access=response?.data.access;
             const refresh =response?.data.refresh;
             console.log(access,'<<><<<<<<<<<<<<<<<<<<<>>>>>>>>>>>.',refresh);
    
    
             console.log(req.headers,'OOOOOOOOOOOOOOO');
             req.headers.Authorization = `Bearer ${access}`;
             console.log(req.headers);
             
             await retryFailedRequests(access);
             
             refreshQueue.forEach((resolve) => resolve(access));
             refreshQueue.length = 0; // Clear the queue
             dispatch(TokenRefreshing({accessToken: access, refreshToken: refresh}));
        }catch (error) {
            console.log(error,'am i printinggg');
        }finally{
            isRefreshing=false
        }
        console.log('lkkkkkkkjhhgtfdhtrtrd');
        return req
    })
    
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