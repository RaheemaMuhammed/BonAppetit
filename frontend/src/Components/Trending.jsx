
import React, { useEffect, useState } from 'react'
import { getTrending } from '../Axios/Services/CommonServices'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {  FaThumbsUp,FaRegBookmark,FaRegThumbsUp,FaBookmark } from 'react-icons/fa';
import { axiosInstance } from '../Axios/Instances/Instance';
import { handleLikeStatus,getLikedRecipes } from '../Axios/Services/UserServices'
import { getSavedRecipes,handleSaveStatus } from '../Axios/Services/UserServices';
 const Trending = () => {
 
    const [recipes,setRecipes] = useState([])
    const token=useSelector(state=>state.UserReducer.accessToken)
    const navigate=useNavigate()
    const premium= useSelector(state=>state.UserReducer.premium)
    const user = useSelector(state=>state.UserReducer.user)
    const [likedRecipes,setLikedRecipes] = useState([])
    const [savedRecipes,setSavedRecipes] = useState([])
    const [ refresh,setRefresh] =useState(false)
    
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
    // for like and unlike
    const handleLike = async (recipe_id)=>{
        try{
            const data= {
                recipe_id:recipe_id
            }
            if(token){
                const response = await handleLikeStatus(token,data)
                setRefresh(!refresh)
                
    
            }else{
                navigate('login/')
            }
            
        }
        catch(error){
            navigate('/expired/')
        }
    }
   
    // for save and unsave
    const handleSave = async(recipe_id)=>{
        try{
            const data= {
                recipe_id:recipe_id
            }
            if(token){
                const response = await handleSaveStatus(token,data)
                setRefresh(!refresh)
                
    
            }else{
                navigate('login/')
                
            }
            
        }
        catch(error){
            navigate('/expired/')
        }

    }




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
        <h1 className='mx-16 md:mx-32 my-5 text-3xl animate-pulse text-btnColor underline'>Trending Recipes</h1>
<div className='mx-16 md:mx-32 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
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
                    <Link to={`singleRecipe/${item.recipe_name}`}><img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/></Link>
                        <div className="m-4">
                            <span className='flex justify-between'> 
                            <Link to={`singleRecipe/${item.recipe_name}`}>    <span className="font-bold">{item.recipe_name}</span></Link>
                                 <span className='flex'>
                                 <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>

                                 <span className='cursor-pointer justify end mt-2' onClick={() => handleLike(item.id)}>{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-2' onClick={()=>handleSave(item.id)}>{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                                 </span>
                                 </span>
                            <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
                        </div>
                       
                    </div>
                    
                    
                    </div>)
            }else if(item?.is_private && item?.author==user?.username){
                return(
                    <div key={item.id} className="container m-auto">
                    <div key={item.id} className="bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg w-full mb-2">
                    <Link to={`singleRecipe/${item.recipe_name}`}>    <img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/></Link>
                        <div className="m-4">
                        <span className='flex justify-between'> 
                        <Link to={`singleRecipe/${item.recipe_name}`}><span className="font-bold">{item.recipe_name}</span></Link>
                                 <span className='flex'>
                                 <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>

                                 <span className='cursor-pointer justify end mt-2' onClick={() => handleLike(item.id)}>{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-2' onClick={()=>handleSave(item.id)}>{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                                 </span>
                                 </span>                          
                                 <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
                        </div>
                       
                    </div>
                    
                    
                    </div>
                )
                
               
            
            }else if( !premium && item.is_private) {
                return(
                   <div key={item.id} className="container m-auto">
                    <div key={item.id} className="bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg w-full mb-2">
                        <Link to={'/offer'}> <img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/>  </Link>
                        <div className="m-4">
                        <span className='flex justify-between'> 
                        <Link to={'/offer'}>  <span className="font-bold">{item.recipe_name}</span>
                                 </Link>
                                 <span className='flex'>
                                 <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>

                                 <span className='cursor-pointer justify end mt-2' onClick={() => handleLike(item.id)}>{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-2' onClick={()=>handleSave(item.id)}>{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                                 </span>
                                 </span>                            
                                 <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
                        </div>
                       
                    </div>
                    
                    
                    </div>
                    )
                
            }else{
                return(
                    <>
                    <div key={item.id} className="container m-auto">
                    <div key={item.id} className="bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg w-full mb-2">
                    <Link to={`singleRecipe/${item.recipe_name}`}>  <img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/></Link>
                        <div className="m-4">
                        <span className='flex justify-between'> 
                        <Link to={`singleRecipe/${item.recipe_name}`}> <span className="font-bold">{item.recipe_name}</span></Link>
                                 <span className='flex '>
                                    <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>
                                 
                                 <span className='cursor-pointer justify end mt-2' onClick={() => handleLike(item.id)}>{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-2' onClick={()=>handleSave(item.id)}>{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                                 </span>
                           
                                 </span>                            
                                 <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
                        </div>
                       
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