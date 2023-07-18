import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifyEmail } from '../Axios/Services/CommonServices/'
import { emailVerificationSchema } from '../Validations/otpValidation'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const OtpForm = () => {
    const navigate = useNavigate()
    const onSubmit = async () =>{
        const form = new FormData()
        form.append('email',values.email)
        form.append('otp',values.otp)
    
        try{
          const response = await VerifyEmail(form)
          if (response.status === 200){
            toast.success('Email Verification Successfull')
            navigate('/login')
          }else if (response.data === "Invalid email") {
            toast.error('Invalid Email')
          } else if (response.data === "Wrong OTP" ) {
            toast.error('You have entered wrong OTP,Please Check your email again!!')
          } else {
            toast.error('Something went wrong!')
          }
        }catch (error){
          console.log(error);
        }
    
      }
        // Formik working
        const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
        initialValues: {
            email: "",
            otp: "",
            

        },
        validationSchema: emailVerificationSchema,

        onSubmit,
        })

    return (
    <section className="bg-primary ">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="flex items-center mb-6 text-4xl font-semibold text-btnColor">
      Bon Appetit 
      </h1>
        
              
       
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight ml-[25%]  tracking-tight text-gray-900 md:text-2xl ">
                    Verify Email
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
               
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="Enter Your Email" 
                       />
                    </div>
                    <div>
                        <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 ">Enter Your OTP</label>
                        <input 
                        type='text' 
                        name="otp" 
                        value={values.otp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="otp" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="Enter the OTP" 
                       />
                        
                    </div>
                   
  
                    
  
                   
                    
                    <button 
                    type="submit" 
                    className="w-full text-white bg-btnColor hover:bg-newPeach hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >Verify
                    </button>
                    
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}

export default OtpForm