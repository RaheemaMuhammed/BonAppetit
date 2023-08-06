import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard' 
import { useSelector } from 'react-redux'
import UserList from '../Pages/Admin/UserList'
import CateoryList from '../Pages/Admin/CateoryList'
import RecipeList from '../Pages/Admin/RecipeList'
import Expired from '../Components/Expired'
import SubscriptionList from '../Pages/Admin/SubscriptionList'
import RecipeReports from '../Pages/Admin/RecipeReports'
const AdminRoute = () => {
        const isAuth = useSelector(state=>state.AdminReducer.accessToken)


  return (
    <>
    <Routes>
        <Route path='/dashboard' element={isAuth ? <Dashboard/> : <Navigate to='/login'/>} />
        <Route path='/expired' element={<Expired/>} />
        <Route path="/users" element={ isAuth ? <UserList/>:  <Navigate to="/login"/>} />
        <Route path="/categories" element={ isAuth ? <CateoryList/>:  <Navigate to="/login"/>} />
        <Route path="/recipes" element={ isAuth ? <RecipeList/>:  <Navigate to="/login"/>} />
        <Route path="/reports" element={ isAuth ? <RecipeReports/>:  <Navigate to="/login"/>} />
        <Route path="/subscription" element={ isAuth ? <SubscriptionList/>:  <Navigate to="/login"/>} />


    </Routes>
    </>
  )
}

export default AdminRoute