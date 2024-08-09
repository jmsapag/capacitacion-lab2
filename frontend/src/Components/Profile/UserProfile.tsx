import React, {FC, useEffect, useState} from 'react';
import axios from 'axios';
import {RouteComponentProps} from "react-router-dom";

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
                    const response = await axios.get<UserProfile>('http://localhost:4000/users/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
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
        <div className="App">
            <span className="heading">User Profile</span>

            <nav className="navbar">
                <div className="navbar-buttons">
                    <button onClick={goToHome} className="navbar-button">
                        To-Do
                    </button>
                    <button onClick={logout} className="navbar-button">
                        Logout
                    </button>
                </div>
            </nav>

            <p><strong>First Name:</strong> {user.firstname}</p>
            <p><strong>Last Name:</strong> {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default UserProfile;
