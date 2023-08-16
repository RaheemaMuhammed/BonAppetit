import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from "./Routes/UserRoutes";
import AdminRoute from "./Routes/AdminRoute";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
const App = () => {

  

  return (
    <>
   
    <BrowserRouter>
   


        <Header/>
    <ToastContainer />
      <Routes>
        <Route path="/*" Component={UserRoutes}/>
        <Route path="/admin/*" Component={AdminRoute}/>
      </Routes>
   <Footer/>
    </BrowserRouter>
    
    </>
  )
}

export default App