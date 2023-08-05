import {Fragment,useRef,useState} from 'react'
import { Dialog,Transition} from '@headlessui/react'
import { reportingRecipe } from '../../../Axios/Services/UserServices'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'


const ReportRecipeModal = ({setreportModal,setRefresh,id,Refresh,reported_item,recipe_name}) => {
    const cancelButtonRef=useRef(null)
    const [open,setOpen] = useState(true)
    const token = useSelector(state=>state.UserReducer.accessToken)
    const navigate=useNavigate()
   
    const cat = [
        { id: 'inappropriate', name: 'Inappropriate' },
        { id: 'spam', name: 'Spam' },
        { id: 'copied', name: 'Copied' },
        { id: 'other', name: 'Other' }
      ];
          const onSubmit= async()=>{
        const form =new FormData()
        
        form.append('reported_item',reported_item)
        form.append('report_type',values.report_type)
        if(values.reason){
            form.append('reason',values.reason)
        }
        
       
        try{
            
            const response = await reportingRecipe(token,form)
            if(response.status===200){
                setreportModal(false)
                setRefresh(!Refresh)
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
            reported_item:"",
            report_type:"",
            reason:""
            
        },
        
        onSubmit,
    })
    return (
        <>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div'
            className='relative z-10'
            initialFocus={cancelButtonRef}
            onClose={setOpen}>
                <Transition.Child as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
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
                                        <div className="relative w-full max-h-full">
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <button onClick={()=>{
                                                    setreportModal(false)
                                                }}  type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                    <span className="sr-only">Close modal</span>
                                                </button>
                                                <div className="p-6 text-center">
                                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Report {recipe_name} </h3>
                                                    <form className="space-y-4 md:space-y-6"   onSubmit={handleSubmit} encType="multipart/form-data">
            
            
            <div>
                <label htmlFor="report_type"className='mr-2 mb-2 text-sm font-medium text-gray-90'>Why are you reporting this:</label>
                <select
                    id="report_type"
                    name="report_type"
                    value={values.report_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1'
                >
                    <option >Select a report_type</option>
                    {cat.map((report_type) => (
                    <option key={report_type.id} value={report_type.id}>
                        {report_type.name}
                    </option>
                    ))}
                     
                </select >
            </div>
      
          
            <div>
                <label htmlFor="reason" className="block mb-2 text-sm font-medium text-black">Description(optional)</label>
                <textarea type="text" name="reason"
                value={values.reason}
                onChange={handleChange}
                onBlur={handleBlur}
                id="reason"
                placeholder="reason goes here" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                


            </div>
           
            
            
        

            <button type="submit" className="w-full text-black bg-btnColor hover:bg-newCoral focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>

            <div className="flex items-center justify-between">



            </div>
                                                    {/* <button type="submit" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                        Report
                                                    </button> */}
        </form>
                                                    <button  onClick={()=>{
                                                        setreportModal(false)
                                                    }}  data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">No, cancel</button>
                                                </div>
                                            </div>
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

export default ReportRecipeModal



   


 


