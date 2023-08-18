import React,{useEffect,useRef,useState} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registrationSchema } from '../Validations/registrationValidation'
import { useFormik } from 'formik';
import { Register } from '../Axios/Services/CommonServices'


function SignupForm() {
  const navigate = useNavigate()
  
  const onSubmit = async () =>{
    const form = new FormData()
    form.append('phone',values.phone)
    form.append('email',values.email)
    form.append('username',values.username)
    form.append('password',values.password)

    try{
      const response = await Register(form)
      if (response.status === 200){
        toast.success('Successfully Registered')
        navigate('/verify')
      }else if (response.error?.email && response.error.email[0] === "user with this email already exists.") {
        toast.error('This Email is Already Registered')
      } else if (response.error?.phone && response.error.phone[0] === "user with this phone already exists.") {
        toast.error('This Mobile is Already Registered')
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
      phone: "",
      email: "",
      username: "",
      password: "",
      

    },
    validationSchema: registrationSchema,
    onSubmit,
  })




  return (
    <section className="bg-primary h-screen ">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      {/* <h1 className="flex items-center mb-6 text-4xl font-semibold text-btnColor">
      Bon Appetit 
      </h1> */}
        
              
       
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight ml-[25%]  tracking-tight text-gray-900 md:text-2xl ">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
                        <input 
                        type="username" 
                        name="username" 
                        id="username" 
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="Enter Your Username" 
                        />
                        {errors.username && touched.username && (
              <p className="text-red-600">{errors.username}</p>
            )}
                    </div>
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
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your phone</label>
                        <input 
                        type="tel" 
                        name="phone" 
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="phone" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="Enter Your Phone Number" 
                       />
                        {errors.phone && touched.phone && (
                <p className="text-red-600">{errors.phone}</p>
              )}
                    </div>
                   
  
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        placeholder="Enter Your Password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  " 
                        />
                        {errors.password && touched.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
                    </div>
  
                   
                    
                    <button 
                    type="submit" 
                    className="w-full text-white bg-btnColor hover:bg-newPeach hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500 ">
                        Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline ">Login here</Link>
                        
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}

export default SignupForm