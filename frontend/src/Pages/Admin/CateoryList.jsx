import React,{useEffect} from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Sidebar from '../../Components/Admin/Sidebar'
import Loader from '../../Components/Loader'
import { useState } from 'react'
import Category from '../../Components/Admin/Categories/Category'
import AddCategory from '../../Components/Admin/Categories/AddCategory'
const CateoryList = () => {

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
      <Category/>
      </div>
      

      </div>
      <Footer/></>
      }



    </div>
  )
}

export default CateoryList



