import React,{useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { getUsersList } from '../../../Axios/Services/AdminServices'
import BlockUnblock from './BlockUnblock';
const UserTable = () => {

  const [Data,setData] =useState([])
  const [allData,setAllData] =useState([])
  const [Refresh,setRefresh]=useState(false)
  const token =useSelector(state => state.AdminReducer.accessToken)
  const [status,setStatus] = useState('')
  const [username,setUsername] = useState('')
  const [id,setId]=useState('')
  const [BUModal,setBUModal] = useState(false)
  



    useEffect(() =>{
      console.log(token);
      try{
        const fetchUsers= async () =>{
          const response = await getUsersList(token)
          if (response){ 
            setData(response?.payload)
            setAllData(response?.payload)

          }
        }
        fetchUsers()
      }catch(error){
        if (error.response && error.response.status === 401){
          console.log('pinjallaahhh');
        }
        console.log(error);
      }
    },[Refresh])


    function StatusChange(id,status,username){
      setUsername(username)
      setStatus(status)
      setId(id)
    }



  return (
<div className='h-full px-20 py-20'>
{BUModal ? <BlockUnblock setBUModal={setBUModal} username={username} status={status} id={id} setRefresh={setRefresh} Refresh={Refresh} /> : ''}
<p className='text-center font-serif font-semibold text-2xl text-black'>Users</p>
      {/* {allData?.length !== 0 ?
        <div className='mb-3'>
          <SearchBar search={searchClients} />
        </div>
        : ''} */}



<div className="  flex  flex-col overflow-x-auto ">
  
  {Data?.length === 0 ? <div className='w-full  text-center font-extrabold'><p className='text-white'>No Records</p></div> :
  
      <div className="sm:-mx-6 lg:-mx-8 ">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light border rounded border-black-300">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="text-btnColor px-6 py-4">Id</th>
              <th scope="col" className="text-btnColor px-6 py-4">Username</th>
              <th scope="col" className="text-btnColor px-6 py-4">Email</th>
              <th scope="col" className="text-btnColor px-6 py-4">Mobile</th>
              <th scope="col" className="text-btnColor px-6 py-4">Plan</th>
              <th scope="col" className="text-btnColor px-6 py-4">is_active</th>
              <th scope="col" className="text-btnColor px-6 py-4">Status</th>

            </tr>
          </thead>
          <tbody>{Data.map((item,index)=>{

    const hasPremiumString = item.has_premium ? "Premium" : "Basic";
    const isActiveString = item.is_active ? "Active" : "Inactive";           
    
    
    return(
<tr className="border-b dark:border-neutral-500">
                  <td className="text-black whitespace-nowrap px-6 py-4 font-medium">{ index+1 }</td>
                  <td className="text-black whitespace-nowrap px-6 py-4">{item.username}</td>
                  <td className="text-black whitespace-nowrap px-6 py-4">{item.email}</td>
                  <td className="text-black whitespace-nowrap px-6 py-4">{item.phone}</td>
                  <td className="text-black whitespace-nowrap px-6 py-4">{hasPremiumString}{hasPremiumString ==='Premium' && (item.expiry) }</td>
                  <td className="text-black whitespace-nowrap px-6 py-4">{isActiveString}</td>
                          {item.status ? <td className="text-white whitespace-nowrap px-6 py-4">
                            <button onClick={() => {
                              StatusChange(item.id, item.status, item.username)
                              setBUModal(!BUModal)

                            }} className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>Unblock</button>
                          </td> : <td className="text-white whitespace-nowrap px-6 py-4">
                            <button onClick={() => {
                              StatusChange(item.id, item.status, item.username)
                              setBUModal(!BUModal)

                            }} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Block</button>
                          </td>}





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
  )
}

export default UserTable