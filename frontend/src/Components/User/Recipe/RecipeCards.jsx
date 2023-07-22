import React, { useEffect, useState } from 'react'
import { getRecipes } from '../../../Axios/Services/CommonServices'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../Axios/Instances/Instance';
const RecipeCards = () => {
    const [recipes,setRecipes] = useState([])
    const token=useSelector(state=>state.UserReducer.accessToken)
    const navigate=useNavigate()
    const premium= useSelector(state=>state.UserReducer.premium)
    useEffect(()=>{
        try{
            const fetchRecipes= async()=>{
                const response = await getRecipes()
                if(response){
                    setRecipes(response?.payload)
                }
            }
            fetchRecipes()
            
        }catch(error){
            console.log(error);
        }
    },[])
   
  return (
    <div className='mx-16 md:mx-32 my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-3 justify-evenly'>
    <>
        
        {recipes?.length === 0 ? '' : 
        <>
        {recipes.map(item=>{
            return(

<div key={item.id} className="container m-auto">
<div className="bg-white rounded overflow-hidden shadow-md relative hover:shadow-lg w-full mb-2">
    <img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/>
    <div className="m-4">
        <span className="font-bold">{item.recipe_name}</span>
        <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
    </div>
    {/* <div className="text-center  cursor-pointer text-white  hover:text-black  p-2 ">
        
          
        <span className='bg-btnColor hover:bg-newPeach p-1 rounded'>Start Cooking!</span>
    </div> */}
</div>


</div>

            )
        })}
    
    </>
}</>
    </div>
  )
}

export default RecipeCards