import React,{useEffect} from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Sidebar from '../../Components/Admin/Sidebar'
import Graphs from '../../Components/Admin/Dashboard/Graphs'
import Loader from '../../Components/Loader'
import { useState } from 'react'

const Dashboard = () => {
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 500);
  }, [])
  return (
    <div>
      { loader ? <Loader/> : 
      <>
      <div className='block  md:flex'>
      <Sidebar/>
      <Graphs/>
      </div>
      
      </>
      }



    </div>
  )
}

export default Dashboard