import {Fragment,useRef,useState} from 'react'
import { Dialog,Transition} from '@headlessui/react'
import { changeRecipeStatus } from '../../../Axios/Services/AdminServices'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAdminAxios from '../../../Axios/Instances/useAdminAxios'
const StatusChange = ({setBRModal,name,status,id,setRefresh,Refresh}) => {
    const navigate=useNavigate()
    const cancelButtonRef=useRef(null)
    const [open,setOpen] = useState(true)

    const token = useSelector(state=>state.AdminReducer.accessToken)
const api=useAdminAxios()
    const BlockAndUnblock = async(id,status)=>{
        try{
            const data = {
                id:id,
                status:status
            }
            const response= await changeRecipeStatus(api,data)
            setRefresh(!Refresh)
            toast.success(response?.message)
        }
        catch(error){
            console.log(error);
            navigate('/admin/expired/');
        }
    }
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
                                                setBRModal(false)
                                            }}  type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-6 text-center">
                                                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                { status ?  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure want to Unblock {name}?</h3> : <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure want to Block {name}?</h3> }
                                               
                                                <button  onClick={()=>{
                                                    BlockAndUnblock(id,status)
                                                    setBRModal(false)
                                                }} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Yes, I'm sure
                                                </button>
                                                <button  onClick={()=>{
                                                    setBRModal(false)
                                                }}  data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
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

export default StatusChange