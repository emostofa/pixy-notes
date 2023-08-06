import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../Contexts/User/UserContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addUser } = useContext(UserContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };
    try {
      addUser(user);
      //redirect to login
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <section className="bg-slate-200">
      <div className="hero min-h-screen bg-base-200">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  name="name"
                  id="name"
                  placeholder="Mostofa Mohamed"
                  required=""
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
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
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
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
               
              </div>
              <div className="form-control mt-6">
                <button type="submit"
                  onClick={handleSubmit}
                  className={`btn btn-${
                    email.length > 0 && password.length > 0 ? "" : "disabled"
                  } w-full`}>Sign Up</button>
              </div>
              <div className="mt-3 text-sm p-3">
                Already have an account?
                <Link
                  to={"/pages/signin"}
                  type="button"
                  className="btn btn-warning btn-sm ml-1 mr-1"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
     
      <Toaster />
      </section>
      
    </>
  );
}
