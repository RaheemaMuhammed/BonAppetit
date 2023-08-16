import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import RequestStatus from './RequestStatus';
import { getPaymentRequests } from '../../../Axios/Services/AdminServices'
import { toast } from 'react-toastify';
import useAxios from '../../../Axios/Instances/useAxios';

const SubTable = () => {
  const token =useSelector(state => state.AdminReducer.accessToken)
  const [Data,setData] =useState([])
  const [SModal,setSModal] = useState(false)
  const [Refresh,setRefresh]=useState(false)
  const [id,setId] = useState('')
  const [user,setUser] = useState('')
  const [amount,setAmount] =useState('')
  const [status,setStatus] = useState('')
const api=useAxios()

 useEffect(()=>{
  const fetchPayments = async () =>{
    try{
      const response = await getPaymentRequests(api)
      if(response){
        setData(response?.payload);

console.log(response);
      }
    }catch(error){
      console.log(error);
    }
  }
  fetchPayments()
 },[Refresh])

function stateChange(id,user,amount,status) {
  setId(id)
  setUser(user)
  setAmount(amount)
  setStatus(status)
  
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
    
    
    
    <div className="  flex  flex-col  ">
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
     
      </div>
  )
}

export default SubTable