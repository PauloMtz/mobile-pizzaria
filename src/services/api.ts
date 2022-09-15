import axios from "axios"; // expo install axios

const api = axios.create({
    baseURL: 'http://192.168.185.90:8080'
});

export { api };