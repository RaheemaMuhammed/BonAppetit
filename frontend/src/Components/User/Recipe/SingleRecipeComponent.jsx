import React, { useEffect, useState } from 'react'
import { getSingleRecipes } from '../../../Axios/Services/CommonServices'
import { useParams,useNavigate } from 'react-router-dom'
import avatar from '../../../assets/avatar.jpg'
import CommentComponent from './CommentComponent'
import {  FaThumbsUp,FaRegBookmark,FaRegThumbsUp,FaBookmark } from 'react-icons/fa';
import { handleLikeStatus,handleSaveStatus,getLikedRecipes,getSavedRecipes} from '../../../Axios/Services/UserServices'
import { axiosInstance } from '../../../Axios/Instances/Instance'
import {RxDotFilled} from 'react-icons/rx'
import { useSelector } from 'react-redux'
const SingleRecipeComponent = () => {
   const [recipe,setRecipe] =useState({})
   const {recipe_name}= useParams()
   const [ingredients,setIngredients] = useState([])
   const token=useSelector(state=>state.UserReducer.accessToken)
   const navigate=useNavigate()
   const [likedRecipes,setLikedRecipes] = useState([])
   const [savedRecipes,setSavedRecipes] = useState([])
   const [ refresh,setRefresh] =useState(false)
//    for date formatting
  const created_at_str = recipe?.created_at;
  const created_at_date = new Date(created_at_str);
  const formatted_date = created_at_date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
   useEffect(()=>{
    try{
        const fetchSingleRecipe= async ()=>{
            
            const response = await getSingleRecipes(recipe_name)
            if(response){
                setRecipe(response?.payload)
                console.log(recipe);
                setIngredients(response?.payload?.ingredients?.split(',') || [])
                console.log(recipe);
            }
        }
        fetchSingleRecipe()
    }catch(error){
        console.log(error);
    }
   },[refresh])

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
    const isLiked = likedRecipes?.some((likedRecipe) => likedRecipe.id === recipe.id);
    const isSaved= savedRecipes?.some((savedRecipe) => savedRecipe.id === recipe.id)

  return (
    <div>
    

<main className="pt-8 pb-16 lg:pt-16 lg:pb-24  ">
  <div className="  ">
      <article className="mx-2 md:mx-[25%] format format-sm sm:format-base lg:format-lg format-blue ">
          <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                  <div className=" mr-3 text-sm text-gray-900 dark:text-white">
                  <h1 className="mb-4 text-3xl font-poppins font-bold leading-tight text-btnColor hover:text-black lg:mb-6 lg:text-4xl ">{ recipe?.recipe_name }</h1>
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    {recipe?.author_profile ?                      <img className="mr-4  w-16 h-12 rounded-full" src= {`${axiosInstance}${recipe?.author_profile}`} alt="Jese Leos"/>
 : 
<div className="relative w-10 h-10 overflow-hidden mr-2 bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
</div>


                    }
                      <div>
                          <a href="#" rel="author" className="text-xl font-normal text-gray-700 dark:text-white">{recipe?.author}</a>
                          <p className="text-base font-light text-gray-500 dark:text-gray-400">{formatted_date}</p>
                      </div>
                      </div>

                  </div>
              </address>
          </header>
          <div className='my-5 '>
            <hr />
            <div className='flex flex-row mb-3'>
            <span className='mt-3  text-[14px] mx-1 text-btnColor '>{recipe.total_likes === 0 ? '' : recipe.total_likes}</span>
                                 
                                 <span className='cursor-pointer justify end mt-2' onClick={() => handleLike(recipe.id)}>{isLiked ? <FaThumbsUp size={21} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={21}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-9' onClick={()=>handleSave(recipe.id)}>{isSaved ? <FaBookmark size={21} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>

            </div>
            <hr />
          </div>
         
          <img className=' shadow-xl w-[500px] h-[400px] object-cover rounded-md  max-w-full' src={`${axiosInstance}${recipe?.picture}`} alt=""/>
         
        
        <div className='mt-9'>
<p className='mt-5 text-4xl text-btnColor hover:underline'>Ingredients:</p>     
<div>
    {ingredients?.length===0 ? '' : 
    <>
    {ingredients.map((item,index)=>{
        return(
            <>
             <div key={index} className='flex my-4 text-xl text-gray-600 '>
         <div className='mt-1'><RxDotFilled /></div> 
          <span className='mt-0'>{item}</span>
        </div>
            
            </>
        )
    })}
   
    </>
     }
</div>
   </div>
   <div>

    <p className='mt-5 text-4xl text-btnColor hover:underline'>Instructions:</p>
    <div className='mt-5 text-xl my-3 hover:border-btnColor rounded text-gray-600'>
        {recipe?.instructions}
    </div>
   </div>
      
     
  
      
       
      </article>
  </div>
  <div>
    <CommentComponent recipe_id={recipe?.id} author={recipe?.author}/>
  </div>
</main>



    </div>
  )
}

export default SingleRecipeComponent