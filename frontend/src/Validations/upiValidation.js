import * as yup from 'yup';

export const UPISchema = yup.object().shape({
    upi_id:yup.string()
    .required('UPI id is required')
    .test("upiIdFormat","Invalid UPI ID",value =>{
        const regex =/^[\w\.\-_]{3,}@[a-zA-Z]{3,}$/;
        return regex.test(value)
    })
})