import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Login Service
export const loginService = async (email: string, password: string) => {
    const params = {
        username: email,
        password: password,
    };

    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, params);
        return response.data;
    } catch (error) {
        console.error("Error during login request", error);
        throw error;
    }
};


// Signup Service
export const signupService = async (firstname: string, lastname: string, email: string, password: string) => {

    const params = {
        firstname,
        lastname,
        email,
        password,
    };

    try {
        const response = await axios.post(`${BACKEND_URL}/auth/signup`, params);
        return response.data;
    } catch (error) {
        console.error("Error during signup request", error);
        throw error;
    }
};