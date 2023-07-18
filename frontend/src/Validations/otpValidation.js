import * as yup from 'yup';

export const emailVerificationSchema= yup.object().shape({
    email:yup.string().email('Please enter a valid email').required('Email is required'),
    otp:yup.number('OTP must be 6 digit').positive().integer()
    .test('len','OTP should be a 6 digit number',val=> /^\d{6}$/.test(val))
    .required('OTP is Required'),
})