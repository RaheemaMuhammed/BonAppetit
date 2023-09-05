import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard' 
import { useSelector } from 'react-redux'
import UserList from '../Pages/Admin/UserList'
import CateoryList from '../Pages/Admin/CateoryList'
import RecipeList from '../Pages/Admin/RecipeList'
import Expired from '../Components/Expired'
import SubscriptionList from '../Pages/Admin/SubscriptionList'
import PageNotFound from '../Pages/PageNotFound'
const AdminRoute = () => {
        const isAuth = useSelector(state=>state.AdminReducer.accessToken)
        const isUAuth = useSelector(state=>state.UserReducer.accessToken)


  return (
    <>
    <Routes>
        <Route path='/dashboard' element={isAuth ? <Dashboard/> : (isUAuth ? <Navigate to='/'/>:<Navigate to='/login'/> )}/>
        <Route path='/expired' element={<Expired/>} />
        <Route path="/users" element={ isAuth ? <UserList/>:  (isUAuth ? <Navigate to='/'/>:<Navigate to='/login'/> )} />
        <Route path="/categories" element={ isAuth ? <CateoryList/>:  (isUAuth ? <Navigate to='/'/>:<Navigate to='/login'/> )} />
        <Route path="/recipes" element={ isAuth ? <RecipeList/>:  (isUAuth ? <Navigate to='/'/>:<Navigate to='/login'/> )} />
        <Route path="/subscription" element={ isAuth ? <SubscriptionList/>:  (isUAuth ? <Navigate to='/'/>:<Navigate to='/login'/> )} />
        <Route path="*" element={<PageNotFound />} />

    </Routes>
    </>
  )
}

export default AdminRoute