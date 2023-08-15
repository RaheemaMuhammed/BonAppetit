import { useEffect,useState } from "react";
import { getLikedRecipes,getSavedRecipes } from "../../Axios/Services/UserServices";
import useAxios from "../../Axios/Instances/useAxios";
import { useSelector } from "react-redux";


export function useRecipeAPI(api) {
    const [likedRecipes,setLikedRecipes] = useState([])
    const [savedRecipes,setSavedRecipes] = useState([])
    const user =useSelector(state=>state.UserReducer.accessToken)
    useEffect(() => {
      
      async function fetchLikedRecipes() {
       
        try {
            const response = await getLikedRecipes(api);
        setLikedRecipes(response?.payload);
        } catch (error) {
            console.log(error);
        }
        
      }
      async function fetchSavedRecipes() {
        try {
            const response = await getSavedRecipes(api);
        setSavedRecipes(response?.payload);
        } catch (error) {
            console.log(error,'][[[[[');
        }
        
      }
      fetchLikedRecipes()
      fetchSavedRecipes()
    }, [user])
   
    return {likedRecipes,savedRecipes}
}