import axios from 'axios';
import { authHeader, removeToken } from './_helpers'

let instance = axios.create({
    baseURL: process.env.API_URL,
    headers: authHeader(),
});

instance.interceptors.response.use(function (response) {
    return response;
}, (error) => {
    const { response } = error
    if (response.status == 401) {
        removeToken()
    }
    return Promise.reject(error);
})

export const apiConfig = instance
