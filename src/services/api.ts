import axios from "axios"; // expo install axios

const api = axios.create({
    baseURL: 'http://10.0.0.134:8080'
});

export { api };