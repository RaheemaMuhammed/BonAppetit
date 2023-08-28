import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../Axios/Services/AdminServices'
import DeleteCat from './DeleteCat'
import AddCategory from './AddCategory'
import { useNavigate } from 'react-router-dom'
import useAdminAxios from '../../../Axios/Instances/useAdminAxios'
const Category = () => {
    const token=useSelector(state=>state.AdminReducer.accessToken)
    const [data,setData]=useState([])
    const [BUModal,setBUModal] = useState(false)
    const [Refresh,setRefresh]=useState(false)
    const [AddModal, setAddModal] = useState(false)

    const navigate= useNavigate()

    const [name,setName] = useState('')
    const [status,setStatus] = useState('')
    const [id,setId]=useState('')
    const [page,setPage] =useState(1)
   const [count,setCount] = useState(0)
    const api=useAdminAxios()

     useEffect(()=>{
        try{
            const fetchCategories=async () =>{
                const response= await getCategories(api,page)
               
                if(response){
                    setData(response?.results)
                    setCount(Math.ceil(response?.count/5))
                
                }
            }
            fetchCategories()
        }catch(error){
          navigate('/admin/expired/');
        }
     },[Refresh,page])
     function StatusChange(id,name,status){
      setId(id)
      setName(name)
      setStatus(status)
      
    }
    const [active, setActive] = useState(1);
    
    
 
    const nextPage =()=>{
      if(active===count) return
      setPage(()=>page+1)
      setActive(()=>active+1)
    }
    const prevPage =()=>{
      if(active ===1) return
      setPage(()=>page-1)
      setActive(()=>active-1)
    }
    



  return (
    <div className='lg:mx-80 mx-0'>
 <div className='h-full px-20 pt-20 '>
    {AddModal ? <AddCategory setAddModal={setAddModal} Refresh={Refresh} setRefresh={setRefresh} /> : ''}

    {BUModal ? <DeleteCat setBUModal={setBUModal} name={name}  id={id} status={status}  setRefresh={setRefresh} Refresh={Refresh} /> : ''}
    <p className='text-center font-serif font-semibold sm:text:2xl text-3xl text-black'>Categories</p>
 
    
    
    <div className="flex justify-center">
      
      {data?.length === 0 ? <div className='w-full  text-center font-extrabold'>
        <p className='text-black'>No Records</p></div> :
      
          <div className="sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto max-h-screen">
            <table className=" min-w-full mt-2 text-left text-sm font-light border rounded border-black-300 ">
              <thead className="border-b font-medium bg-primary sticky top-0">
                <tr>
                  <th scope="col" className="text-btnColor px-6 py-4">Id</th>
                  <th scope="col" className="text-btnColor px-6 py-4">Category</th>
                  <th scope="col" className="text-btnColor px-6 py-4">  </th>
    
                </tr>
              </thead>
              <tbody>{data.map((item,index)=>{
        return(
    <tr className="border-b dark:border-neutral-500">
                      <td className="text-black whitespace-nowrap px-6 py-4 font-medium">{ index+1 }</td>
                      <td className="text-black whitespace-nowrap px-6 py-4">{item.name}</td>
                      { item?.status ? <td className="text-white whitespace-nowrap px-6 py-4">
                            <button onClick={() => {
                              setBUModal(!BUModal)
                              StatusChange(item.id,item.name,item.status)

                            }} className='bg-yellow-500 hover:bg-yellow-700  text-white font-bold py-1 px-3 rounded'>Enable</button>
                          </td>  :
                           <td className="text-white whitespace-nowrap px-6 py-4">
                           <button onClick={() => {
                             setBUModal(!BUModal)
                             StatusChange(item.id,item.name,item.status)

                           }} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded'>Disable</button>
                         </td>
                          }
                        
                    </tr>            )
              })}
    
                    
       
    
              </tbody>
            </table>
          </div>
          
       
        </div>
      </div>
      
    }
    
      </div>
     
      </div>
      <div className="flex justify-evenly my-3">
  <button  className={`justify-start  p-1 rounded-md ${active===1 ? 'cursor-not-allowed text-gray-500' : 'hover:underline font-semibold'}`} onClick={prevPage} disabled={active===1}>

  Previous
  </button>
 
   <p className='mt-1'>{active} out of {count}</p>
      <button className={`justify-start  p-1 rounded-md ${active===count ? 'cursor-not-allowed text-gray-500' : 'hover:underline font-semibold'}`} onClick={nextPage} disabled={active===count} >
      Next
    

      </button>
     
    </div>
      <div className='w-full flex justify-center'>
    <button 
        onClick={() => { setAddModal(!AddModal) }}  
        className='bg-btnColor hover:bg-newCoral hover:text-black text-white font-bold py-1 px-1 mb-1 mt-2 rounded'>
            Add Category
            </button>
            </div>
    </div>
   
  )
}

export default Category