import React,{useState,useEffect} from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Admin/Sidebar'
import Footer from '../../Components/Footer'
import UserTable from '../../Components/Admin/UserList/UserTable'
import Loader from '../../Components/Loader'


const UserList = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 500);
  }, [])
  return (
    <div>
      { loader ? <Loader/> : <><Header/>
      <div className='block md:flex justify-normal'>
  <div className='md:w-[20%] w-[100%]'>
    <Sidebar />
  </div>
  <div className='w-full'>
    <UserTable />
  </div>
</div>

<Footer/>
      </>}



    </div>
  )
}

export default UserList