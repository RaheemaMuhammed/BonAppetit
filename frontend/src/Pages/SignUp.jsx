import React,{useEffect,useState} from 'react'

import Loader from '../Components/Loader'
import SignupForm from '../Components/SignupForm'



function SignUp() {
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
  <SignupForm/>
  
  </> }
  </>
  )
}

export default SignUp