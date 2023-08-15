import {Fragment,useEffect,useRef,useState} from 'react'
import { Dialog,Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'


import { toast } from 'react-toastify'
import { addRecipe, getCategories } from '../../../Axios/Services/UserServices'
import { AddRecipeSchema } from '../../../Validations/recipeValidation'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../../Axios/Instances/useAxios'
const AddRecipeModal = ({setAddModal,Refresh,setRefresh}) => {
    const navigate=useNavigate()
    const cancelButtonRef = useRef(null)
    const [cat,setCat] = useState([])
    const [open,setOpen] =useState(true)
    const token = useSelector(state=>state.UserReducer.accessToken)
    const username=useSelector(state=>state.UserReducer.user.username)
    const [isPrivate, setIsPrivate] = useState(false);
    const premium= useSelector(state=>state.UserReducer.premium)
    const api =useAxios()

    useEffect(()=>{
        
        
            const fetchCategories =async ()=>{
                try{
                const response = await getCategories(api)
                if(response){
                    setCat(response?.payload)
                }
            }catch(error){
           
            navigate('/expired/')
        }
    }
    fetchCategories()
    },[])
    



    const onSubmit= async()=>{
        const form =new FormData()
        
        form.append('recipe_name',values.recipe_name)
        form.append('instructions',values.instructions)
        form.append('ingredients',values.ingredients)
        form.append('author',username)
        form.append('category',values.category)
        form.append('is_private',isPrivate)
        form.append('picture',values.picture)
       
        try{
           
            const response = await addRecipe(api,form)
            if(response.status===200){
                setAddModal(false)
                setRefresh(!Refresh)
                toast.success(response.message)
            }else if (response.status===300){
                toast.warning('Invalid Data')
            }else{
                toast.error('Something went wrong')
            }
        }catch(error){
            console.log(error);
        }
    }
    const handleCheckboxChange = () => {
        setIsPrivate(!isPrivate);
       
      };
    const {values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues:{
            recipe_name:"",
            instructions:"",
            ingredients:"",
            author:username,
            category:"",
            is_private:isPrivate,
            picture:""
        },
        validationSchema:AddRecipeSchema,
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

                    <div className="fixed inset-0 z-[5] overflow-y-auto z-">
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
                                    setAddModal(false)
                                }} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <p className='font-extrabold text-2xl'>Add New recipe</p>
                                        <form className="space-y-4 md:space-y-6"   onSubmit={handleSubmit} encType="multipart/form-data">
            
                                            <div>
                                                <label htmlFor="recipe_name" className="block mb-2 text-sm font-medium text-black ">Enter Recipe name</label>
                                                <input type="text" name="recipe_name"  
                                                value={values.recipe_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur} id="recipe_name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Recipe name goes here!" />
                                                {errors.recipe_name && touched.recipe_name && (
                                                    <p className="text-red-600">{errors.recipe_name}</p>
                                                  )}


                                            </div>
                                            <div>
                                                <label htmlFor="category"className='mr-2 mb-2 text-sm font-medium text-gray-90'>Category:</label>
                                                <select
                                                    id="category"
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1'
                                                >
                                                    <option >Select a category</option>
                                                    {cat.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                    ))}
                                                     {errors.category && touched.category && (
                                                    <p className="text-red-600">{errors.category}</p>
                                                  )}
                                                </select >
                                                </div>
                                      
                                            <div>
                                                <label htmlFor="ingredients" className="block mb-2 text-sm font-medium text-black">ingredients</label>
                                                <textarea type="text" name="ingredients" 
                                                 id="ingredients"
                                                 value={values.ingredients}
                                                 onChange={handleChange}
                                                 onBlur={handleBlur}
                                                placeholder="Eg:onion-250gm,oil-2tsp" className="bg-gray-50 border border-gray-300  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                                                {errors.ingredients && touched.ingredients && (
                                                    <p className="text-red-600">{errors.ingredients}</p>
                                                  )}

                                            </div>
                                            <div>
                                                <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-black">instructions</label>
                                                <textarea type="text" name="instructions"
                                                value={values.instructions}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                id="instructions"
                                                placeholder="Instructions goes here" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                {errors.instructions && touched.instructions && (
                                                    <p className="text-red-600">{errors.instructions}</p>
                                                  )}


                                            </div>
                                           {premium ? <><div>
                                            <label htmlFor="is_private">
                                            <input
                                                type="checkbox"
                                                id="is_private"
                                                name="is_private"
                                                checked={isPrivate}
                                                onClick={handleCheckboxChange}
                                            />
                                            Private
                                            </label>
                                        </div></> : ''}
                                            
                                            <div>
                                            <input
                                            onChange={(evt)=>setFieldValue('picture',evt.target.files[0])}
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="user_avatar_help"
                                            name="picture"
                                            id="picture"
                                            type="file"
                                            required
                                          ></input>
                                          <p className="text-gray-400">Upload image of size Smaller than <b>2.5MB</b></p>
                        
                                            </div>
                                        

                                            <button onClick={()=>console.log(values.recipe_name,values.author,values.category)} type="submit" className="w-full text-black bg-btnColor hover:bg-newCoral focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>

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

export default AddRecipeModal