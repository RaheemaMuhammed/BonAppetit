import React,{useEffect,useState,useRef} from 'react'
import { useSelector } from 'react-redux';
import { getSingleRecipeComents } from '../../../Axios/Services/CommonServices'
import { axiosInstance } from '../../../Axios/Instances/Instance';
import { postingComment,deleteComment } from '../../../Axios/Services/UserServices';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CommentComponent = ({recipe_id,author}) => {
    const navigate = useNavigate()
    const [parent,setParent] = useState('')
    const user=useSelector(state=>state.UserReducer.user?.username)
    const token=useSelector(state=>state.UserReducer.accessToken)
    const commentTextFieldRef = useRef(null);

    const [postComment,setPostComment]=useState('')
    const [ refresh,setRefresh] =useState(false)
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
      
    
      
    }, [recipe_id,refresh])


    // adding a comment
        const handleCommentPost =async()=>{
            
                try {
                    
                        const data = {
                            recipe_id:recipe_id,
                            comment:postComment,
                            parent:parent
                        }
                    
                        if (parent) {
                            data.parent = parent; 
                          }
                      
                    
                    if(token){
                        const response = await postingComment(token,data)
                        setRefresh(!refresh)

                        setPostComment('')
                        setParent('')
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
    <div><section className="bg-white  py-4 lg:py-8">
    <div className="max-w-3xl border rounded-lg mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg lg:text-2xl mt-2 font-bold text-newCoral ">Discussion ({comments?.length})</h2>
      </div>
      
      {comments?.length >=1 && <>
      {comments?.map((item,index)=>{
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
            <article key={item.id} className="p-2 mb-2 text-base bg-white rounded-lg ">
          <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-base text-gray-900 dark:text-white">
                    {item.user_profile ?<img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={`${axiosInstance}${item.user_profile}`}
                          alt="Michael Gough"/>  :     <svg className=" rounded w-4 mr-1 h-6 text-gray-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
}
                    {item.user}</p>
                  <p className="text-sm text-gray-600 ">{formatted_date}</p>
              </div>
              {(user === item.user || user ===author) &&  <button 
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-btnColor bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                  type="button"
                  onClick={()=>handleCommentDelete(item.id)}
                  >
                    <FaTrash/>
                
              </button>}
              
          </footer>
          <p className="text-gray-500 ">{item.comment}.</p>
          <div className="flex items-center mt-2 space-x-4">
              <button type="button"
              onClick={()=>{ commentTextFieldRef.current?.focus();setPostComment(`@${item.user} `);setParent(item.id)
               } }
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                  <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Reply
              </button>
          </div>
      </article>
      {item.children.length >=1 &&
      <>{item.children.map(item1=>{
        const created_at_str1 = item1?.created_at;
        const created_at_date1 = new Date(created_at_str1);
        const formatted_date1 = created_at_date1.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
        });
        return(
<article key={item1.id} className="p-3 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-base text-gray-900 dark:text-white">
                    {item1.user_profile ?<img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={`${axiosInstance}${item1.user_profile}`}
                          alt="Michael Gough"/>  : 
                           <svg className=" rounded w-4 mr-1 h-6 text-gray-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
}
                    {item1.user}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formatted_date1}</p>
              </div>
              {(user === item1.user || user ===author) &&  <button 
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-btnColor bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                  type="button"
                  onClick={()=>{handleCommentDelete(item1.id)}}
                  >
                    <FaTrash/>
                
              </button>}
        
         
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{item1.comment}</p>
  </article>
        )
      })}
      <hr />
      </>
       
      
      }
      
            </>
        )
      })
      }
        
      </>}
      <hr />
      <form className="my-6">
          <div className="py-2 px-4 mb-4  rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">Your comment</label>
              <textarea id="comment" rows="6"
              value={postComment}
              onChange={(e) => setPostComment(e.target.value)}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                  placeholder="Write a comment..." required></textarea>
          </div> 
          <button type="button" onClick={handleCommentPost}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-btnColor rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary-900 hover:bg-primary hover:text-black">
              Post comment
          </button>
      </form>
    
    </div>
  </section></div>
  )
}

export default CommentComponent