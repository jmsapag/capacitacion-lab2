import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./Components/LogIn/SignUp";
import Login from "./Components/LogIn/Login";
import PrivateRoute from "./Auth/PrivateRoute";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RestrictedRoute from "./Auth/RestrictedRoute";
import Home from "./Components/Tasks/Home";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <RestrictedRoute exact path="/login" component={Login} />
                <Route exact path="/register" component={SignUp} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;