import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Loader from '../Components/Loader'
import Banner from '../Components/Banner'
import { useSelector } from 'react-redux'
import Search from '../Components/User/Search'
import RecipeCards from '../Components/User/Recipe/RecipeCards'
const Home = () => {
  const [loader, setLoader] = useState(true)
  
  const user = useSelector(state => state.UserReducer.user)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 500);
  }, [])
  return (
   <>
   {loader ? <Loader/> : <>
   <Header/>
   { user ? <Search/> :  <Banner/>}
   <RecipeCards/>
   <Footer/>
   </> }
   
   </>
  )
}

export default Home