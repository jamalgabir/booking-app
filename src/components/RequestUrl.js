import axios from "axios";

const BASE_URL = "http://localhost:5000";
//const token =JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.accessToken||null;

export const puplicRequest = axios.create({
    baseURL:BASE_URL,

});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    
    headers: {token:`Bearer ${'You can write token here'}`}
    
    
});