import React,{useEffect,useState} from 'react'
import { getSingleUser } from '../../../Axios/Services/AdminServices';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../Axios/Instances/Instance';
import useAdminAxios from '../../../Axios/Instances/useAdminAxios';

const SingleUser = ({user_id,setSingle,single}) => {
    const token =useSelector(state => state.AdminReducer.accessToken)
    const [data,setData] =useState({})
    const [recipes,setrecipes] = useState([])
    const [comments,setComments] = useState([])
    const [name,setName] =useState('')
    const api=useAdminAxios()
  const navigate=useNavigate()
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await getSingleUser(api,user_id);
            if (response.status==200) {
                console.log(response?.payload);
                setName(response?.payload?.username)
              setData(response?.payload);
              setrecipes(response?.payload?.recipes)
              setComments(response?.payload?.comments)

              
              
            
            }else if(response.status===404){
                toast.error(response.message)
            }else if(response.status===400){
                toast.error(response.error)
            }
          } catch (error) {
            console.log(error);
            // navigate('/admin/expired/');
          }
        };
      
        fetchUser();
      }, [user_id]);
      const likes=recipes.reduce((sum, obj) => sum + obj.total_likes, 0)
      const sumEarnings = data?.transaction_history?.reduce((sum, obj) => {
        if (obj.type === "earning") {
          return sum +parseFloat(obj.amount);
        }
        return sum;
      }, 0.00)
      
  return (
    <div>
        <div className='flex flex-row justify-between '>
<div></div>
        <p className='uppercase text-4xl'>{data?.username}</p>
        <button className='p-1 border rounded-md mx-20' onClick={()=>setSingle(!single)}>Go Back</button>
        </div>
        <div className='flex flex-col gap-3'>
            <div>

                    <p className='text-3xl text-btnColor my-2'>User Information</p>
                    <div className=' '>
                        
<div className="w-full my-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-[32%] ">
    <div className="flex justify-end px-4 pt-4">
        
        
      
    </div>
    <div className="flex flex-col items-center pb-10">
    {data?.profile_pic ?    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`${axiosInstance}${data.profile_pic}`} alt=""/>
 : 
<div className="relative w-10 h-10 overflow-hidden mr-2 bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
</div>
  }
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data?.username}</h5>
        <span className="text-base text-gray-500 dark:text-gray-400">{data?.email}</span>
        <span className="text-base text-gray-500 dark:text-gray-400">{data?.phone}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
            {data?.has_premium ?
            
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-btnColor rounded-lg hover:bg-amber-600">Premium</a>
             : 
             
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Basic</a>
             }
        </div>
    </div>
</div>

                    </div>
            </div>
            <div>
                <p className='text-3xl text-btnColor my-3'>User Activity</p>
                <table className='border rounded-lg w-full text-base text-left'>
                    <tbody className=''>
                        <tr><td className='px-3 py-3'>Number of Posts </td>
                        <td className='px-3 py-3'>{recipes?.length}</td></tr>
                        <tr><td className='px-3 py-3'>Number of Likes recieved </td>
                        <td className='px-3 py-3'>{likes}</td></tr>
                        <tr><td className='px-3 py-3'>Number of Comments Posted </td>
                        <td className='px-3 py-3'>{comments?.length}</td></tr>
                        <tr><td className='px-3 py-3'>Total Earnings </td>
                        <td className='px-3 py-3'>{sumEarnings}</td></tr>
                    </tbody>
                </table>
            </div>
            <div>
                <p className='text-3xl text-btnColor my-2'>Posts</p>
                
<div class="relative overflow-x-auto max-w-4xl">
                {recipes?.length===0 ? <p className='text-center'>No Posts available!!</p>:
    <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-primary ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Recipe name
                </th>
                <th scope="col" class="px-6 py-3">
                    Picture
                </th>
                <th scope="col" class="px-6 py-3">
                    Ingredients
                </th>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
            </tr>
        </thead>
        <tbody>
            {recipes?.map((item,index)=>{

                return(

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
                <th scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.recipe_name}
                </th>
                <td class="px-6 py-4">
                <img className="w-30 h-20 mb-3  shadow-lg" src={`${axiosInstance}${item.picture}`} alt=""/>
                </td>
                <td class="px-6 py-4">
                    {item.ingredients},
                </td>
                <td class="px-6 py-4">
                    {item.instructions}
                </td>
            </tr>
                )
            })}
           
          
        </tbody>
    </table>
                }
</div>

            </div>
            <div>
                <p className='text-3xl text-btnColor my-2'>Comments</p>
                <div class="relative h-96 my-4 overflow-x-auto max-w-4xl">
                {comments?.length===0 ? <p className='text-center'>No Comments available!!</p>:
    <table class="w-full text-sm text-left text-gray-500  overflow-y-scroll ">
        <thead class="text-xs text-gray-700 uppercase bg-primary ">
            <tr>
                <th scope="col" class="px-6 py-3">
                      Comment                </th>
                
                <th scope="col" class="px-6 py-3">
                    Post
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
            </tr>
        </thead>
        <tbody>
            {comments?.map((item,index)=>{

                return(

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                
                <th scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.comment}
                </th>
                
                <td class="px-6 py-4">
                    {item.recipe},
                </td>
                <td class="px-6 py-4">
                    {item.date}
                </td>
            </tr>
                )
            })}
           
          
        </tbody>
    </table>
                }
</div>
            </div>
        </div>
    
    </div>
  )
}

export default SingleUser