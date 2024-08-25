import { useState } from 'react';
import axios from 'axios';
import { showToastSuccess, showToastError } from '../utils/toastUtils';
import {getAuthHeaders} from "../utils/authUtils";

interface UserProfile {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const useProfile = () => {

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUserProfile = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const token = localStorage.getItem('auth');
            if (token) {
                const response = await axios.get(`${BACKEND_URL}/users/profile`, getAuthHeaders());
                setUser(response.data);
                showToastSuccess('Profile fetched successfully');
            } else {
                showToastError('No token found');
            }
        } catch (error) {
            console.error('Fetching profile error:', error);
            showToastError('Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        fetchUserProfile,
    };
};
