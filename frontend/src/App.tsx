import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./components/logIn/SignUp";
import Login from "./components/logIn/Login";
import PrivateRoute from "./auth/PrivateRoute";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RestrictedRoute from "./auth/RestrictedRoute";
import Home from "./components/tasks/Home";
import UserProfile from "./components/profile/UserProfile";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <RestrictedRoute exact path="/login" component={Login} />
                <Route exact path="/register" component={SignUp} />
                <PrivateRoute exact path="/profile" component={UserProfile}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;