import React,{useEffect,useState} from 'react'

import Loader from '../Components/Loader'
import OtpForm from '../Components/otpForm'


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
    <OtpForm/>
    
    </> }
    </>
    )
}

export default VerifyOTP