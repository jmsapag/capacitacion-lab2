import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import SignUpForm from "./SignUpForm";
import './styles.css';

type SomeComponentProps = RouteComponentProps;
const SignUp: FC<SomeComponentProps> = (props) => {
    return (
        <>
            <div className="container">
                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ height: "100vh" }}
                >
                    <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px"}}>
                        <div className="col-md-12">
                            <div className="card-body">
                                <h3 className="card-title">
                                    Sign Up Form
                                </h3>
                                <SignUpForm {...props} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                limit={1}
                transition={Flip}
            />
        </>
    );
};

export default SignUp;