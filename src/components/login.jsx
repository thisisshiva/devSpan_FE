import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState('')

  const [isLoginForm, setIsLogin] = useState(true);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')

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

      dispatch(addUser(res.data) )
      return navigate("/")
    }
    catch(err){
      setError(err?.response?.data || "something went wrong")
    }
  };

  const handleSignUp = async () => {
    try{
      const res = await axios.post(BASE_URL+'/signup',{ firstName ,lastName ,email ,password},{withCredentials:true})

      console.log(res.data);
      dispatch(addUser(res.data.data))
      return navigate('/profile')
    }catch(err){
      setError(err?.response?.data || "something went wrong")
      
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center pb-4 ">{isLoginForm?"Login":"SignUp"}</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              {!isLoginForm && <>
              <div className="label">
                <span className="label-text">First Name:</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <div className="label">
                <span className="label-text">Last Name:</span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              /></>}
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
              onClick={isLoginForm? handleLogin: handleSignUp}
              className="btn btn-primary px-7 text-[1rem]"
            >
              {isLoginForm? 'Login':'SignUp'}
            </button>
            <p className="text-center cursor-pointer my-3 hover:text-blue-600" onClick={()=> setIsLogin(!isLoginForm)}>{isLoginForm?'New User? SignUp here': 'Already User? Login here'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
