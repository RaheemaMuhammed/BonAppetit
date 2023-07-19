import * as yup from 'yup';

export const AddCategorySchema = yup.object().shape({
    name:yup.string().required('Name required')
})