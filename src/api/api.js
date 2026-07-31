import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:2026/api"

});

export default api;