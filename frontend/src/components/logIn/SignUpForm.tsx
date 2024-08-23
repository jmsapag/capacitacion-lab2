import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, Link } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth"

type SignUpFormProps = RouteComponentProps;

const SignUpForm: FC<SignUpFormProps> = ({ history }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const {handleSignup} = useAuth()

    const submitData = async (data: any) => {
        await handleSignup(data.firstname, data.lastname, data.email, data.password)
    };

    return (
        <form className="row" autoComplete="off" onSubmit={handleSubmit(submitData)}>
            <div className="col-md-6">
                <div className="">
                    <label className="form-label">Firstname</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("firstname", {
                            required: "Firstname is required!",
                        })}
                    />
                    {errors.firstname && (
                        <p className="text-danger" style={{ fontSize: 14 }}></p>
                    )}
                </div>
            </div>
            <div className="col-md-6">
                <div className="">
                    <label className="form-label">Lastname</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput2"
                        {...register("lastname", {
                            required: "Lastname is required!",
                        })}
                    />
                    {errors.lastname && (
                        <p className="text-danger" style={{ fontSize: 14 }}></p>
                    )}
                </div>
            </div>
            <div className="">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control form-control-sm"
                    id="exampleFormControlInput3"
                    {...register("email", { required: "Email is required!" })}
                />
                {errors.email && (
                    <p className="text-danger" style={{ fontSize: 14 }}></p>
                )}
            </div>
            <div className="">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control form-control-sm"
                    id="exampleFormControlInput5"
                    {...register("password", {
                        required: "Password is required!",
                    })}
                />
                {errors.password && (
                    <p className="text-danger" style={{ fontSize: 14 }}></p>
                )}
            </div>
            <div>
                <label className="form-label">Confirm Password</label>
                <input
                    type="password"
                    className="form-control form-control-sm"
                    id="exampleFormControlInput6"
                    {...register("cpassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                            value === watch("password") ||
                            "Passwords don't match.",
                    })}
                />
                {errors.cpassword && (
                    <p className="text-danger" style={{ fontSize: 14 }}></p>
                )}
            </div>
            <div className="text-center mt-4 ">
                <button className="submit-button" type="submit">
                    Submit
                </button>
                <p className="card-text">
                    Already have an account?{" "}
                    <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Log In
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default SignUpForm;