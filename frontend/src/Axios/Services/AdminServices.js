import { axiosAdminInstance } from "../Instances/Instance";

// get client list
export const getUsersList = async (token) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,



            },

        }
        const response = await axiosAdminInstance.get('users/', config)
        return response.data
    } catch (error) {
        console.log(error)
        console.log('some error occured')
    }
}