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

        console.log(error)
        
        console.log('some error occured')
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
        console.log(error);
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
            console.log(error);
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
        console.log(error);
    }
}