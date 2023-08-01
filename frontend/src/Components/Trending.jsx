
import React, { useEffect, useState } from 'react'
import { getTrending } from '../Axios/Services/CommonServices'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {  FaThumbsUp,FaRegBookmark,FaRegThumbsUp,FaBookmark } from 'react-icons/fa';
import {BsStars} from 'react-icons/bs'
import { axiosInstance } from '../Axios/Instances/Instance';
import { getLikedRecipes } from '../Axios/Services/UserServices'
import { getSavedRecipes } from '../Axios/Services/UserServices';
 const Trending = ({filter,setFilter}) => {
 
    const [recipes,setRecipes] = useState([])
    const token=useSelector(state=>state.UserReducer.accessToken)
 
    const premium= useSelector(state=>state.UserReducer.premium)
    const user = useSelector(state=>state.UserReducer.user)
   
    const [ refresh,setRefresh] =useState(false)
    const navigate=useNavigate()
    const [likedRecipes,setLikedRecipes] = useState([])
    const [savedRecipes,setSavedRecipes] = useState([])

    // to show saved recipes
    useEffect(()=>{
        try{
            const userSavedRecipes= async()=>{
                const response = await getSavedRecipes(token)
                setSavedRecipes(response?.payload)

            }
            userSavedRecipes()
        }catch(error){
            navigate('/expired/')
        }
    },[refresh])
    // to show liked recipes
    useEffect(()=>{
        try{
            const userLikedRecipes= async()=>{
                const response = await getLikedRecipes(token)
                setLikedRecipes(response?.payload)

            }
            userLikedRecipes()
        }catch(error){
            navigate('/expired/')
        }
    },[refresh])

    // for fetching recipes
    useEffect(()=>{
        try{
            const fetchRecipes= async()=>{
                const response = await getTrending()
                if(response){
                    setRecipes(response?.payload)
                }
            }
            fetchRecipes()
            
            
        }catch(error){
            console.log(error);
        }
    },[refresh])
 
  return (
    <div>
        <div className='flex justify-between'>
        <h1 className='mx-16 md:mx-32 my-5 text-xl md:text-3xl  text-btnColor underline'>Trending Recipes</h1>
        
        {user && <h1 className='mr-14  mb-3 md:mr-32 mt-8 cursor-pointer text-xs md:text-2xl text-amber-900 font-semibold underline animate-pulse bg-primary pt-2 md:pt-0  rounded-full lg:px-2 ' onClick={()=>setFilter(!filter)}>Explore More</h1>}
        </div>
        
<div className='mx-16 md:mx-32 my-1 md:my-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
    <>
    

        {recipes?.length === 0 ? '' : 
        <>

        {recipes.map(item=>{
             // Check if the recipe is liked by the logged-in user
          const isLiked = likedRecipes?.some((likedRecipe) => likedRecipe.id === item.id);
          const isSaved= savedRecipes?.some((savedRecipe) => savedRecipe.id === item.id)
            if(premium){
                return(

                    <div key={item.id} className="container m-auto">
                    <div key={item.id} className="bg-white rounded overflow-hidden shadow-lg relative hover:shadow-xl w-full mb-2">
                    <Link to={`singleRecipe/${item.recipe_name}`}><img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/>
                        <div className="m-4">
                            <span className='flex justify-between'>
            
                            
                               <span className="font-bold">{item.recipe_name}</span>
                                 <span className='flex'>
                                 <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>

                                 <span className='cursor-pointer justify end mt-2' >{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-2' >{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                                 </span>
                                 </span>
                            <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
                        </div>
                        </Link>
                    </div>
                    
                    
                    </div>)
            }else if(item?.is_private && item?.author==user?.username){
                return(
                    <div key={item.id} className="container m-auto">
                    <div key={item.id} className="bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg w-full mb-2">
                    <Link to={`singleRecipe/${item.recipe_name}`}>    <img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/>
                        <div className="m-4">
                        <span className='flex justify-between'> 

                        <span className="font-bold">{item.recipe_name}</span>
                                 <span className='flex'>
                                 <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>

                                 <span className='cursor-pointer justify end mt-2' >{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-2' >{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                                 </span>
                                 </span>                          
                                 <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
                        </div>
                        </Link>
                    </div>
                    
                    
                    </div>
                )
                
               
            
            }else if( !premium && item.is_private) {
                return(
                   <div key={item.id} className="container m-auto">
                    <div key={item.id} className="bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg w-full mb-2">


                        <div className='absolute z-[1] flex bg-white mt-1 rounded-full px-1'>
                        <p className='font-poppins text-xs font-bold text-btnColor m-1'>Premium</p>
                        <BsStars size={22} style={{fill:'gold',marginTop:'2px'}} className=' ' />

                        </div>
                        <Link to={'/offer'}> <img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover relative "/>  
                        <div className="m-4">
                        <span className='flex justify-between'>
                       
                         <span className="font-bold">{item.recipe_name} 
</span>
                                
                                 <span className='flex'>
                                 <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>

                                 <span className='cursor-pointer justify end mt-2' >{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-2' >{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                                 </span>
                                 </span>                            
                                 <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
                        </div>
                        </Link>
                    </div>
                    
                    
                    </div>
                    )
                
            }else{
                return(
                    <>
                    <div key={item.id} className="container m-auto">
                    <div key={item.id} className="bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg w-full mb-2">
                    <Link to={`singleRecipe/${item.recipe_name}`}>  <img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/>
                        <div className="m-4">
                        <span className='flex justify-between'> 

                        <span className="font-bold">{item.recipe_name}</span>
                                 <span className='flex '>
                                    <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>
                                 
                                 <span className='cursor-pointer justify end mt-2' >{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-2' >{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                                 </span>
                           
                                 </span>                            
                                 <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
                        </div>
                        </Link>
                    </div>
                    
                    
                    </div>
                    </>
                )
            }
            

        }
            )
 }
        
    
    </>
    
    }
</>
    </div>
    </div>
    
  )
}

export default Trending