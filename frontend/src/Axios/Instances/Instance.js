import axios from 'axios';
 


export const axiosCommonInstance=axios.create({baseURL:'https://bonappetit.website/'})
export const axiosUserInstance=axios.create({baseURL:'https://bonappetit.website/'})
export const axiosAdminInstance = axios.create({baseURL:'https://bonappetit.website/adminpanel/'})

export const axiosInstance= 'https://bonappetit.website'

export const baseURLUser='https://bonappetit.website/';
export const baseURLAdmin='https://bonappetit.website/adminpanel/';



// export const axiosCommonInstance=axios.create({baseURL:'https://127.0.0.1:8000/'})
// export const axiosUserInstance=axios.create({baseURL:'https://127.0.0.1:8000/'})
// export const axiosAdminInstance = axios.create({baseURL:'https://127.0.0.1:8000/adminpanel/'})

// export const axiosInstance= 'https://127.0.0.1:8000'

// export const baseURLUser='https://127.0.0.1:8000/';
// export const baseURLAdmin='https://127.0.0.1:8000/adminpanel/';