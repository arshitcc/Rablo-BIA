import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
    withCredentials : true,
    timeout : 120000,
});