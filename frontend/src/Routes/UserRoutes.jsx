import React from 'react'
import { Routes, Route, Navigate,} from "react-router-dom";
import Home from '../Pages/Home';
import { useSelector } from 'react-redux';
import LogIn from '../Pages/LogIn';
import Signup from '../Pages/SignUp';
import VerifyOTP from '../Pages/VerifyOTP';
import Profile from '../Pages/User/Profile';
import Dashboard from '../Pages/Admin/Dashboard';




const UserRoutes = () => {
    const isAuth = useSelector(state=>state.AdminReducer.accessToken)
    const isUAuth = useSelector(state=>state.UserReducer.accessToken)

  return (
            <>
            <Routes>
            <Route path="/" element={ isAuth ? <Dashboard/> : <Home/>}/>
            <Route path='/login' element={ isAuth ? <Dashboard/> : <LogIn/> } />
            <Route path='/register' element={ isUAuth ? <Home/> : ( isAuth ? <Dashboard/> :<Signup/>  )  } />
            <Route path='/verify' element={ isUAuth ? <Home/>:<VerifyOTP/> } />
            <Route path="/profile" element={isUAuth ? <Profile/> :   <Navigate to="/login"/>} />
            </Routes>

            </> 
 )
}

export default UserRoutes