import React, { useEffect, useState } from 'react'
import { getRecipes } from '../Axios/Services/CommonServices'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {  FaThumbsUp,FaRegBookmark,FaRegThumbsUp,FaBookmark } from 'react-icons/fa';
import { axiosInstance } from '../Axios/Instances/Instance';
import { useRecipeAPI } from '../CustomHooks/Recipe/useRecipeAPI';
import { Bs0Circle, BsStars } from 'react-icons/bs';
import RecipeCard from './RecipeCard';
import useAxios from '../Axios/Instances/useAxios';
import Loader from './Loader';
import { getCategories, getFilteredRecipes } from '../Axios/Services/UserServices';
import LoadingCard from './LoadingCard';
 const RecipeCards = ({filter,setFilter}) => {
    const [recipes,setRecipes] = useState([])
    const [recipesFiltered,setRecipesFiltered] = useState([])
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
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isNoMoreRecipes,setIsNoMoreRecipes] =useState(false)
    const [count,setCount] =useState(0)
    const imageWithUrl=true
    // for fetching recipes
    
useEffect(()=>{
    const fetchCategories =async ()=>{
        try{
        const response = await getCategories(api)
        if(response){
            console.log(response);
            setCategories(response?.filtered_categories)
        }
    }catch(error){
   console.log(error);
    // navigate('/expired/')
}
}
fetchCategories()
},[])
    
const fetchFilteredeRecipes =async(filter)=>{
    try {
        const response = await getFilteredRecipes(api,filter)
        setRecipesFiltered(response?.payload)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
       

useEffect(() => {
         
          const fetchRecipes= async()=>{
               try {
                
                   const response = await getRecipes(currentPage)
                   console.log(response);
                   
                   if(response){
                    //    const filteredRecipes = category ? response?.results?.filter((item)=>item.category_name === category) : response?.results
                       const allRecipes = response?.results
                       setRecipes(prevRecipes=>[...prevRecipes, ...allRecipes])
                        setCount( response?.count)
                    //    const categoryNames = [...new Set(response?.results?.map(item=>item.category.name))]
                    //    setCategories(categoryNames)
                   setIsLoading(false)
                   if(response?.next !== null){
                    setCurrentPage(currentPage+1)
                   }else{
                    setIsLoading(false)
                   }
                       
                   }
               } catch (error) {

                if (error.response && error.response.status === 404) {

                    setIsNoMoreRecipes(true);
                    setIsLoading(false)
                  } else {
                    console.log(error);
                  }
               }
           }
         fetchRecipes()
       }, [currentPage])
       
         
    
     useEffect(() => {
        const handleScroll = (e)=>{
            const scrollHeight = e.target.documentElement.scrollHeight
            const currentHeight= e.target.documentElement.scrollTop + window.innerHeight
            if(currentHeight+1 >= scrollHeight && !isLoading && !isNoMoreRecipes){
              if(  recipes?.length < count) {

                  setCurrentPage((currentPage)=>currentPage+1);
                  setIsLoading(true)  
                }else{
                  setIsLoading(false)

              }

            }

        }
       window.addEventListener("scroll",handleScroll)
       return ()=> window.removeEventListener("scroll",handleScroll)
     }, [currentPage,isLoading,isNoMoreRecipes])
            

   
    
 
  return (
    <>
    <div>
<div className='flex mx-3 md:mx-16 mt-3 justify-between'>
    
    <h1 className='ml-10 md:ml-16 cursor-pointer text-lg text-primary font-medium flex font-serif my-2 bg-btnColor  px-1 rounded-sm' onClick={()=>setFilterList(!filterList)}>filter
     <svg className="w-4 h-4  mt-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
            <p onClick={()=>{setCategory(item.name);setFilterList(!filterList);fetchFilteredeRecipes(item.name);}} className='cursor-pointer hover:text-black py-1'>{item.name}</p>
            
        ))}
        
        </div>
        </> }
    <div className='relative mx-14 md:mx-32 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
    <>
    {category ? recipesFiltered?.map(item=>{
    // Check if the recipe is liked by the logged-in user
 const isLiked = likedRecipes?.some((likedRecipe) => likedRecipe.id === item.id);
 const isSaved= savedRecipes?.some((savedRecipe) => savedRecipe.id === item.id)
        return(


            <RecipeCard
                item={item}
                premium={premium}
                isLiked={isLiked}
                isSaved={isSaved}
                user={user}
              
              />
        )

    }) : recipes?.length === 0 ? <><LoadingCard/><LoadingCard/> <LoadingCard/><LoadingCard/></>: 
        <>

        {recipes?.map(item=>{
 const isLiked = likedRecipes?.some((likedRecipe) => likedRecipe.id === item.id);
 const isSaved= savedRecipes?.some((savedRecipe) => savedRecipe.id === item.id)

          return (  <RecipeCard
            item={item}
            premium={premium}
            isLiked={isLiked}
            isSaved={isSaved}
            user={user}
            imageWithUrl={imageWithUrl} 
          />)
            

        }
            )
 }
        
        {isLoading && <div className='block' role="status">
    <svg aria-hidden="true" className="w-12 h-12 mr-2 flex items-center justify-center text-gray-200 animate-spin dark:text-gray-600 fill-btnColor" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div> }
    </>
    
    }
</>
    </div>
    </>
  )
}

export default RecipeCards