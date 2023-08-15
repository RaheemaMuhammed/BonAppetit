import React, { useEffect, useState } from 'react'
import { getRecipes } from '../Axios/Services/CommonServices'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {  FaThumbsUp,FaRegBookmark,FaRegThumbsUp,FaBookmark } from 'react-icons/fa';
import { axiosInstance } from '../Axios/Instances/Instance';
import { useRecipeAPI } from '../CustomHooks/Recipe/useRecipeAPI';
import { BsStars } from 'react-icons/bs';
import RecipeCard from './RecipeCard';
import useAxios from '../Axios/Instances/useAxios';
 const RecipeCards = ({filter,setFilter}) => {
    const [recipes,setRecipes] = useState([])
    const token=useSelector(state=>state.UserReducer.accessToken)
    const navigate=useNavigate()
    const premium= useSelector(state=>state.UserReducer.premium)
    const user = useSelector(state=>state.UserReducer.user)
   const api=useAxios()
    const [ refresh,setRefresh] =useState(false)
    const [filterList,setFilterList] =useState(false)
    const [category,setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const { likedRecipes,savedRecipes }= user ?useRecipeAPI(api) : []

    // for fetching recipes
    useEffect(()=>{
        try{
            const fetchRecipes= async()=>{
                const response = await getRecipes()
                if(response){
                    const filteredRecipes = category ? response?.payload.filter((item)=>item.category_name === category):response?.payload

                    setRecipes(filteredRecipes)
                    const categoryNames = [...new Set(response?.payload.map(item=>item.category.name))]
                    setCategories(categoryNames)
                    
                }
            }
            fetchRecipes()
            
        }catch(error){
            console.log(error);
        }
    },[refresh,category])
 
  return (
    <>
    <div>

<div className='flex mx-3 md:mx-16 mt-3 justify-between'>
    
    <h1 className='ml-10 md:ml-16 cursor-pointer text-lg text-primary font-medium flex font-serif my-2 bg-btnColor  px-1 rounded-sm' onClick={()=>setFilterList(!filterList)}>filter
     <svg class="w-4 h-4  mt-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
   

    </h1>
    

    <h1 className=' mx-10 md:mx-14 cursor-pointer text-base md:text-2xl text-amber-900 font-semibold underline animate-pulse my-2 bg-primary rounded-full px-1 md:px-2' onClick={()=>setFilter(!filter)}>Explore Trending</h1>

</div>

<hr />

    </div>
    {filterList &&<>
    <div className='absolute rounded-lg bg-btnColor text-white mx-8 md:mx-20  p-2 shadow menu dropdown-content z-[2] bg-base-100 rounded-box w-52'>
    <p  onClick={()=>{setCategory('');setFilterList(!filterList);}} className='cursor-pointer hover:text-black py-1'>All</p>

        {categories?.map((item)=>(

            <p key={item} onClick={()=>{setCategory(item);setFilterList(!filterList);}} className='cursor-pointer hover:text-black py-1'>{item}</p>
            
        ))}
        
        </div>
        </> }
    <div className='relative mx-14 md:mx-32 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
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
    </>
  )
}

export default RecipeCards