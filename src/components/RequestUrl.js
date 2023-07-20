import axios from "axios";

const BASE_URL = "http://localhost:5000/";
const token =localStorage.getItem("t_ken");

export const puplicRequest = axios.create({
    baseURL:BASE_URL,
    headers: {access_token:token}
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    
    headers: {access_token:{token}}
    
    
});