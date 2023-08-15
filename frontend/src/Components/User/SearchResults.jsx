import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { getSearchResults } from '../../Axios/Services/UserServices'
import { useParams } from 'react-router-dom'
import { useRecipeAPI } from '../../CustomHooks/Recipe/useRecipeAPI'
import RecipeCard from '../RecipeCard'
import useAxios from '../../Axios/Instances/useAxios'
const SearchResults = () => {
    
    const {query}= useParams()
   const token=useSelector(state=>state.UserReducer.accessToken)
   const user = useSelector(state=>state.UserReducer.user)
const api =useAxios()
   const [recipes,setRecipes] =useState([])
   const premium= useSelector(state=>state.UserReducer.premium)

   const { likedRecipes,savedRecipes} =useRecipeAPI(api)

    useEffect(() => {
       
      const fetchResults=async()=>{
        try {
            const response = await getSearchResults(api,query)
            if(response?.status===200){
                setRecipes(response?.payload);
            }else if(response?.status===400){
                console.log(response.error);
            }
        } catch (error) {
            console.log(error);
        }
      }
    fetchResults()
      
    }, [query])
    
  return (
    <div>
        <h1 className='mx-16 md:mx-32 my-5 text-3xl text-btnColor text-center'>Showing results for '{query}'</h1> 
        {recipes?.length === 0 ? <div className='flex items-center justify-center'>
            <p className='font-semibold text-2xl'>No Results Found!!!</p>
        </div> : 
<div className='mx-16 md:mx-32 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
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

export default SearchResults