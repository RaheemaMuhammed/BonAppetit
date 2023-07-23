import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { Link, Outlet } from 'react-router-dom'
import UserDetails from '../../Components/User/Profile/UserDetails'
import LinkDetail from '../../Components/User/Profile/LinkDetail'
import YourPlan from '../../Components/User/Profile/YourPlan'
import YourRecipes from '../../Components/User/Profile/YourRecipes'
import { useNavigate } from 'react-router';

const Profile = () => {
  return (
    <>
    <Header/>
    <LinkDetail/>

<Outlet/>

    <Footer/>
    </>
  )
}


export const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    } 
    return Wrapper;
}
export default Profile