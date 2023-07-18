import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import UserDetails from '../../Components/User/UserDetails'
const Profile = () => {
  return (
    <>
    <Header/>
    <UserDetails/>


    <Footer/>
    </>
  )
}

export default Profile