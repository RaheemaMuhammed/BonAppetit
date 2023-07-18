import React,{useEffect,useState}  from 'react'
import Loader from '../Components/Loader'
import LoginForm from '../Components/LoginForm'



function LogIn() {
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
  <LoginForm/>
  
  </> }
  </>
  )
}

export default LogIn