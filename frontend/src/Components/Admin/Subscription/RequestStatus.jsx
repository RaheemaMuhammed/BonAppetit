
import { Fragment,  useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handlePaymentRequests } from "../../../Axios/Services/AdminServices";

const RequestStatus = ({setSModal,Refresh,setRefresh, user,  id, amount,status}) => {
    const cancelButtonRef = useRef(null)
    const [ open,setOpen] = useState(true)
    const token=useSelector(state=>state.AdminReducer.accessToken)
    const navigate= useNavigate()
    const onSubmit = async() =>{
        const form =new FormData()
        form.append('user',user)
        form.append('amount',amount)
        form.append('id',id)
        form.append('status',values.status)

        
        try{
            const response =await handlePaymentRequests(token,form)
            if(response.status === 200){
                setSModal(false)
                setRefresh(!Refresh)
                toast.success(response.message)
            }else if(response.status===400){
                toast.error(response.error)
            } else{
                toast.error('something went wrong')
            }
        }catch(error){
            navigate('/admin/expired/');
        }
    }

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues:{
            user:"",
            id:"",
            amount:"",
            status:status
            
        },
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
                                    setSModal(false)
                                }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <p className='font-extrabold text-2xl text-center'>Update Status</p>
                                        <form className="space-y-4 md:space-y-6" action="#"  onSubmit={handleSubmit} encType="multipart/form-data">
                                            <div>
                                                
                                                

                                                <div class="flex items-center mb-4">
                                               <input id="Completed"
                                                type="radio"
                                                value="Completed"
                                                checked={values.status === "Completed"}
                                                onChange={handleChange}
                                                onBlur={handleBlur} 
                                                 name="status" 
                                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                                                 />
                                               <label htmlFor="Completed" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</label>
                                                </div>
                                                <div className="flex items-center">
                                                <input 
                                                id="Cancelled" 
                                                type="radio" 
                                                value="Cancelled"
                                                 onChange={handleChange}
                                                  onBlur={handleBlur} 
                                                  name="status"
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "/>
                                                    <label htmlFor="Cancelled" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cancelled</label>
                                                </div>


                                            </div>
                                         
                                         
                                           

                                            <button  type="submit" className="w-full text-black bg-btnColor hover:bg-newCoral focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Add</button>

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

export default RequestStatus