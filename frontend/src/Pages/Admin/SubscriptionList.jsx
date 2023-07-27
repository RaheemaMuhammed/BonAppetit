

import React,{useEffect} from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Sidebar from '../../Components/Admin/Sidebar'
import Loader from '../../Components/Loader'
import { useState } from 'react'
import SubTable from '../../Components/Admin/Subscription/SubTable'
const SubscriptionList = () => {

    const [loader, setLoader] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        setLoader(false)
      }, 500);
    }, [])

  return (
    <div>
      { loader ? <Loader/> : 
      <><Header/>
      <div className='block  md:flex'>
      <Sidebar/>
      <div className='justify-center '>
<SubTable/>
      </div>
      

      </div>
      <Footer/></>
      }



    </div>
  )
}

export default SubscriptionList



