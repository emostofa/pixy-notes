import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../Contexts/User/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logUser } = useContext(UserContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    try {
      logUser(user);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <section className="bg-white">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold">Login to your account now!</h1>
            
            <p className="py-6 text-xl">
              Use 'Pixy Notes - your companion on the cloud' for free!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form className="form-control" onSubmit={handleSubmit}>
                <label className="label">
                  <span className="label-text mt-6">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required=""
                  className="input input-bordered"
                />
              
                <label className="label">
                  <span className="label-text mt-6">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required=""
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              
                <button type="submit"
                  
                  className={`btn btn-${
                    email.length > 0 && password.length > 0 ? "" : "disabled"
                  } w-full`}>Login</button>
              </form>
              <div className="mt-3 text-sm p-3">
                Don't have an account?
                <Link
                  to={"/pages/signup"}
                  type="button"
                  className="btn btn-warning btn-sm ml-1 mr-1"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      </section>
      
    </>
  );
}
