
// get user list
export const getUsersList = async (api,page) => {
    try {

        const response = await api.get(`users/?page=${page}` )
        return response.data
    } catch (error) {

        throw error;
        
        
    }
}
// get user single
export const getSingleUser = async (api,id) => {
    try {
        
        const response = await api.get(`users/${id}/`)
        return response.data
    } catch (error) {

        throw error;
        
        
    }
}
// Blocking and Unblocking users
export const handleUserStatus=async (api,values)=>{
    try {
       
        const response = await api.patch('users/',values)
        return response.data
    }
    catch (error){
        throw error;
    }
}
// Listing categories
export const getCategories = async (api,page) =>{
        try {
            
            const response = await api.get(`categories/?page=${page}`)
            return response.data
        }catch(error){
            throw error;
        }
}

// Deleting categories
export const delCategories = async (api,values) =>{
    try {
       
        const response = await api.patch('categories/',values)
        return response.data
    }catch(error){
        console.log(error);
    }
}
// Adding Categories
export const addCategories = async (api,values)=>{
    try{
        
        const response = await api.post('categories/',values)
        return response.data
    }catch(error){
        throw error;
    }
}
// for getting payyment requests

export const getPaymentRequests = async (api,page) =>{
    try {
       
        const response = await api.get(`payment_requests/?page=${page}`)
        return response.data
    }catch(error){
        throw error;
    }
}
//for handling payment status

export const handlePaymentRequests = async (api,values)=>{
    try{
        
        const response = await api.post('payment_requests/',values)
        console.log(response);
        return response.data
    }catch(error){
        throw error;
    }
}
// get all the recipes
export const getAllRecipes = async (api,page) =>{
    try {
        
        const response = await api.get(`recipes/?page=${page}`)
        return response.data
    }catch(error){
        throw error;
    }
}
// Blocking and Unblocking recipes
export const changeRecipeStatus=async (api,values)=>{
    try {
        
        const response = await api.patch('recipes/',values)
        return response.data
    }
    catch (error){
        throw error;
    }
}
// for graph and analytisc
export const getAnalytics = async (api) =>{
    try {
        
        const response = await api.get('analytics/')
        return response.data
    }catch(error){
        throw error;
    }
}