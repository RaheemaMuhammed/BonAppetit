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