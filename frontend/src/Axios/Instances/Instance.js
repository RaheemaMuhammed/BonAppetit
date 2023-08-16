import axios from 'axios';
 



export const axiosCommonInstance=axios.create({baseURL:'http://127.0.0.1:8000/'})
export const axiosUserInstance=axios.create({baseURL:'http://127.0.0.1:8000/'})
export const axiosAdminInstance = axios.create({baseURL:'http://127.0.0.1:8000/adminpanel/'})

export const axiosInstance= 'http://127.0.0.1:8000'

export const baseURLUser='http://127.0.0.1:8000/';
export const baseURLAdmin='http://127.0.0.1:8000/adminpanel/';