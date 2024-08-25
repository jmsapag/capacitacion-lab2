import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { showToastSuccess, showToastError } from '../utils/toastUtils';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    // Function to handle login
    const handleLogin = async (email: string, password: string) => {
        const params = {
            username: email,
            password: password,
        };

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, params);
            if (response.data.success === false) {
                showToastError(response.data.error);
            } else {
                showToastSuccess(response.data.message);
                localStorage.setItem('auth', response.data.token);
                setIsAuthenticated(true);
                setTimeout(() => {
                    history.push('/');
                }, 1000);
            }
        } catch (error) {
            console.error('Error during login request', error);
            showToastError('Login failed. Please try again.');
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('auth');
        setIsAuthenticated(false);
        history.push('/login');
    };

    // Function to handle signup
    const handleSignup = async (firstname: string, lastname: string, email: string, password: string) => {

        setLoading(true);

        const params = { firstname, lastname, email, password };

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/signup`, params);
            showToastSuccess(response.data.message);
            setLoading(false);
            setTimeout(() => {
                history.push("/login");
            }, 1000);
        } catch (error) {
            console.error("Error during signup request", error);
            setLoading(false);
            showToastError("Signup failed. Please try again.");
        }
    };

    return {
        handleLogin,
        handleLogout,
        isAuthenticated,
        handleSignup,
    };
};
