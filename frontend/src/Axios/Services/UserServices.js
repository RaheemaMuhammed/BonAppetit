import { axiosUserInstance } from '../Instances/Instance';


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
        console.log(error);
    }
}

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
        console.log(error);
    }
}

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
        console.log(error);
    }
}