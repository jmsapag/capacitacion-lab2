import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import './styles.css';
import { useProfile } from "../../hooks/useProfile";

type SomeComponentProps = RouteComponentProps;

const UserProfile: FC<SomeComponentProps> = ({ history }) => {

    const { user, loading, fetchUserProfile } = useProfile();

    const logout = () => {
        localStorage.clear();
        history.push("/login");
    };

    const goToHome = () => {
        history.push('/');
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>No user profile found.</p>;
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
