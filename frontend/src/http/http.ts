import axios from 'axios'


const BASE_URL = 'http://localhost:8000/'
const $api = axios.create({
    // withCredentials: true,
    baseURL: BASE_URL, 
});

// if (localStorage.getItem('leikoToken')) {
//     $api.interceptors.request.use((config) => {
//         config.headers.Authorization = `Bearer ${localStorage.getItem('silantToken')}`
//         return config;
//     })
// }
  
export default $api;