import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("shiva@gmail.com");
  const [password, setPassword] = useState("Shiva@786");
  const [error,setError] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async () => {
    try{
      const res = await axios.post(
        BASE_URL+"/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch( addUser(res.data) )
      return navigate("/")
    }
    catch(err){
      setError(err.response.data)
      console.error(err)
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center pb-4 ">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email:</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="label">
                <span className="label-text">Password:</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-700">{error}</p>
          <div className="card-actions justify-center m-7">
            <button
              onClick={handleLogin}
              className="btn btn-primary px-7 text-[1rem]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
