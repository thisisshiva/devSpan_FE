import React from "react";
import Navbar from "./components/navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
// import Footer from "./components/footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store)=>store.user)

  const fetchUser = async () => {
    // if (userData && Object.keys(userData).length !== 0) return;
    if(userData) return;
    try{
      const res = await axios.get(BASE_URL+"/profile/view",{
        withCredentials: true,
      })
      dispatch(addUser(res.data));
    }
    catch(err){
      if(err.status === 401){
        navigate("/login")
      }
      console.log(err)
    }
  }

  useEffect(()=>{
      fetchUser();
  },[])


  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Body;
