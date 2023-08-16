

import React,{useEffect,useState} from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import SearchResults from '../../Components/User/SearchResults'
import Loader from '../../Components/Loader'
import Search from '../../Components/User/Search'
const SearchPage = () => {
  const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
          setLoader(false)
        }, 500);
      }, [])
  return (
    <>
    {loader ? <Loader/> :
    <>
<Search/>
    <SearchResults />
    
    </>
    }
    </>

    
  )
}

export default SearchPage