import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/auth/login";

// LOGIN

export const loginUser = async (data) =>{
    return axios.post(`${API_URL}`, data)
}