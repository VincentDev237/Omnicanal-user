import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
}

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
}

const getSuperviseurBoard = () => {
    return axios.get(API_URL + "super", { headers: authHeader() });
}

const getAdminBoard = () => {
    return axios.get(API_URL + "/admin", { headers: authHeader() });
}

const UserService = {
    getPublicContent,
    getUserBoard,
    getSuperviseurBoard,
    getAdminBoard
}

export default UserService;