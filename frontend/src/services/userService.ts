import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Get User Profile Service
export const getUserProfile = async (token: string) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile", error);
        throw error;
    }
};