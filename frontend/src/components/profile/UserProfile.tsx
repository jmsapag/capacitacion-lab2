import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { getUserProfile } from "../../services/userService";
import './styles.css';

interface UserProfile {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

type SomeComponentProps = RouteComponentProps;

const UserProfile: FC<SomeComponentProps> = ({ history }) => {
    const [user, setUser] = useState<UserProfile | null>(null);

    const logout = () => {
        localStorage.clear();
        history.push("/login");
    };

    const goToHome = () => {
        history.push('/');
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('auth'); // Assuming the token is stored in localStorage
                if (token) {
                    const userProfile = await getUserProfile(token);
                    setUser(userProfile);
                } else {
                    console.log('No token found');
                }
            } catch (error) {
                console.error('Error fetching user profile', error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <h1 className="heading">User Profile</h1>
            <nav className="navbar">
                <button onClick={goToHome} className="navbar-button">
                    To-Do
                </button>
                <button onClick={logout} className="navbar-button">
                    Logout
                </button>
            </nav>
            <div className="profile-card">
                <div className="profile-info">
                    <p><strong>First Name:</strong> {user.firstname}</p>
                    <p><strong>Last Name:</strong> {user.lastname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;