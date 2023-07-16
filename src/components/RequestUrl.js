import axios from "axios";

const BASE_URL = "http://localhost:5000/";
//const token =JSON.parse(JSON.parse(localStorage.getItem("t_ken")))||'hello';

export const puplicRequest = axios.create({
    baseURL:BASE_URL,
    headers: {'X-Custom-Header': 'foobar'}
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    
    headers: {access_token:`${'You can write token here'}`}
    
    
});