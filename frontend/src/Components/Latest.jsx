
import React, { useEffect, useState } from 'react'
import { getLatest } from '../Axios/Services/CommonServices'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRecipeAPI } from '../CustomHooks/Recipe/useRecipeAPI';
import RecipeCard from './RecipeCard';
 const Latest = () => {
    const [recipes,setRecipes] = useState([])
    const token=useSelector(state=>state.UserReducer.accessToken)
    const navigate=useNavigate()
    const premium= useSelector(state=>state.UserReducer.premium)
    const user = useSelector(state=>state.UserReducer.user)
   
    const [ refresh,setRefresh] =useState(false)
   const {likedRecipes,savedRecipes} =user? useRecipeAPI(token):[]
   
   

    // for fetching recipes
    useEffect(()=>{
        try{
            const fetchRecipes= async()=>{
                const response = await getLatest()
                if(response){
                    setRecipes(response?.payload)
                }
            }
            fetchRecipes()
            
            
        }catch(error){
            console.log(error);
        }
    },[token])
 
  return (
    <div>
        <h1 className='mx-16 md:mx-32 my-5 text-3xl text-btnColor underline'>Fresh from the Kitchen</h1>
<div className='mx-16 md:mx-32 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
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

export default Latest