import React,{useEffect,useState} from 'react'

import Loader from '../Components/Loader'
import VerifyOTPForm from '../Components/VerifyOTPForm'

const VerifyOTP = () => {
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
    <VerifyOTPForm/>
    
    </> }
    </>
    )
}

export default VerifyOTP