import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { getSingleRecipeComents } from '../../../Axios/Services/CommonServices'
import { axiosInstance } from '../../../Axios/Instances/Instance';
import { postingComment,deleteComment } from '../../../Axios/Services/UserServices';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const CommentComponent = ({recipe_id,author}) => {
    const user=useSelector(state=>state.UserReducer.user.username)
    const token=useSelector(state=>state.UserReducer.accessToken)
    const [postComment,setPostComment]=useState('')
    const [ refresh,setRefresh] =useState(false)
const [settings,setSettings] = useState(false)
    const [comments,setComments] = useState([])
    useEffect(() => {
        try {
            const fetchComments = async()=>{
                const response = await getSingleRecipeComents(recipe_id)
                if(response){
                    setComments(response?.payload)
                    
                }
            }
            fetchComments()
        } catch (error) {
            console.log(error);
        }
      
    
      
    }, [recipe_id,refresh ])


    // adding a comment
        const handleCommentPost =async()=>{
                try {
                    const data = {
                        recipe_id:recipe_id,
                        comment:postComment
                    }
                    if(token){
                        const response = await postingComment(token,data)
                        console.log(response);
                        setRefresh(!refresh)
                        setPostComment('')
                        toast.success(response?.message)
            
                    }else{
                        navigate('login/')
                    }
                    
                } catch (error) {
                    navigate('/expired/')
                }

        }
        //deleting a comment
    const handleCommentDelete = async(id)=>{
        try {
            const response= await deleteComment(token,id)
            console.log(response);
            if(response.status===200){
                setRefresh(!refresh)
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
            
        } catch (error) {
            navigate('/expired/')
            
        }

    }
    

  return (
    <div><section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
    <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments?.length})</h2>
      </div>
      <form className="mb-6">
          <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" className="sr-only">Your comment</label>
              <textarea id="comment" rows="6"
              value={postComment}
              onChange={(e) => setPostComment(e.target.value)}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                  placeholder="Write a comment..." required></textarea>
          </div> 
          <button type="button" onClick={handleCommentPost}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-btnColor rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
              Post comment
          </button>
      </form>
      {comments?.length >=1 && <>
      {comments?.map(item=>{
                   //    for date formatting
                    const created_at_str = item?.created_at;
                    const created_at_date = new Date(created_at_str);
                    const formatted_date = created_at_date.toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                    });
        return(

            <>
            <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    {item.user_profile ?<img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={`${axiosInstance}${item.user_profile}`}
                          alt="Michael Gough"/>  :     <svg className=" rounded w-7 h-5 text-gray-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
}
                    {item.user}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                          title="February 8th, 2022">{formatted_date}</time></p>
              </div>
              {(user === item.user || user ===author) &&  <button 
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-btnColor bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                  type="button"
                  onClick={()=>handleCommentDelete(item.id)}
                  >
                    <FaTrash/>
                
              </button>}
              
             
              
          </footer>
          <p className="text-gray-500 dark:text-gray-400">{item.comment}.</p>
          <div className="flex items-center mt-4 space-x-4">
              <button type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                  <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Reply
              </button>
          </div>
      </article>
      {item.reply && <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="Jese Leos"/>Jese Leos</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-12"
                          title="February 12th, 2022">Feb. 12, 2022</time></p>
              </div>
              <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button">
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                      </path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
              </button>
            
              <div id="dropdownComment2"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                          <a href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                          <a href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                          <a href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                  </ul>
              </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
          <div className="flex items-center mt-4 space-x-4">
              <button type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                  <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Reply
              </button>
          </div>
      </article>}
      
            </>
        )
      })
      }
        
      </>}
     
    
    </div>
  </section></div>
  )
}

export default CommentComponent