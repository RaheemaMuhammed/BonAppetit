import React, { useEffect, useState } from 'react'
import { getSingleRecipes } from '../../../Axios/Services/CommonServices'
import { useParams,useNavigate } from 'react-router-dom'
import {BsFlag} from 'react-icons/bs'
import CommentComponent from './CommentComponent'
import {  FaThumbsUp,FaRegBookmark,FaRegThumbsUp,FaBookmark } from 'react-icons/fa';
import { handleLikeStatus,handleSaveStatus,getLikedRecipes,getSavedRecipes,handleView} from '../../../Axios/Services/UserServices'
import { axiosInstance } from '../../../Axios/Instances/Instance'
import {RxDotFilled} from 'react-icons/rx'
import { useSelector } from 'react-redux'
import ReportRecipeModal from './ReportRecipeModal'
import useAxios from '../../../Axios/Instances/useAxios'
const SingleRecipeComponent = () => {
   const [recipe,setRecipe] =useState({})
   const {recipe_name}= useParams()
   const [ingredients,setIngredients] = useState([])
   const token=useSelector(state=>state.UserReducer.accessToken)
   const api=useAxios()
   const user=useSelector(state=>state.UserReducer.user)
   const navigate=useNavigate()
   const [likedRecipes,setLikedRecipes] = useState([])
   const [savedRecipes,setSavedRecipes] = useState([])
   const [ refresh,setRefresh] =useState(false)
   const [reportModal,setReportModal]=useState(false)
   const [recipeId,setRecipeID] =useState('')
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
                setRecipeID(response?.payload?.id)
                
                setIngredients(response?.payload?.ingredients?.split(',') || [])
            }
        }
        fetchSingleRecipe()
    }catch(error){
        console.log(error);
    }
},[refresh])

//  to track view count
useEffect(() => {
  if(user){
    try{
        const data={
            "recipe_id" :recipeId
        }
        const updateViewCount= async()=>{
            const response = await handleView(api,data)
            setSavedRecipes(response?.payload)

        }
        updateViewCount()
    }catch(error){
        console.log(error);
        navigate('/expired/')
    }

  }
}, [recipeId])
       // to show saved recipes
       useEffect(()=>{
        if(user){

            try{
                const userSavedRecipes= async()=>{
                    const response = await getSavedRecipes(api)
                    setSavedRecipes(response?.payload)
    
                }
                userSavedRecipes()
            }catch(error){
                navigate('/expired/')
            }
        }
    },[refresh,user])
    // to show liked recipes
    useEffect(()=>{
        if(user){

            try{
                const userLikedRecipes= async()=>{
                    const response = await getLikedRecipes(api)
                    setLikedRecipes(response?.payload)
    
                }
                userLikedRecipes()
            }catch(error){
                navigate('/expired/')
            }
        }
    },[refresh,user])
    // for like and unlike
    const handleLike = async (recipe_id)=>{
        try{
            const data= {
                recipe_id:recipe_id
            }
            if(token){
                const response = await handleLikeStatus(api,data)
                setRefresh(!refresh)
                
    
            }else{
                navigate('login/')
            }
            
        }
        catch(error){
            // navigate('/expired/')
        }
    }
   
    // for save and unsave
    const handleSave = async(recipe_id)=>{
        try{
            const data= {
                recipe_id:recipe_id
            }
            if(token){
                const response = await handleSaveStatus(api,data)
                setRefresh(!refresh)
                
    
            }else{
                navigate('login/')
                
            }
            
        }
        catch(error){
            // navigate('/expired/')
        }

    }




    const isLiked = likedRecipes?.some((likedRecipe) => likedRecipe.id === recipe.id);
    const isSaved= savedRecipes?.some((savedRecipe) => savedRecipe.id === recipe.id)

  return (
    <div className=''>
       {reportModal ? <ReportRecipeModal setreportModal={setReportModal} Refresh={refresh} setRefresh={setRefresh} reported_item={recipe.id} recipe_name={recipe.recipe_name} /> : ''}


<main className="pt-8 pb-16 lg:pt-16 lg:pb-24  ">
  <div className="  ">
      <article className="mx-2 md:mx-[9%] format format-sm sm:format-base lg:format-lg format-blue ">
          <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                  <div className=" mr-3 text-sm text-gray-900 dark:text-white">
                  <p className="mb-4 text-3xl leading-tight text-btnColor hover:text-orange-700 lg:mb-6 lg:text-6xl font-medium underline ">{ recipe?.recipe_name }</p>
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
          <hr style={{borderTopColor:'brown'}}/>  
                    <div className='flex w-full justify-between mb-3 '>
                <span className='flex'>
                <span className='mt-3  text-[14px] mx-1 text-btnColor '>{recipe?.total_likes === 0 ? '' : recipe?.total_likes}</span>
                                 
                                 <span className='cursor-pointer justify end mt-2' onClick={() => handleLike(recipe.id)}>{isLiked ? <FaThumbsUp size={21} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={21}/>}</span>
                                 <span className='cursor-pointer justify end mt-3 mx-9' onClick={()=>handleSave(recipe.id)}>{isSaved ? <FaBookmark size={21} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                </span>
 
                                 <span className='cursor-pointer justify end mt-3 ' onClick={()=>setReportModal(!reportModal)}><BsFlag size={21} style={{fill:'brown'}}/>  </span>

            </div>
            <hr style={{borderTopColor:'brown'}}/>
          </div>
          <div className='flex flex-col sm:grid sm:grid-cols-2 gap-2'>
          <img className=' w-full hover:shadow-2xl shadow-xl h-[400px] object-cover rounded-md  ' src={`${axiosInstance}${recipe?.picture}`} alt=""/>

        <div className=' shadow-md rounded-lg p-1 w-full'>
<p className='mt-3 text-4xl text-btnColor hover:underline text-center font-serif'>Ingredients</p>     
<div>
    {ingredients?.length===0 ? '' : 
    <>
    {ingredients.map((item,index)=>{
        return(
            
             <div key={index} className='flex my-4 text-xl  '>
         <div className='mt-1'><RxDotFilled style={{color:'brown'}}/></div> 
          <span className='mt-0'>{item}</span>
        </div>
            
            
        )
    })}
   
    </>
     }
</div>
   </div>
          </div>
         
         
        
   <div className='mt-5 rounded-lg px-2 pb-1 shadow-lg'>

    <p className='mt-3 text-4xl text-btnColor hover:underline font-serif'>Instructions</p>
    <div className='mt-3 text-xl my-3 hover:border-btnColor rounded '>
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