
import React, { useEffect, useState } from 'react'
import { getTrending } from '../Axios/Services/CommonServices'
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { useRecipeAPI } from '../CustomHooks/Recipe/useRecipeAPI';

import RecipeCard from './RecipeCard';
import useAxios from '../Axios/Instances/useAxios';
 const Trending = ({filter,setFilter}) => {
 
    const [recipes,setRecipes] = useState([])
    const token=useSelector(state=>state.UserReducer.accessToken)
    const premium= useSelector(state=>state.UserReducer.premium)
    const user = useSelector(state=>state.UserReducer.user)
    const [ refresh,setRefresh] =useState(false)
    const navigate=useNavigate()
    const api =useAxios()
   
   
   
    // to show liked and saved recipes
     const { likedRecipes,savedRecipes }= user ?useRecipeAPI(api) : []
    
    

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

        {recipes?.map(item=>{
             // Check if the recipe is liked by the logged-in user
             
          const isLiked = likedRecipes?.some((likedRecipe) => likedRecipe.id === item.id);
          const isSaved= savedRecipes?.some((savedRecipe) => savedRecipe.id === item.id)
        return ( <RecipeCard
      key={item.id}
      item={item}
      premium={premium}
      isLiked={isLiked}
      isSaved={isSaved}
      user={user} 
    />)

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