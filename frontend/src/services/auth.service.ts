import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = (username: string, email: string, password: string) => {
    // Ensure the URL is constructed correctly
    const url = `${API_URL}register`;
    return axios.post(url, {
        username,
        email,
        password
    });
};

const login = async(email: string, password: string) => {
    const url = `${API_URL}signin`;
    return axios.post(url, {
        email,
        password
    })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
