import React, { useEffect, useState } from 'react'
import { getSingleRecipes } from '../../../Axios/Services/CommonServices'
import { useParams } from 'react-router-dom'
import avatar from '../../../assets/avatar.jpg'
import { axiosInstance } from '../../../Axios/Instances/Instance'
import {RxDotFilled} from 'react-icons/rx'
import { useSelector } from 'react-redux'
const SingleRecipeComponent = () => {
   const [recipe,setRecipe] =useState({})
   const {recipe_name}= useParams()
   const [ingredients,setIngredients] = useState([])
  
//    for date formatting
  const created_at_str = recipe.created_at;
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
                setIngredients(response?.payload?.ingredients?.split(',') || [])
            }
        }
        fetchSingleRecipe()
    }catch(error){
        console.log(error);
    }
   },[])
  return (
    <div>
       



<main className="pt-8 pb-16 lg:pt-16 lg:pb-24  ">
  <div className="  ">
      <article className=" mx-[25%] format format-sm sm:format-base lg:format-lg format-blue ">
          <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                  <div className=" mr-3 text-sm text-gray-900 dark:text-white">
                  <h1 className="mb-4 text-3xl font-poppins font-bold leading-tight text-btnColor hover:text-black lg:mb-6 lg:text-4xl ">{ recipe.recipe_name }</h1>
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    {recipe?.author_profile ?                      <img className="mr-4  w-16 h-12 rounded-full" src= {`${axiosInstance}${recipe.author_profile}`} alt="Jese Leos"/>
 : 
<div class="relative w-10 h-10 overflow-hidden mr-2 bg-gray-100 rounded-full dark:bg-gray-600">
    <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>


                    }
                      <div>
                          <a href="#" rel="author" className="text-xl font-normal text-gray-700 dark:text-white">{recipe.author}</a>
                          <p className="text-base font-light text-gray-500 dark:text-gray-400">{formatted_date}</p>
                      </div>
                      </div>

                  </div>
              </address>
          </header>
         
          <img className=' shadow-xl w-[500px] h-[400px] object-cover rounded-md  max-w-full' src={`${axiosInstance}${recipe.picture}`} alt=""/>
         
        
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
        {recipe.instructions}
    </div>
   </div>
      
     
  
      
       
      </article>
  </div>
</main>



    </div>
  )
}

export default SingleRecipeComponent