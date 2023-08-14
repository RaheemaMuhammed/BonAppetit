import { useEffect,useState } from "react";
import { getLikedRecipes,getSavedRecipes } from "../../Axios/Services/UserServices";


export function useRecipeAPI(token) {
    const [likedRecipes,setLikedRecipes] = useState([])
    const [savedRecipes,setSavedRecipes] = useState([])

    useEffect(() => {
      async function fetchLikedRecipes() {
       
        try {
            const response = await getLikedRecipes(token);
        setLikedRecipes(response?.payload);
        } catch (error) {
            console.log(error);
        }
        
      }
      async function fetchSavedRecipes() {
        try {
            const response = await getSavedRecipes(token);
        setSavedRecipes(response?.payload);
        } catch (error) {
            console.log(error);
        }
        
      }
      fetchLikedRecipes()
      fetchSavedRecipes()
    }, [token])
   
    return {likedRecipes,savedRecipes}
}