import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserLogout } from '../../Redux/UserSlice'
const UserDetails = () => {

    const user_token =useSelector((state) => state.UserReducer.accessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout =() => {
            if (user_token){
                
                dispatch(UserLogout())
                localStorage.setItem('Component','dashboard')
                
            }navigate('/')
        }
    


  return (
    <div className='flex justify-end'>
<p onClick={handleLogout} className="cursor-pointer  h-10 text-white bg-btnColor hover:bg-newPeach hover:text-black font-medium rounded-lg mx-3 my-3 text-sm px-5 py-2.5 text-justify">
Logout
</p> 

</div>
  )
}

export default UserDetails