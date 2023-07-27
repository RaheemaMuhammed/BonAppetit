import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../../Axios/Instances/Instance';
import {FaRegTrashAlt,FaRegThumbsUp,FaRegEye,FaRegEdit} from 'react-icons/fa'
import { getCurrentUserRecipes } from '../../../Axios/Services/UserServices';
import EditRecipeModal from '../Recipe/EditRecipeModal';
import DeleteRecipeModal from '../Recipe/DeleteRecipeModal'
const YourRecipes = () => {
  const token=useSelector(state=>state.UserReducer.accessToken)
  const navigate=useNavigate()
  const user = useSelector(state=>state.UserReducer.user)
  const [currentRecipes,setCurrentRecipes] = useState([])
  const [ refresh,setRefresh] =useState(false)
  const [editModal,setEditmodal] = useState(false)
  const [deleteModal,setDeletemodal] = useState(false)
  const [recipe_name,setRecipe_name] = useState('')
  const [id,setId] = useState('')

  

  useEffect(()=>{
   
        const userCurrentRecipes= async()=>{
          try{
            const response = await getCurrentUserRecipes(token)
            setCurrentRecipes(response?.payload)
        
        
    }catch(error){
      navigate('/expired/')
    }
  }
    userCurrentRecipes()
},[refresh])


  return (
    <>
   <div className='mt-20 '>
   {editModal ? <EditRecipeModal setEditModal={setEditmodal} Refresh={refresh} setRefresh={setRefresh} recipe_name={recipe_name} /> : ''}
   {deleteModal ? <DeleteRecipeModal setDeletemodal={setDeletemodal} Refresh={refresh} setRefresh={setRefresh} id={id} /> : ''}


   <div className=' my-5  grid grid-flow-row '>
    
    

        {currentRecipes?.length === 0 ? '' : 

        < >
        {currentRecipes?.map(item=>{
          return(
            
            <div className="container m-auto " >
            <div className="bg-white rounded overflow-hidden shadow-lg relative hover:shadow-xl w-full mb-2">
              <div className='flex '>  
               <div className='w-[25%]'>
                <Link to={`/singleRecipe/${item.recipe_name}`}><img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/></Link>
                </div>         

                <div className="m-4 w-full">
                    <span className='flex justify-between'> 
                    <div>
                    <Link to={`singleRecipe/${item.recipe_name}`}>    <span className="font-bold text-2xl">{item.recipe_name}</span></Link>
<p  className='flex gap-2 text-lg my-2 '><FaRegEye color='brown' size={22}/>{item.views}</p>
<p className='flex gap-2 text-lg'><FaRegThumbsUp color='brown' size={22}/>{item.total_likes}</p>

                    </div>
                    
                    
                    <div className='block '>
                    <span className='cursor-pointer mb-8' onClick={()=>{setDeletemodal(!deleteModal); setId(item.id);}}><FaRegTrashAlt size={24} style={{color:'brown',marginBottom:'10px'}} /></span>
                    <span className='cursor-pointer' onClick={()=>{setEditmodal(!editModal); setRecipe_name(item.recipe_name);} }><FaRegEdit size={24} style={{color:'brown'}} /></span>
                    
                    </div>

                         </span>
                </div>

                </div>

            </div>
            
            
            </div>
          )
        
                   
            
        }
        )
      }
      </>
    }
      

    </div>
    </div>
    </>
   
  )
}

export default YourRecipes