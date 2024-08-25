import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import './styles.css'
import {Flip, ToastContainer} from "react-toastify";
import {useAuth} from "../../hooks/useAuth"

type SomeComponentProps = RouteComponentProps;
const Login: FC<SomeComponentProps> = ({ history }): JSX.Element => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {handleLogin} = useAuth();

    const login = async (data: any) => {
        await handleLogin(data.email, data.password);
    };

    return (
        <>
            <div className="container">
                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ height: "100vh" }}
                >
                    <div className="card mb-3" style={{ maxWidth: "320px"}}>
                        <div className="col-md-12">
                            <div className="card-body">
                                <h3 className="card-title">
                                    Login Form
                                </h3>
                                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                                    <div className="mb-3 mt-4">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control shadow-none"
                                            id="exampleFormControlInput1"
                                            {...register("email", { required: "Email is required!" })}
                                        />
                                        {errors.email && (
                                            <p className="text-danger" style={{ fontSize: 14 }}>
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control shadow-none"
                                            id="exampleFormControlInput2"
                                            {...register("password", {
                                                required: "Password is required!",
                                            })}
                                        />
                                        {errors.password && (
                                            <p className="text-danger" style={{ fontSize: 14 }}>
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-center mt-4 ">
                                        <button
                                            className="submit-button"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                        <p className="card-text pb-2">
                                            Have an Account?{" "}
                                            <Link style={{ textDecoration: "none" }} to={"/register"}>
                                                Sign Up
                                            </Link>
                                        </p>
                                    </div>
                                </form>
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
export default Login;