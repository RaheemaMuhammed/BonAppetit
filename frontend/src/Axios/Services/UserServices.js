

// get single recipes
export const getSingleRecipes = async (api,recipe_name)=>{
    try{
        const config = {
           
            params:{
                recipe_name:recipe_name
            },
        }
        const response = await api.get('user/single_recipe/',config)
        return response.data
        
    }
    catch (error){
        console.log(error.message)
    }
    
}


// add a recipe
export const addRecipe = async (api,values) =>{
    
    try{
       
            const response = await api.post('user/recipes/',values)
            return response.data
        }catch (error){
            throw error;
        }
    }
    // get categories while upoading a recipe
export const getCategories=async (api)=>{
        
        try{
            const response = await api.get('user/categories/')
            return response.data
        }catch (error){
            throw error;
        }
    }
    
    // Liking and disliking
    
    export const handleLikeStatus=async (api,values)=>{
        try {
            
            
                const response = await api.patch('user/like/',values)
                return response.data
            }
            catch (error){
                throw error;
            }
        }
        // get liked recipes
        
        export const getLikedRecipes = async (api)=>{
            
            try{
                
                    const response = await api.get('user/like/')
                    return response.data
                }catch(error){
                    throw error;
                }
                
            }
            // saving and unsaving
            export const handleSaveStatus=async (api,values)=>{
                try {
                   
                        const response = await api.patch('user/saved_recipe/',values)
                        return response.data
                    }
                    catch (error){
                        throw error;
                    }
                }
                // get saved recipes
        export const getSavedRecipes = async (api)=>{
            try{
                
                const response = await api.get('user/saved_recipe/')
                return response.data
            }catch(error){
                
                throw error;
            }
    
}
// get current user's recipes

export const getCurrentUserRecipes = async (api)=>{
    try{
        const response = await api.get('user/user_recipe/')
        return response.data
    }catch(error){
        throw error;
    }
    
}
// editing a recipe 
export const handleRecipeStatus=async (api,values)=>{
    
    try {
        
        const response = await api.patch('user/user_recipe/',values)
        return response.data
    }
    catch (error){
        throw error;
    }
}
//Deleting a recipe
export const deleteRecipe = async (api,id) =>{
    try {
        const config = {
           
            params: {
                id: id,
            },
        }
        const response = await api.delete('user/user_recipe/',config)
        return response.data
    }catch(error){
        throw error;
    }
}
// premium success
export const premiumPaymentSuccess = async(api,values)=>{
    try{
       
        const response = await api.post('payment/payment_success/',values)
       
        return response.data
    }catch(error){
        throw error;
    }
}
// start premium 
export const premiumPayment = async(api,values)=>{
    try{
     
        const response = await api.post('payment/payment_start/',values)
        return response.data
    }catch(error){
        throw error;
    }
}
// get user profile details

export const getProfile = async (api)=>{
    try{
        const response = await api.get('user/user_profile/')
        return response.data
    }catch(error){
        throw error;
    }
    
}
// edit user profile
export const updateUserProfile=async (api,values)=>{
    try {
      
        const response = await api.patch('user/user_profile/',values)
        return response.data
    }
    catch (error){
        throw error;
    }
}
// payment request
export const requestPayment = async(api,values)=>{
    console.log(values);
    try{
        
        const response = await api.post('payment/payment_request/',values)
        return response.data
    }catch(error){
        throw error;
    }
}
// post a comment
export const postingComment = async(api,values)=>{
    
    try{
        
        const response = await api.post('user/comments/',values)
        return response.data
    }catch(error){
        throw error;
    }
}
// delete a commnt
export const deleteComment = async (api,id) =>{
    try {
        const config = {
           params: {
                id: id,
            },
        }
        const response = await api.delete('user/comments/',config)
        return response.data
    }catch(error){
        throw error;
    }
}
// get user notifoications

export const getNotificactions = async (api)=>{
    try{
        
        const response = await api.get('user/notification/')
        return response.data
    }catch(error){
       throw error; 
    }
    
}
// notificatio staTUES read or not
export const handleNotiStatus=async (api,values)=>{
    try {
       
        const response = await api.patch('user/notification/',values)
        return response.data
    }
    catch (error){
        throw error;
    }
}
// handle report status
export const reportingRecipe = async(api,values)=>{
    console.log(values);
    try{
       
        const response = await api.post('user/report/',values)
        return response.data
    }catch(error){
        throw error;
    }
}
// to track recipe view
export const handleView = async(api,values)=>{
   
    try{
       
        const response = await api.post('user/track_view/',values)
        return response.data
    }catch(error){
        throw error;
    }
}

export const getSearchSuggestions = async (api,term)=>{
    try{
        const config = {
           
            params:{
                term:term
            },
        }
        const response = await api.get('user/suggestions/',config)
        return response.data

    }
    catch (error){
        throw error
    }

}

export const getSearchResults = async (api,query)=>{
    try{
        const config = {
            
            params:{
                query:query
            },
        }
        const response = await api.get('user/search/',config)
        return response.data

    }
    catch (error){
        throw error
    }

}