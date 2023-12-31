import {Fragment,useEffect,useRef,useState} from 'react'
import { Dialog,Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { UPISchema } from '../../../Validations/upiValidation'
import { UserPaymentRequest } from '../../../Redux/UserSlice'
import { requestPayment } from '../../../Axios/Services/UserServices'


import { useNavigate } from 'react-router-dom'
import useAxios from '../../../Axios/Instances/useAxios'
const PayRequestModal = ({setRModal,Refresh,setRefresh,user,amount,requestSent,setRequestSent}) => {
    const api=useAxios()
    const cancelButtonRef = useRef(null)
    const [upi_id,setUPIID] = useState('')
    const [open,setOpen] =useState(true)
    const token = useSelector(state=>state.UserReducer.accessToken)
    const username=useSelector(state=>state.UserReducer.user.username)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onSubmit= async()=>{
        const form =new FormData()
        form.append('user',user)
        form.append('amount',amount)
        form.append('upi_id',values.upi_id)
       
       console.log(form);
        try{
            const response = await requestPayment(api,form)
            if(response.status===200){
                setRModal(false)
                setRefresh(!Refresh)
                setRequestSent(!requestSent)
                dispatch(UserPaymentRequest())
                toast.success(response.message)
            }else if (response.status===400){
                toast.warning('Invalid Data')
            }else{
                toast.error('Something went wrong')
            }
        }catch(error){
            console.log(error);
        }
    }
  
    const {values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues:{
            user:"",
         amount:"",
         upi_id:""
        },
        validationSchema: UPISchema ,
        onSubmit,
    })
    

  return (
    <>
    
    <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <button onClick={()=>{
                                    setRModal(false)
                                }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <p className='font-extrabold text-2xl'>Request for Payment</p>
                                        <form className="space-y-4 md:space-y-6"   onSubmit={handleSubmit} encType="multipart/form-data">
            
                                            <div>
                                                <label htmlFor="upi_id" className="block mb-2 text-sm font-medium text-black ">Enter Your UPI ID</label>
                                                <input type="text" name="upi_id"  
                                                value={values.upi_id}
                                                onChange={handleChange}
                                                onBlur={handleBlur} id="upi_id"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                                               
                                               {errors.upi_id && touched.upi_id && (
                                                    <p className="text-red-600">{errors.upi_id}</p>
                                                  )}
                                            </div>
                                            
                                      
                                      
                                            
                                        

                                            <button onClick={()=>console.log(values.upi_id,values.user,values.amount)} type="submit" className="w-full text-black bg-btnColor hover:bg-newCoral focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>

                                            <div className="flex items-center justify-between">



                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

    
    </>
  )
}

export default PayRequestModal


