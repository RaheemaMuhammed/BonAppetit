import React, { useState,useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import { Link,NavLink, useNavigate } from 'react-router-dom';
import { BsBell } from 'react-icons/bs'
import './tailwind.css'
import { getNotificactions,handleNotiStatus } from '../Axios/Services/UserServices'
import AddRecipeModal from './User/Recipe/AddRecipeModal';
import { toast } from 'react-toastify';
import useAxios from '../Axios/Instances/useAxios';
import useAdminAxios from '../Axios/Instances/useAdminAxios';
const Header = () => {
   const [notificationList,setNotificationList]= useState(false)
    const [navbar, setNavbar] = useState(false);
    const user = useSelector(state => state.UserReducer.user)
    const admin = useSelector(state => state.AdminReducer.admin)
    const token = useSelector(state=>state.UserReducer.accessToken)
    const tokenA=useSelector(state=>state.AdminReducer.accessToken)
    const [addModal,setAddmodal] = useState(false)
    const [Refresh, setRefresh] = useState(false)
    const [recipe,setRecipe] =  useState('')
  const [flyNoti,setFlyNoti] =useState('')

const navigate = useNavigate()
    const [notiCount,setNotiCount] = useState(0)
    const [notifications,setNotifications] = useState([])
    const tokens = {
        userT: token,
        adminT: tokenA,
      };
      const userApi = useAxios()
      const adminApi = useAdminAxios()
      const apis = {
        userApi: userApi,
        adminApi: adminApi,
      };
    useEffect(() => {
        if(user || admin){
                try {
                //   open a new ws connection
                const socket = new WebSocket(`ws://localhost:8000/ws/notifications/?token=${tokens[user ? 'userT' : 'adminT']}`);
                
                
                socket.onopen=()=>{
                    console.log('WebSocket connection opened.');
                    
                }
                // on  notification recieving
                socket.onmessage = (event) => {
                
                    const data = JSON.parse(event.data);
                    
                    console.log('Received notification:', data);
                    //  to add new notifications to the list
                    setNotifications((prevNotifications) => [ data,...(prevNotifications || [])]);
                    //  to show flying noti
                    showNotification(data?.message)
                
                };
                socket.onerror=(error)=>{
                    
                    console.log(error,'iam the error');
                }

                socket.onclose = () => {
                
                    console.log('WebSocket connection closed.');
                    
                };
                
                return () => {
                    socket.close();
                };
                } catch (error) {
                console.log(error);
                }
        }
        
     }, [token,tokenA])
    
// to show all notiiffcations of the user,taken from backend
    useEffect(() => {
       
        if(user || admin){

            try{
                const userNotifications= async()=>{
                    const response = await getNotificactions(apis[user ? 'userApi' : 'adminApi'])
                    console.log(response);
                    setNotifications(response?.payload)
                }
                userNotifications()
            }catch(error){
                navigate('/expired/')
            }
        }
        
        
    }, [Refresh,token,tokenA])

    useEffect(() => {
        console.log('called');
        const unreadNotifications = notifications?.filter(noti => !noti.is_read);
      
        setNotiCount(unreadNotifications?.length || 0);
      }, [notifications]);




// to mark notis as read
async function handleRead() {
  
        try {
            const response =await handleNotiStatus(apis[user ? 'userApi' : 'adminApi'])
            
            if(response?.status===200){

                setRefresh(!Refresh)
              
                setNotiCount(0)
            }else{
                toast.error('Connection failed!!')
            }
        } catch (error) {
            navigate('/expired/')
        }
   
   
}
// to show flying notification
const showNotification = (message) => {
    setFlyNoti(message);
    setTimeout(() => {
      setFlyNoti('');
    }, 3000); 
  };
  
    return (
        <>
       {
            flyNoti !== '' && <p className={`notification`}>{flyNoti}</p>
        }
        
        <nav className="w-full bg-primary shadow">
                        {addModal ? <AddRecipeModal setAddModal={setAddmodal} Refresh={Refresh} setRefresh={setRefresh} /> : ''}

            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className='flex'>
                       
                           <Link to={'/'}>  <h2 className="text-3xl font-bold text-btnColor cursor-pointer ">
                                
                                Bon Appetite</h2></Link>
                          
                        
                        </div>
                   
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">


                            { user || admin ? <>
                              {
                                user ? <>
                                
                                 <li className="text-gray-800  hover:underline hover:decoration-btnColor p-1 ">
                                 <NavLink to={'/aboutUs'}className={({ isActive, isPending }) =>
    isPending ? ' bg-newCoral ' : isActive ? 'decoration-btnColor ' : ''}>About Us</NavLink>
                            </li>
                            <li className="text-gray-800 hover:underline hover:decoration-btnColor p-1 cursor-pointer" onClick={()=>setAddmodal(!addModal)}>
                               Add Recipe
                            </li>
                            <li className="text-gray-800 hover:underline hover:decoration-btnColor p-1 ">
                            <NavLink to={'/profile'}className={({ isActive, isPending }) =>
    isPending ? ' bg-newCoral ' : isActive ? 'underline decoration-btnColor ' : ''}>Account</NavLink>
                            </li>
                            <li className="flex p-1 cursor-pointer" onClick={()=>{setNotificationList(!notificationList);}}>

                                <span className='relative'><BsBell size={27} style={{fill:'brown'}}/></span>
                               {notiCount >0 &&    <span className='absolute mt-0 bg-orange-900 text-white rounded-3xl h-fit w-4 text-center text-xs font-bold' >{notiCount}</span>
 }
                               
                            </li>
                           
                            {notificationList && <> 
<div  className="fixed top-0 right-[-500px] z-50 w-[500px] h-fit rounded-xl p-4 overflow-y-auto transition-transform ease-linear -translate-x-full bg-newPeach " >
    <p className="text-center font-base text-gray-500 uppercase text-xl">Your Notifications</p>
    <button type="button" onClick={()=>setNotificationList(!notificationList)} className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        <span className="sr-only" >Close menu</span>
    </button>
  <div className="py-4 overflow-y-auto text-white">
    {notifications?.length ===0 ? <h1 className='text-center'>No Notifications</h1> :
    <ul className="space-y-2 font-medium" >
        {notifications?.map((noti)=> (
            <Link to={`/singleRecipe/${noti.recipe_name}`}>
            
            <li className={`font-${noti.is_read ? 'light' : 'semibold'} text-btnColor my-1 hover:font-bold`} onClick={handleRead}>{noti.message} </li>
            </Link>
              
               
              )
            
          )}
    
    
    
 </ul>
    }
      
   </div>
</div></> }
 </> : <>
 
                            <li className="text-gray-800 hover:underline hover:decoration-btnColor p-1">Welcome {admin.username}!!</li>
                            <li className="flex p-1 cursor-pointer" onClick={()=>{setNotificationList(!notificationList);}}>

<span className='relative'><BsBell size={27} style={{fill:'brown'}}/></span>
{notiCount >0 &&    <span className='absolute mt-0 bg-orange-900 text-white rounded-3xl h-fit w-4 text-center text-xs font-bold' >{notiCount}</span>}
</li>
{notificationList && <> 
<div  className="fixed top-0 right-[-500px] z-50 w-[500px] h-fit rounded-xl p-4 overflow-y-auto transition-transform ease-linear -translate-x-full bg-newPeach " >
    <p className="text-center font-base text-gray-500 uppercase text-xl">Your Notifications</p>
    <button type="button" onClick={()=>{setNotificationList(!notificationList);}} className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        <span className="sr-only" >Close menu</span>
    </button>
  <div className="py-4 overflow-y-auto text-white">
    {notifications?.length ===0 ? <h1 className='text-center'>No Notifications</h1> :
    <ul className="space-y-2 font-medium" onClick={handleRead}>
        {notifications?.map((noti)=> (
            <Link to='/admin/subscription'>
            
            <li key={noti.id} className={`font-${noti.is_read ? 'light' : 'semibold'} text-btnColor`}>{noti.message} </li> 
            </Link>
            )
             )}
    
    
    
 </ul>
    }
      
   </div>
</div></> }
                            </>
                              
                              
                              
                         }
                         </>
                         : <>
                            <li className="text-gray-800 hover:underline hover:decoration-btnColor  p-1 ">
                                    <Link to={'/register'}>SignUp</Link>
                            </li>
                            <li className="text-gray-800 hover:underline hover:decoration-btnColor  p-1 ">
                                <Link to={'/login'}>LogIn</Link>
                            </li>
                            </>}
                           
                            
                        </ul>
                    </div>
                </div>
            </div>
            
        </nav>
       
        </>
    );
  
}

export default Header