import React, { useEffect, useState } from 'react'
import {GiWallet} from 'react-icons/gi'
import { getProfile, requestPayment } from '../../../Axios/Services/UserServices'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PayRequestModal from './PayRequestModal'
const Wallet = () => {
  
const [balance,setBalance] = useState('')
const [rModal,setRModal] = useState(false)
const [user,setUser] = useState('')
const [ refresh,setRefresh] =useState(false)
const [history,setHistory] = useState([])
const [requestSent, setRequestSent] = useState(false);


const navigate=useNavigate()
  const token =useSelector(state=>state.UserReducer.accessToken)
  
  useEffect(()=>{
    const getBalance = async ()=>{
      try{
        const response = await getProfile(token)
setBalance(response?.payload?.wallet)
setUser(response?.payload?.id)
setHistory(response?.payload?.transaction_history)


      }catch(error){
        navigate('/expired/')
      }
    }
    getBalance()

  },[balance])


  const lowBalance = () =>{
    toast.warn('Insufficient balance')
  }
 
  return (
    <>
    <div>
      
      { rModal ?<PayRequestModal setRModal={setRModal} Refresh={refresh} setRefresh={setRefresh} user={user} amount={balance} setRequestSent={setRequestSent} requestSent={requestSent}/> :''}


  <div className='mt-14 border rounded-md shadow-md mx-32 my-3'>
<p className='text-center mt-8 font-semibold text-3xl'>Your Wallet Balance</p>
<div className='my-8 h-20 flex flex-col items-center justify-center'>
<p className='text-center text-2xl font-bold'>₹{balance} </p>
<div className='bg-btnColor hover:bg-primary  rounded-md w-auto px-3 py-1 mt-3'>
{balance >=1 ?( requestSent ?<p className='text-white cursor-pointer hover:text-black text-center'onClick={()=>toast.warning('Your request has been sent,please wait for the transaction!')} >Requested</p>
  : <p className='text-white cursor-pointer hover:text-black text-center' onClick={()=>{setRModal(!rModal)}} >Redeem Now</p>)
:<p className='text-white cursor-pointer hover:text-black text-center'onClick={()=>lowBalance()} >Redeem Now</p>
    }
</div>
</div>

</div>

<div className='mt-8 border rounded-md shadow-md mx-32 my-3'>

<div>
      <p className='text-2xl mx-5 my-2'>Transaction History</p>
      <div className=" overflow-y-auto">
    <table className="w-full text-md text-left border mt-4 text-gray-500 dark:text-gray-400">
       
        <tbody>
          {Array.isArray(history) && history.map(item =>{
return(
<tr className="bg-white border-b ">
  {item.type === 'premium' ? <p className='my-4 mx-1 text-xl font-semibold text-gray-500'>Premium(Paid)</p>
              
               :<p className='my-4 mx-1 text-xl font-semibold text-gray-500'>Earning({item.status})</p>  }
               <p className='my-4 mx-1'>Transaction ID : {item.transaction_id}</p>
               <td>
                 <p>{item.time.split('T')[0]}</p>
                 {item.type === 'premium' ?<p  className='text-red-400'>-{item.amount}</p> :<p className='text-green-400'>+{item.amount}</p>}
                 
               </td>
                
              
                </tr>
)
          }
       
            
          )}
            
            
            
        </tbody>
    </table>
</div>

    </div>
</div>
</div>
    
   
    </>
    

  )
}

export default Wallet