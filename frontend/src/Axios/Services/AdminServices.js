
// get user list
export const getUsersList = async (api) => {
    try {

        const response = await api.get('users/', config)
        return response.data
    } catch (error) {

        throw error;
        
        
    }
}
// get user single
export const getSingleUser = async (api,id) => {
    try {
        
        const response = await api.get(`users/${id}/`, config)
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
export const getCategories = async (api) =>{
        try {
            
            const response = await api.get('categories/')
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
        console.log(response);
        return response.data
    }catch(error){
        throw error;
    }
}
// for getting payyment requests

export const getPaymentRequests = async (api) =>{
    try {
       
        const response = await api.get('payment_requests/')
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
export const getAllRecipes = async (api) =>{
    try {
        
        const response = await api.get('recipes/')
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