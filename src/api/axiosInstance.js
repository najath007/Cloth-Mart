import axios from "axios";

const api = axios.create({
    baseURL:'https://fakestoreapi.com',
    // baseURL:'https://6916b4eca7a34288a27e19aa.mockapi.io/',
})

export default api