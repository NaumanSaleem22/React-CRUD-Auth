import axios from "axios";


const API_URL = "https://api.escuelajs.co/api/v1/users";


// get user
export const getUsers = async () =>{
    return axios.get(API_URL);
}


// Get user by id

export const getUserById = async (id) =>{
    return axios.get(`${API_URL}/${id}`);
}   


// Post
export const createUser = async (userData)=>{
    return axios.post(API_URL, userData);
}