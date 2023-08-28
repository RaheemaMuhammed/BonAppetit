import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import RequestStatus from './RequestStatus';
import { getPaymentRequests } from '../../../Axios/Services/AdminServices'
import { toast } from 'react-toastify';
import useAdminAxios from '../../../Axios/Instances/useAdminAxios';
const SubTable = () => {
  const token =useSelector(state => state.AdminReducer.accessToken)
  const [Data,setData] =useState([])
  const [SModal,setSModal] = useState(false)
  const [Refresh,setRefresh]=useState(false)
  const [id,setId] = useState('')
  const [user,setUser] = useState('')
  const [amount,setAmount] =useState('')
  const [status,setStatus] = useState('')
  const [page,setPage] =useState(1)
   const [count,setCount] = useState(0)
    const api=useAdminAxios()

 useEffect(()=>{
  const fetchPayments = async () =>{
    try{
      const response = await getPaymentRequests(api,page)
      if(response){
        setData(response?.results);
        setCount(Math.ceil(response?.count/5))

      }
    }catch(error){
      console.log(error);
    }
  }
  fetchPayments()
 },[Refresh,page])

function stateChange(id,user,amount,status) {
  setId(id)
  setUser(user)
  setAmount(amount)
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
    <div className='h-full px-20 py-20'>
      {SModal ? <RequestStatus setSModal={setSModal} user={user}  id={id} amount={amount}  status={status} setRefresh={setRefresh} Refresh={Refresh} /> : ''}

    <p className='text-center font-serif font-semibold text-2xl text-black mb-5'>Payments</p>
          {/* {allData?.length !== 0 ?
            <div className='mb-3'>
              <SearchBar search={searchClients} />
            </div>
            : ''} */}
    
    
    
    <div className="  flex  flex-col overflow-x-auto ">
      {Data.length ===0 ?      <div className='w-full  text-center font-extrabold'><p className='text-black'>No Requests yet</p></div> 
 :<div className="sm:-mx-6 lg:-mx-8 ">
 <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
   <div className="w-full">
     <table className=" text-left text-sm font-light border rounded border-black-300">
       <thead className="border-b font-medium ">
         <tr>
           <th scope="col" className="text-btnColor px-6 py-4">Id</th>
           <th scope="col" className="text-btnColor px-6 py-4">User</th>
           <th scope="col" className="text-btnColor px-6 py-4">Amount</th>
           <th scope="col" className="text-btnColor px-6 py-4">UPI ID</th>
           <th scope="col" className="text-btnColor px-6 py-4">Status</th>
  

         </tr>
       </thead>
       <tbody>{Data.map((item,index)=>{
         return(
           <>
           
           <tr className="border-b dark:border-neutral-500">
               <td className="text-black whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
               <td className="text-black whitespace-nowrap px-6 py-4">{ item.username}</td>
               <td className="text-black whitespace-nowrap px-6 py-4">{item.amount}</td>
               <td className="text-black whitespace-nowrap px-6 py-4">{item.upi_id}</td>
               {item.status === 'Completed' || item.status === 'Cancelled' ?(item.status === 'Completed'? <td className="cursor-pointer text-lg font-medium whitespace-nowrap px-6 py-4 text-green-500" onClick={()=>toast.warning('You cannot update this status!!')}>{ item.status}</td>:
                <td className="cursor-pointer text-lg font-medium whitespace-nowrap px-6 py-4 text-red-600" onClick={()=>toast.warning('You cannot update this status!!')}>{ item.status}</td>):
               <td className="cursor-pointer whitespace-nowrap px-6 py-4 text-yellow-600 text-lg font-medium" onClick={()=>{
                setSModal(!SModal)
                stateChange(item.id,item.user,item.amount,item.status)
               }}>{ item.status}</td>
               }
               
             
             </tr>  
           </>
         )
       })}

       </tbody>
     </table>
   </div>
 </div>
</div>}
      
          
    
      </div>
      <div className="flex justify-evenly mt-3">
  <button  className={`justify-start  p-1 rounded-md ${active===1 ? 'cursor-not-allowed text-gray-500' : 'hover:underline font-semibold'}`} onClick={prevPage} disabled={active===1}>

  Previous
  </button>
 
   <p className='mt-1'>{active} out of {count}</p>
      <button className={`justify-start  p-1 rounded-md ${active===count ? 'cursor-not-allowed text-gray-500' : 'hover:underline font-semibold'}`} onClick={nextPage} disabled={active===count} >
      Next
    

      </button>
     
    </div>
      </div>
  )
}

export default SubTable