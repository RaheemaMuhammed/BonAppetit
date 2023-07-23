import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard' 
import { useSelector } from 'react-redux'
import UserList from '../Pages/Admin/UserList'
import CateoryList from '../Pages/Admin/CateoryList'
import RecipeList from '../Pages/Admin/RecipeList'
const AdminRoute = () => {
        const isAuth = useSelector(state=>state.AdminReducer.accessToken)


  return (
    <>
    <Routes>
        <Route path='/dashboard' element={isAuth ? <Dashboard/> : <Navigate to='/login'/>} />
        <Route path="/users" element={ isAuth ? <UserList/>:  <Navigate to="/login"/>} />
        <Route path="/categories" element={ isAuth ? <CateoryList/>:  <Navigate to="/login"/>} />
        <Route path="/recipes" element={ isAuth ? <RecipeList/>:  <Navigate to="/login"/>} />


    </Routes>
    </>
  )
}

export default AdminRoute