import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Loader from '../Components/Loader'
import Banner from '../Components/Banner'
import { useSelector } from 'react-redux'
import Search from '../Components/User/Search'
import RecipeCards from '../Components/RecipeCards'
import Latest from '../Components/Latest'
import Trending from '../Components/Trending'
const Home = () => {
  const [loader, setLoader] = useState(true)
  const [filter,setFilter] = useState(false)
  const [search,setSearch] =useState(false)
  
  const user = useSelector(state => state.UserReducer.user)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 500);
  }, [])
  return (
   <>
   {loader ? <Loader/> : <>
   { user ? <Search setSearch={setSearch} search={search} /> :  <Banner/>}
    
   {user && filter ?<RecipeCards setFilter={setFilter} filter = {filter}/> :
   <>
   <Trending setFilter={setFilter} filter = {filter}/>
   <Latest/> 
   </>}
   
   
   
   </> }
   
   </>
  )
}

export default Home