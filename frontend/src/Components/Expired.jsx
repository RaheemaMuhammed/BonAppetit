import React, { useEffect } from 'react'
import Header from './Header'
import { useSelector,useDispatch } from 'react-redux'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { UserLogout } from '../Redux/UserSlice'
import { AdminLogout } from '../Redux/AdminSlice'

const Expired = () => {
    const dispatch=useDispatch()
    const user_token =useSelector((state) => state.UserReducer.accessToken)
    const admin_token = useSelector((state) => state.AdminReducer.accessToken)
    useEffect(()=>{
        if (user_token){
                    
            dispatch(UserLogout())
            localStorage.setItem('Component','dashboard')
            
        }else if(admin_token){
            dispatch(AdminLogout())
        }
    })
    

  return (
    <>
        <div className='flex flex-col items-center justify-center h-screen'>
            <p className='text-center text-3xl font-semibold'>
                Your Session has been Expired<br /> Please Login again
            </p>
            <Link to='/login'>
            <button  className='bg-btnColor p-2 my-3 text-primary hover:text-black rounded hover:bg-primary'>
                Login
            </button>
            </Link>
            
        </div>
    
    </>

  )
}

export default Expired