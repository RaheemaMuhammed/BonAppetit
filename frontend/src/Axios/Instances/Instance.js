import axios from 'axios';


export const axiosUserInstance=axios.create({baseURL:'http://127.0.0.1:8000/'})
export const axiosAdminInstance = axios.create({baseURL:'http://127.0.0.1:8000/adminpanel/'})

export const axiosInstance= 'http://127.0.0.1:8000'