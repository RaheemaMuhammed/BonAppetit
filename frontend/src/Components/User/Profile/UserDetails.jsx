import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserLogout } from '../../../Redux/UserSlice'
import { getProfile} from '../../../Axios/Services/UserServices'
import { axiosInstance } from '../../../Axios/Instances/Instance'
const UserDetails = () => {

    const user_token =useSelector((state) => state.UserReducer.accessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profile,setProfile] =useState({})
    const handleLogout =() => {
            if (user_token){
                
                dispatch(UserLogout())
                localStorage.setItem('Component','dashboard')
                
            }navigate('/')
        }
    useEffect(()=>{
      const currentProfile = async() =>{
        try{
          const response = await getProfile(user_token)
          console.log(response);
          setProfile(response?.payload)
        }catch(error){
          navigate('/expired/')
        }
      }
      currentProfile()
    },[])


  return (
    <>
      <div className=' flex flex-col mt-14 mx-32 p-5 '>

<div className='flex justify-center items-center'>
{profile?.profile_pic ?    <img className="mr-4  w-16 h-12 rounded-full" src={`${axiosInstance}${profile.profile_pic}`} alt=""/>
 : 
<div className="relative w-10 h-10 overflow-hidden mr-2 bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
</div>
  }
</div>
      <div className=" overflow-x-auto">
    <table className="w-full text-lg text-left border mt-4 text-gray-500 dark:text-gray-400">
       
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
               
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Name:
                </th>
                <td className="px-6 py-4">
                   {profile.username}
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
               
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Email:
                </th>
                <td className="px-6 py-4">
                    {profile.email}
                </td>
               
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   Phone:
                </th>
                <td className="px-6 py-4">
                    {profile.phone}
                </td>
               
            </tr>
        </tbody>
    </table>
</div>
<div className='flex justify-between'>
<p onClick={handleLogout} className="cursor-pointer  h-10 text-white bg-btnColor hover:bg-newPeach hover:text-black font-medium rounded-lg  my-3 text-sm px-5 py-2.5 text-justify">
Edit
</p> 
<p onClick={handleLogout} className="cursor-pointer  h-10 text-white bg-btnColor hover:bg-newPeach hover:text-black font-medium rounded-lg  my-3 text-sm px-5 py-2.5 text-justify">
Logout
</p> 

</div>

      </div>

    </>
      // <>
      // <div className="mt-1 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      //       <div className="w-full flex flex-col">
      //         <div className="flex-1 bg-black  shadow-xl p-8">
      //           <h4 className="text-xl text-white font-bold">Personal Info</h4>
      //           <ul className="mt-2 text-gray-700">
  
                  
                 
      //               <li className="flex border-b py-2 border-gray-600">
      //                 <><span className="font-bold w-24 text-white">Username:</span>
      //                   <span className="text-white">{profile?.username}</span></>
                      
      //               </li>
                 
  
                  
      //               <li className="flex border-b py-2 border-gray-600">
      //               <span className="font-bold w-24 text-white ">Email:</span>
      //                   <span className=" text-white">{profile?.email}</span>
                      
      //               </li>
                  
  
                 
                 
      //               <li className="flex border-b py-2 border-gray-600">
      //                 <span className="font-bold w-24 text-white">Mobile:</span>
      //                   <span className=" text-white">{profile?.phone}</span>
                    
      //               </li>
                  
  
                  
  
                
                
      //           </ul>
      //         </div>
      //       </div>
      //     </div>
  
      // </>
  )
}

export default UserDetails