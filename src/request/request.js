import axios from "axios";

const request = axios.create({
    baseURL: 'http://162.14.69.240:8080/api',
    timeout: 100000
})

export default request