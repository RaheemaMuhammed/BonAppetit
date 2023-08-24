import axios from 'axios';
 



export const axiosCommonInstance=axios.create({baseURL:'http://16.171.250.80/'})
export const axiosUserInstance=axios.create({baseURL:'http://16.171.250.80/'})
export const axiosAdminInstance = axios.create({baseURL:'http://16.171.250.80/adminpanel/'})

export const axiosInstance= 'http://16.171.250.80'

export const baseURLUser='http://16.171.250.80/';
export const baseURLAdmin='http://16.171.250.80/adminpanel/';