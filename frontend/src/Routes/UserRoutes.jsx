import React from 'react'
import { Routes, Route, Navigate,} from "react-router-dom";
import Home from '../Pages/Home';
const UserRoutes = () => {
  return (
            <>
            <Routes>
            <Route path="/" element={ <Home/>}/>

            </Routes>

            </> 
 )
}

export default UserRoutes