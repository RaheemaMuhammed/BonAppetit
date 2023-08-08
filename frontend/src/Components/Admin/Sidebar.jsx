import React from 'react'
import { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { AdminLogout } from '../../Redux/AdminSlice';
const Sidebar = () => {

    const dispatch =useDispatch()
    const navigate = useNavigate()
    const [isToggled, setIsToggled] = useState(false);
    const admin_token=useSelector(state=>state.AdminReducer.accessToken)
    const handleAdminLogout =() => {
        if (admin_token){
            
            dispatch(AdminLogout())
            localStorage.setItem('Component','dashboard')
            
        }navigate('/')
    }


  const handleToggle = () => {
    
    setIsToggled(!isToggled);
  };
  return (

    <aside className='left-0  md:w-64 h-fit md:h-screen sm:w-full  bg-newPeach'>

<div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border mb-0 mr-0"
                                onClick={handleToggle}
                            >
                                {isToggled ? (
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
                        <div className={`flex-1 justify-self-center pb-3  md:block md:pb-0 md:mt-0 ${isToggled ? 'block' : 'hidden'}`}>

    <div className='h-full px-3 py-4 overflow-y-auto '>
<ul className='space-y-10 font-medium mx-3'>
    <li className='cursor-pointer mx-3 flex'>
    <svg className="w-5 h-4 mr-1 mt-1 text-btnColor transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <NavLink to={'/admin/dashboard'} className={({ isActive, isPending }) =>
    isPending ? 'bg-newCoral' : isActive ? 'bg-btnColor rounded p-1 ' : ''}>Dashboard</NavLink>
        
    </li>
    <li className='flex cursor-pointer mx-3 my-3'>
    <svg className="flex-shrink-0 w-5 h-4 mr-1 mt-1 text-btnColor transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <NavLink to={'/admin/users'}className={({ isActive, isPending }) =>
    isPending ? ' bg-newCoral ' : isActive ? 'bg-btnColor rounded p-1 ' : ''}>Users</NavLink>
        
    </li>
    <li className='flex cursor-pointer mx-3 my-3'>
    <svg className="flex-shrink-0 w-5 h-4 mr-1 mt-1 text-btnColor transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <NavLink to={'/admin/recipes'}className={({ isActive, isPending }) =>
    isPending ? ' bg-newCoral ' : isActive ? 'bg-btnColor rounded p-1 ' : ''}>Recipes</NavLink>
        
    </li>
   
    <li className='flex cursor-pointer mx-3 my-3'>
    <svg className="flex-shrink-0 w-5 h-4 mr-1 mt-1 text-btnColor transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <NavLink to={'/admin/categories'}className={({ isActive, isPending }) =>
    isPending ? ' bg-newCoral ' : isActive ? 'bg-btnColor rounded p-1 ' : ''}>Categories</NavLink>
        
    </li>
    <li className='flex cursor-pointer mx-3 my-3'>
    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-5 h-4 mr-1 mt-1 text-btnColor transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xml:space="preserve"  version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd"
viewBox="0 0 504 512.08"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <path fill="brown" fillRule="nonzero" d="M13.49 173.45l23.38 3.7c12.51,-47.72 39.53,-89.78 76.2,-120.9 39.02,-33.1 89.03,-53.9 144.18,-56.06 65.47,-2.58 125.83,21.67 170.47,62.93 44.62,41.26 73.52,99.53 76.09,164.99 0.96,24.59 -1.81,48.38 -7.8,70.78 -4.51,16.87 -10.87,33.05 -18.85,48.3l-0.58 -0.94c-5.71,-9.04 -13.82,-16.56 -23.62,-21.56 -4.27,-2.18 -8.86,-3.9 -13.7,-5.07 4.95,-10.41 9,-21.33 12.03,-32.68 4.87,-18.21 7.13,-37.38 6.36,-57.02 -2.07,-52.79 -25.33,-99.74 -61.25,-132.95 -35.92,-33.2 -84.54,-52.7 -137.34,-50.62 -44.38,1.74 -84.66,18.51 -116.12,45.2 -28.42,24.11 -49.63,56.31 -60.17,92.84l18.78 2.96c6.38,0.99 10.76,6.97 9.77,13.35 -0.43,2.79 -1.82,5.21 -3.78,6.95l-52.48 46.73c-4.83,4.3 -12.25,3.87 -16.56,-0.97 -0.73,-0.81 -1.32,-1.71 -1.78,-2.64l-35.11 -59.84c-3.27,-5.57 -1.4,-12.74 4.17,-16.01 2.42,-1.42 5.14,-1.86 7.71,-1.47zm97.1 291.02l0 -137.14c67.65,0 79.15,-3.05 140.13,35.33l47.92 0c21.69,1.29 33.05,23.29 11.96,37.73 -16.79,12.33 -38.96,11.63 -61.69,9.59 -15.68,-0.78 -16.35,20.28 0,20.35 5.68,0.45 11.84,-0.89 17.22,-0.89 28.35,-0.04 51.71,-5.46 66.01,-27.86l7.17 -16.75 71.28 -35.32c35.66,-11.74 61.03,25.56 34.73,51.52 -51.63,37.55 -104.56,68.45 -158.71,93.41 -39.34,23.93 -78.67,23.1 -117.97,0l-58.05 -29.97zm-105.64 -150.32l87.06 0 0 164.1 -87.06 0 0 -164.1zm189.14 -116.41l12.66 -28.51 47.73 0c-0.6,-2.03 -1.64,-4.02 -3.15,-5.96 -1.51,-1.95 -3.37,-3.63 -5.57,-5.06 -2.2,-1.42 -4.67,-2.59 -7.39,-3.45 -2.72,-0.91 -5.61,-1.34 -8.64,-1.34l-35.64 0 12.66 -28.51 136.64 0 -12.66 28.51 -33 0c1.29,0.99 2.5,2.16 3.63,3.5 1.12,1.29 2.11,2.63 2.98,4.1 0.82,1.43 1.55,2.85 2.16,4.28 0.56,1.42 0.95,2.76 1.12,3.93l35.77 0 -12.66 28.51 -25.88 0c-1.9,4.84 -4.7,9.42 -8.46,13.74 -3.76,4.36 -8.12,8.2 -13.09,11.66 -5.01,3.46 -10.41,6.31 -16.25,8.68 -5.83,2.33 -11.74,3.89 -17.75,4.75l71.8 73.92 -56.77 0 -64.02 -70.25 0 -26.17 28.34 0c2.72,0 5.4,-0.43 8.04,-1.34 2.68,-0.91 5.14,-2.12 7.34,-3.63 2.25,-1.47 4.19,-3.24 5.83,-5.18 1.64,-1.99 2.81,-4.02 3.5,-6.18l-59.27 0z"/>
 </g>
</svg>
               <NavLink to={'/admin/subscription'}className={({ isActive, isPending }) =>
    isPending ? ' bg-newCoral ' : isActive ? 'bg-btnColor rounded p-1 ' : ''}>Payments</NavLink>
        
    </li>

    <li className='flex cursor-pointer mx-3 my-3'>
    <svg className="flex-shrink-0 w-5 h-4 mr-1 mt-1 text-btnColor transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <p onClick={handleAdminLogout}>Logout</p>
              
        
    </li>
</ul>

    </div>
                        </div>
  

    </aside>
 
  )
}

export default Sidebar