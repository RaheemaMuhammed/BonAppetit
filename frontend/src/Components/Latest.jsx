
import React, { useEffect, useState } from 'react'
import { getLatest } from '../Axios/Services/CommonServices'
import { useSelector } from "react-redux";
import { useRecipeAPI } from '../CustomHooks/Recipe/useRecipeAPI';
import RecipeCard from './RecipeCard';
import useAxios from '../Axios/Instances/useAxios';
import LoadingCard from './LoadingCard';

 const Latest = () => {
    const [recipes,setRecipes] = useState([])
    const token=useSelector(state=>state.UserReducer.accessToken)
    const api =useAxios()
    const premium= useSelector(state=>state.UserReducer.premium)
    const user = useSelector(state=>state.UserReducer.user)
   
   const {likedRecipes,savedRecipes} =user? useRecipeAPI(api):[]
   
   

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
        <h1 className='mx-4 md:mx-32 my-5 text-3xl text-btnColor underline'>Fresh from the Kitchen</h1>
        {recipes?.length === 0 ? <><div className='mx-16 md:mx-32 my-1 md:my-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
        <LoadingCard/><LoadingCard/> <LoadingCard/><LoadingCard/>
        </div></>
            : 
<div className='mx-4 md:mx-32 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
    <>
    

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
    
</>
    </div>
    }
    </div>
    
  )
}

export default Latest