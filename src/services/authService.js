import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/auth";

// LOGIN

export const loginUser = async (data) => {
    return axios.post(`${API_URL}/login`, data)
}


// Get Your User Data

export const getUserProfile = async (token) => {
    return axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}