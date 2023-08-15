import { axiosCommonInstance } from '../Instances/Instance';


// REgistration process

export const Register = async (values) => {
    try { 
        const config = {
            headers :{
                "Content-type" :"multipart/formdata"
            }
        }
        const response = await axiosCommonInstance.post('account/register/',values,config)
        return response.data
    }catch (error){
        console.log(error)
        console.log('some error occured')
    }
}


// Login

export const Login = async (values) =>{
    try {
        const config = {
            headers :{
                "Content-type":"application/json",
            }
        }
        const response = await axiosCommonInstance.post('account/login/',values,config)
        return response.data
    }catch (error){
        console.log(error)
        console.log('some error occured')
    }

}
// OTP Verification

export const VerifyEmail = async (values) =>{
    try {
        const config = {
            headers :{
                "Content-type":"application/json",
                
            }
        }
        const response = await axiosCommonInstance.post('account/verify/',values,config)
        return response.data
    }catch (error){
        console.log(error)
        console.log('some error occured')
    }

}
// Get recipes

export const getRecipes = async ()=>{
    try{
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }
        const response = await axiosCommonInstance.get('common/recipes/',config)
        return response.data

    }
    catch (error){
        console.log(error.message)
    }

}

export const getSingleRecipes = async (recipe_name)=>{
    try{
        const config = {
            headers:{
                "Content-type":"application/json"
            },
            params:{
                recipe_name:recipe_name
            },
        }
        const response = await axiosCommonInstance.get('common/single_recipe/',config)
        return response.data

    }
    catch (error){
        console.log(error.message)
    }

}

// Trending recipes
export const getTrending = async ()=>{
    try{
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }
        const response = await axiosCommonInstance.get('common/trending/',config)
        return response.data

    }
    catch (error){
        console.log(error.message)
    }

}
// latest recipes
export const getLatest= async ()=>{
    try{
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }
        const response = await axiosCommonInstance.get('common/latest/',config)
        return response.data

    }
    catch (error){
        console.log(error.message)
    }

}
// get comments
export const getSingleRecipeComents = async (recipe_id)=>{
    try{
        const config = {
            headers:{
                "Content-type":"application/json"
            },
            params:{
                recipe_id:recipe_id
            },
        }
        const response = await axiosCommonInstance.get('common/comments/',config)
        return response.data

    }
    catch (error){
        console.log(error.message)
    }

}