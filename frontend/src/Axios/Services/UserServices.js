import { axiosUserInstance } from '../Instances/Instance';

// getting recipes
export const getRecipes = async (token) =>{
    try{
        const config = {
            headers:{
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`,
            }
        }
        const response = await axiosUserInstance.get('user/recipes/',config)
        return response.data
    }catch (error){
        throw error
    }
}

// get single recipes
export const getSingleRecipes = async (token,recipe_name)=>{
    try{
        const config = {
            headers:{
                "Content-type":"application/json",
                Authorization : `Bearer ${token}`,
            },
            params:{
                recipe_name:recipe_name
            },
        }
        const response = await axiosUserInstance.get('user/single_recipe/',config)
        return response.data

    }
    catch (error){
        console.log(error.message)
    }

}


// add a recipe
export const addRecipe = async (token,values) =>{
    try{
        const config = {
            headers:{
                "Content-type" : "multipart/form-data",
                Authorization : `Bearer ${token}`,
            }
        }
        console.log(config);
        const response = await axiosUserInstance.post('user/recipes/',values,config)
        return response.data
    }catch (error){
        throw error;
    }
}
// get categories while upoading a recipe
export const getCategories=async (token)=>{

    try{
        const config = {
            headers:{
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`,
            }
        }
        const response = await axiosUserInstance.get('user/categories/',config)
        return response.data
    }catch (error){
        throw error;
    }
}

// Liking and disliking

export const handleLikeStatus=async (token,values)=>{
    try {
        const config = {
            headers :{
                "Content-type" : "application/json",
                Authorization:`Bearer ${token}`,
            },
            
        }
        const response = await axiosUserInstance.patch('user/like/',values,config)
        return response.data
    }
    catch (error){
        throw error;
    }
}
// get liked recipes

export const getLikedRecipes = async (token)=>{
    try{
        const config = {
            headers :{
                "Content-type" : "application/json",
                Authorization:`Bearer ${token}`,
            },
            
        }
        const response = await axiosUserInstance.get('user/like/',config)
        return response.data
    }catch(error){
        throw error;
    }
    
}
// saving and unsaving
export const handleSaveStatus=async (token,values)=>{
    try {
        const config = {
            headers :{
                "Content-type" : "application/json",
                Authorization:`Bearer ${token}`,
            },
            
        }
        const response = await axiosUserInstance.patch('user/saved_recipe/',values,config)
        return response.data
    }
    catch (error){
        throw error;
    }
}
// get saved recipes
export const getSavedRecipes = async (token)=>{
    try{
        const config = {
            headers :{
                "Content-type" : "application/json",
                Authorization:`Bearer ${token}`,
            },
            
        }
        const response = await axiosUserInstance.get('user/saved_recipe/',config)
        return response.data
    }catch(error){
        
        throw error;
    }
    
}
// get current user's recipes

export const getCurrentUserRecipes = async (token)=>{
    try{
        const config = {
            headers :{
                "Content-type" : "application/json",
                Authorization:`Bearer ${token}`,
            },
            
        }
        const response = await axiosUserInstance.get('user/user_recipe/',config)
        return response.data
    }catch(error){
        throw error;
    }
    
}
// editing a recipe 
export const handleRecipeStatus=async (token,values)=>{
    try {
        const config = {
            headers :{
                "Content-type" : "application/json",
                Authorization:`Bearer ${token}`,
            },
            
        }
        const response = await axiosUserInstance.patch('user/user_recipe/',values,config)
        return response.data
    }
    catch (error){
        throw error;
    }
}
//Deleting a recipe
export const deleteRecipe = async (token,id) =>{
    try {
        const config = {
            headers:{
                "Content-type": "application/json",
                 Authorization: `Bearer ${token}`,
            },params: {
                id: id,
            },
        }
        const response = await axiosUserInstance.delete('user/user_recipe/',config)
        return response.data
    }catch(error){
        throw error;
    }
}
// premium success
export const premiumPaymentSuccess = async(token,values)=>{
    try{
        const config = {
            headers:{
                "Content-type": "application/json",
                 Authorization: `Bearer ${token}`,
            }
        }
        const response = await axiosUserInstance.post('payment/payment_success/',values,config)
        console.log(response);
        return response.data
    }catch(error){
        throw error;
    }
}
// start premium 
export const premiumPayment = async(token,values)=>{
    try{
        const config = {
            headers:{
                "Content-type": "application/json",
                 Authorization: `Bearer ${token}`,
            }
        }
        const response = await axiosUserInstance.post('payment/payment_start/',values,config)
        return response.data
    }catch(error){
        throw error;
    }
}