import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserLogout } from '../../../Redux/UserSlice'
import { getProfile} from '../../../Axios/Services/UserServices'
import { axiosInstance } from '../../../Axios/Instances/Instance'
import EditProfileModal from './EditProfileModal'
import useAxios from '../../../Axios/Instances/useAxios'
const UserDetails = () => {

    const user_token =useSelector((state) => state.UserReducer.accessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profile,setProfile] =useState({})
    const [editModal,setEditmodal] = useState(false)
  const [ refresh,setRefresh] =useState(false)

const api=useAxios()
    
    const handleLogout =() => {
            if (user_token){
                
                dispatch(UserLogout())
                
                
            }navigate('/')
        }
    useEffect(()=>{
      const currentProfile = async() =>{
        try{
          const response = await getProfile(api)
          console.log(response);
          setProfile(response?.payload)
        }catch(error){
          // navigate('/expired/')
          console.log(error);
        }
      }
      currentProfile()
    },[refresh])


  return (
    <>
      <div className=' flex flex-col mt-14 md:mx-32 p-5 '>
      {editModal ? <EditProfileModal setEditModal={setEditmodal} Refresh={refresh} setRefresh={setRefresh} username={profile.username} email={profile.email} phone={profile.phone} profile_pic={profile.profile_pic} /> : ''}

<div className='flex justify-center items-center'>
{profile?.profile_pic ?    <img className="mr-4  w-16 h-12 rounded-full" src={`${axiosInstance}${profile.profile_pic}`} alt=""/>
 : 
<div className="relative w-10 h-10 overflow-hidden mr-2 bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
</div>
  }
</div>
      <div className=" overflow-x-auto w-full">
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
<p onClick={()=>{setEditmodal(!editModal)}} className="cursor-pointer  h-10 text-white bg-btnColor hover:bg-newPeach hover:text-black font-medium rounded-lg  my-3 text-sm px-5 py-2.5 text-justify">
Edit
</p> 
<p onClick={handleLogout} className="cursor-pointer  h-10 text-white bg-btnColor hover:bg-newPeach hover:text-black font-medium rounded-lg  my-3 text-sm px-5 py-2.5 text-justify">
Logout
</p> 

</div>

      </div>

    </>
      
  )
}

export default UserDetails