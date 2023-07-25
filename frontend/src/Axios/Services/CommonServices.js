import { axiosUserInstance } from '../Instances/Instance';


// REgistration process

export const Register = async (values) => {
    try { 
        const config = {
            headers :{
                "Content-type" :"multipart/formdata"
            }
        }
        const response = await axiosUserInstance.post('account/register/',values,config)
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
        const response = await axiosUserInstance.post('account/login/',values,config)
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
        const response = await axiosUserInstance.post('account/verify/',values,config)
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
        const response = await axiosUserInstance.get('common/recipes/',config)
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
        const response = await axiosUserInstance.get('common/single_recipe/',config)
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
        const response = await axiosUserInstance.get('common/trending/',config)
        return response.data

    }
    catch (error){
        console.log(error.message)
    }

}
// Trending recipes
export const getLatest= async ()=>{
    try{
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }
        const response = await axiosUserInstance.get('common/latest/',config)
        return response.data

    }
    catch (error){
        console.log(error.message)
    }

}