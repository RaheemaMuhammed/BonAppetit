import React from 'react'

import { Link, Outlet } from 'react-router-dom'
import LinkDetail from '../../Components/User/Profile/LinkDetail'
import { useNavigate } from 'react-router';

const Profile = () => {
  return (
    <>
    <LinkDetail/>

<Outlet/>

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