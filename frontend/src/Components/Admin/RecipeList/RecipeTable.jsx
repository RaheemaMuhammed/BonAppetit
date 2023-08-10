import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllRecipes } from '../../../Axios/Services/AdminServices'
import { axiosInstance } from '../../../Axios/Instances/Instance'
import { Link } from 'react-router-dom'
import StatusChange from './StatusChange'
const RecipeTable = () => {
  const [BRModal,setBRModal] = useState(false)
  const [id,setId]=useState('')
  const [Refresh,setRefresh]=useState(false)
  const [status,setStatus] = useState('')
  const [name,setname] = useState('')
   
  const token=useSelector(state=>state.AdminReducer.accessToken)
  const [recipes,setRecipes]=useState([])
  useEffect(()=>{
    const fetchRecipes = async()=>{
      try {
        const response = await getAllRecipes(token)
        if(response){
          console.log(response?.payload);
          setRecipes(response?.payload)
        }
      } catch (error) {
        
      }
    }
    fetchRecipes()
  },[Refresh])

  function ValueChange(id,status,name){
    setname(name)
    setStatus(status)
    setId(id)
  }

  return (
    <div>
{BRModal ? <StatusChange setBRModal={setBRModal} name={name} status={status} id={id} setRefresh={setRefresh} Refresh={Refresh} /> : ''}

<p className='text-center my-6 font-serif font-semibold text-2xl text-black'>Recipes</p>

<div class="relative overflow-x-auto w-full my-2">
                {recipes?.length===0 ? <p className='text-center'>No Posts available!!</p>:
    <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-primary ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    No.
                </th>
                <th scope="col" class="px-6 py-3">
                    Recipe name
                </th>
                <th scope="col" class="px-6 py-3">
                    Recipe Author
                </th>
                <th scope="col" class="px-6 py-3">
                    Picture
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            {recipes?.map((item,index)=>{
                return(

            <tr id={item.id} class={`bg-white border ${item.total_reports > 1 && ' text-red-600'} dark:bg-gray-800 dark:border-gray-700`}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                </th>
                
                <td scope="row" class="px-2 py-4 font-medium whitespace-nowrap ">
                <Link to={`/singleRecipe/${item.recipe_name}`}>

                    {item.recipe_name}

                </Link>
                </td>
                <td class="px-3 py-4">
                    {item.author}
                </td>
                <td class="px-6 py-4">
                <img className="w-30 h-20 mb-3  shadow-lg" src={`${axiosInstance}${item.picture}`} alt=""/>
                </td>
                
                <td class="px-3 py-4">
                    {item.instructions}
                </td>
                
                {item.status ? <td className="text-white whitespace-nowrap px-6 py-4">
                            <button onClick={() => {
                              ValueChange(item.id, item.status, item.recipe_name)
                              setBRModal(!BRModal)

                            }} className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>Enable</button>
                          </td> : <td className="text-white whitespace-nowrap px-6 py-4">
                            <button onClick={() => {
                              ValueChange(item.id, item.status, item.recipe_name)
                              setBRModal(!BRModal)

                            }} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Change</button>
                          </td>}
            </tr>
                )
            })}
           
          
        </tbody>
    </table>
                }
</div>
    </div>
  )
}

export default RecipeTable