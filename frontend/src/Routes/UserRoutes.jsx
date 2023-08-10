import React from 'react'
import { Routes, Route, Navigate,} from "react-router-dom";
import Home from '../Pages/Home';
import { useSelector } from 'react-redux';
import LogIn from '../Pages/LogIn';
import Signup from '../Pages/SignUp';
import VerifyOTP from '../Pages/VerifyOTP';
import Profile from '../Pages/User/Profile';
import Dashboard from '../Pages/Admin/Dashboard';
import SingleRecipe  from '../Pages/User/SingleRecipe';
import Offer from '../Pages/User/Offer';
import YourPlan from '../Components/User/Profile/YourPlan';
import YourRecipes from '../Components/User/Profile/YourRecipes';
import Wallet from '../Components/User/Profile/Wallet';
import SavedRecipes from '../Components/User/Profile/SavedRecipes';
import UserDetails from '../Components/User/Profile/UserDetails';
import Expired from '../Components/Expired'
const UserRoutes = () => {
    const isAuth = useSelector(state=>state.AdminReducer.accessToken)
    const isUAuth = useSelector(state=>state.UserReducer.accessToken)

  return (
            <>
            <Routes>
            <Route path="/" element={ isAuth ? <Dashboard/> : <Home/>}/>
            <Route path="/offer" element={ isAuth ? <Dashboard/> :( isUAuth ? <Offer/> :<Navigate to="/login"/> )}/>
            <Route path="/singleRecipe/:recipe_name" element={  <SingleRecipe/>}/>
            <Route path='/login' element={ isAuth ? <Dashboard/> : <LogIn/> } />
            <Route path='/register' element={ isUAuth ? <Home/> : ( isAuth ? <Dashboard/> :<Signup/>  )  } />
            <Route path='/verify' element={ isUAuth ? <Home/>:<VerifyOTP/> } />
            <Route path='/expired' element={<Expired/>} />
            <Route path="/profile" element={isUAuth ? <Profile/> :   <Navigate to="/login"/>} >
          <Route path='' element={isUAuth ? <UserDetails/> :   <Navigate to="/login"/>}/>
              <Route path='your_plan' element={isUAuth ? <YourPlan/> :   <Navigate to="/login"/>}/>
              <Route path='your_recipes' element={isUAuth ? <YourRecipes/> :   <Navigate to="/login"/>}/>
              <Route path='wallet' element={isUAuth ? <Wallet/> :   <Navigate to="/login"/>}/>
              <Route path='saved_recipes' element={isUAuth ? <SavedRecipes/> :   <Navigate to="/login"/>}/>
            </Route>
            </Routes>

            </> 
 )
}

export default UserRoutes