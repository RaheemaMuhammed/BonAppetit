import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from "./Routes/UserRoutes";
import AdminRoute from "./Routes/AdminRoute";

const App = () => {
  return (
    <>
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