import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from "./Routes/UserRoutes";
import AdminRoute from "./Routes/AdminRoute";
import { setNotifs,clearNotifs } from "./Redux/WebSocketSlice";
const App = () => {
  const user = useSelector(state => state.UserReducer.user)
  const admin = useSelector(state => state.AdminReducer.admin)
  const token = useSelector(state=>state.UserReducer.accessToken)
  const tokenA=useSelector(state=>state.AdminReducer.accessToken)
  const [flyNoti,setFlyNoti] =useState('')
  const tokens = {
    userT: token,
    adminT: tokenA,
  };
const dispatch=useDispatch()
  useEffect(() => {
    if(user || admin){

        const socket = new WebSocket(`ws://localhost:8000/ws/notifications/?token=${tokens[user ? 'userT' : 'adminT']}`);
        socket.onopen=()=>{
           console.log('WebSocket connection opened.');
           
        }
        socket.onmessage = (event) => {
        
           const data = JSON.parse(event.data);
           
           console.log('Received notification:', data);
           dispatch(setNotifs(data))
          showNotification(data?.message)

         };
         socket.onclose = () => {

           console.log('WebSocket connection closed.');
           dispatch(clearNotifs())
         };
       
         return () => {
           socket.close();
         };
    }
    
 }, [user,admin])

 const showNotification = (message) => {
  setFlyNoti(message);
  setTimeout(() => {
    setFlyNoti('');
  }, 3000); 
};

  return (
    <>
    {
            flyNoti !== '' && <p className={`notification`}>{flyNoti}</p>
        }
    <BrowserRouter>
   


    <ToastContainer />
      <Routes>
        <Route path="/*" Component={UserRoutes}/>
        <Route path="/admin/*" Component={AdminRoute}/>
      </Routes>
   
    </BrowserRouter>
    
    </>
  )
}

export default App