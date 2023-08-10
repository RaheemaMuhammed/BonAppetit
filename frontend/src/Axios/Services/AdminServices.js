import { axiosAdminInstance } from "../Instances/Instance";

// get user list
export const getUsersList = async (token) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,

            },

        }
        const response = await axiosAdminInstance.get('users/', config)
        return response.data
    } catch (error) {

        throw error;
        
        
    }
}
// get user single
export const getSingleUser = async (token,id) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,

            }
        }
        const response = await axiosAdminInstance.get(`users/${id}/`, config)
        return response.data
    } catch (error) {

        throw error;
        
        
    }
}
// Blocking and Unblocking users
export const handleUserStatus=async (token,values)=>{
    try {
        const config = {
            headers :{
                "Content-type" : "application/json",
                Authorization:`Bearer ${token}`,
            }
        }
        const response = await axiosAdminInstance.patch('users/',values,config)
        return response.data
    }
    catch (error){
        throw error;
    }
}
// Listing categories
export const getCategories = async (token) =>{
        try {
            const config = {
                headers:{
                    "Content-type": "application/json",
                     Authorization: `Bearer ${token}`,
                },
            }
            const response = await axiosAdminInstance.get('categories/',config)
            return response.data
        }catch(error){
            throw error;
        }
}

// Deleting categories
export const delCategories = async (token,values) =>{
    try {
        const config = {
            headers:{
                "Content-type": "application/json",
                 Authorization: `Bearer ${token}`,
            }
        }
        const response = await axiosAdminInstance.patch('categories/',values,config)
        return response.data
    }catch(error){
        console.log(error);
    }
}
// Adding Categories
export const addCategories = async (token,values)=>{
    try{
        const config = {
            headers:{
                "Content-type": "application/json",
                 Authorization: `Bearer ${token}`,
            }
        }
        const response = await axiosAdminInstance.post('categories/',values,config)
        console.log(response);
        return response.data
    }catch(error){
        throw error;
    }
}
// for getting payyment requests

export const getPaymentRequests = async (token) =>{
    try {
        const config = {
            headers:{
                "Content-type": "application/json",
                 Authorization: `Bearer ${token}`,
            },
        }
        const response = await axiosAdminInstance.get('payment_requests/',config)
        return response.data
    }catch(error){
        throw error;
    }
}
//for handling payment status

export const handlePaymentRequests = async (token,values)=>{
    try{
        const config = {
            headers:{
                "Content-type": "application/json",
                 Authorization: `Bearer ${token}`,
            }
        }
        const response = await axiosAdminInstance.post('payment_requests/',values,config)
        console.log(response);
        return response.data
    }catch(error){
        throw error;
    }
}
// get all the recipes
export const getAllRecipes = async (token) =>{
    try {
        const config = {
            headers:{
                "Content-type": "application/json",
                 Authorization: `Bearer ${token}`,
            },
        }
        const response = await axiosAdminInstance.get('recipes/',config)
        return response.data
    }catch(error){
        throw error;
    }
}
// Blocking and Unblocking recipes
export const changeRecipeStatus=async (token,values)=>{
    try {
        const config = {
            headers :{
                "Content-type" : "application/json",
                Authorization:`Bearer ${token}`,
            }
        }
        const response = await axiosAdminInstance.patch('recipes/',values,config)
        return response.data
    }
    catch (error){
        throw error;
    }
}