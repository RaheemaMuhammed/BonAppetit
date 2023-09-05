import * as yup from 'yup';

export const editProfileSchema=yup.object().shape({
    username:yup
    .string()
    .min(2,'username must be at least 2 characters')
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
    .required('Username is required'),
    phone: yup 
    .number('Phone number must be a 10 digit number ')
    .positive()
    .integer()
    .test('len','Phone number should be a 10 digit number',val=> /^\d{10}$/.test(val))
    .required('Phone number is Required'),
    email:yup.string().email('Please enter a valid email').required('Email is required')
});