import axios from 'axios';
// import dotenv from 'dotenv';
import store from '../redux/store'

// dotenv.config();

const headers = {
    'Accept':'application/json',
    'Content-Type':'application/json'
};

const headersImage = {
    'Accept':'application/json',
    'Content-Type': 'multipart/form-data'
};


const api = axios.create({
    baseURL: 'https://campaign.fundall.io/api/v1',
    headers
})


const {getState} = store
const {userLogin:{userInfo}} = getState();

api.interceptors.request.use((req)=>{
    
    if(userInfo){
        req.headers.Authorization = `Bearer ${userInfo.success.user.access_token}`;
    }

    return req;
}, 
(error)=>{
    return Promise.reject(error)
})

export default api;