import * as yup from 'yup'



// const validateIngredient = (ingredient) => {
//     if (!ingredient) {
//       throw new yup.ValidationError("Ingredient cannot be empty.");
//     }
  
//     const ingredients = ingredient.split(",");
//     ingredients.forEach(ingredient_item => {
        
    
//        const found=ingredient_item.includes("-")
//       if (!found) {
//         throw new yup.ValidationError(`Ingredient must be in "onion-250gm" form.`);
//       }
    
//     });  
//     return ingredient;
//   };



export const AddRecipeSchema = yup.object().shape({
    recipe_name : yup.string().required(`Enter your Recipe's Name`),
    instructions:yup.string().required('Please write down instructions for your recipe'),
    ingredients:yup.string().required('PLease Write down the ingredients and quantity')
})
