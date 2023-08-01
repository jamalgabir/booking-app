import axios from "axios";

const BASE_URL = "https://booking-api-1016.onrender.com/";
const token = JSON.parse(localStorage.getItem("t_ken"));
export const puplicRequest = axios.create({
    baseURL:BASE_URL,
    headers: {access_token:`Beare ${token}`}
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    
    headers: {access_token:`Beare ${token}`}
    
    
});
