import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaRegBookmark, FaRegThumbsUp, FaBookmark } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import { axiosInstance } from '../Axios/Instances/Instance';

const RecipeCard = ({item,premium,isLiked,isSaved,user,imageWithUrl}) => {
    const navigate =useNavigate()
    const handleCardClick=()=>{
        if(premium){
            navigate(`singleRecipe/${item.recipe_name}`)
        }else if(item?.is_private && item?.author == user?.username){
            navigate(`singleRecipe/${item.recipe_name}`)
        }else if(!premium && item?.is_private){
            navigate('/offer')
        }else{
            navigate(`singleRecipe/${item.recipe_name}`)
        }
    }

  return (
    <div key={item.id} className="container m-auto">
    <div key={item.id} className="bg-white rounded cursor-pointer overflow-hidden shadow-lg relative hover:shadow-xl w-full mb-2" onClick={()=>handleCardClick()}>
    {item.is_private && <div className='absolute z-1 flex bg-white mt-1 rounded-full px-1'>
        <p className='font-poppins text-xs font-bold text-btnColor m-1'>Premium</p>
        <BsStars size={22} style={{fill:'gold',marginTop:'2px'}} className=' ' />

        </div>}
{imageWithUrl

? 
<img src={item.picture} alt="" className="w-full h-32 sm:h-48 object-cover "/>
:

<img src={`${axiosInstance}${item.picture}`} alt="" className="w-full h-32 sm:h-48 object-cover "/>
}
        <div className="m-4">
            <span className='flex justify-between'>

            
               <span className="font-bold">{item.recipe_name}</span>
                 <span className='flex'>
                 <span className='mt-3 text-[14px] mx-1 text-btnColor'>{item.total_likes === 0 ? '' : item.total_likes}</span>

                 <span className='cursor-pointer justify end mt-2' >{isLiked ? <FaThumbsUp size={22} style={{fill:'brown'}} />: <FaRegThumbsUp color='brown' size={23}/>}</span>
                 <span className='cursor-pointer justify end mt-3 mx-2' >{isSaved ? <FaBookmark size={22} style={{fill:'brown'}}/>  : <FaRegBookmark size={21} style={{color:'brown'}}  />}</span>
                 </span>
                 </span>
            <span className="block text-gray-700 text-sm">Recipe by <b>{item.author}</b></span>
        </div>
        
    </div>
    
    
    </div>
  )
}

export default RecipeCard