import React, { useState } from "react";
import UserCards from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || " ");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhoto] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const saveUser = async () => {
    setError(" ")
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, skills, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      setToast(true)
      setTimeout(() => {
        setToast(false);
      }, 3000);

    } catch (err) {
      setError(err.response.data);
      // console.log(err.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-12">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center pb-4 ">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">FirstName:</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <div className="label">
                  <span className="label-text">LastName:</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <div className="label">
                  <span className="label-text">PhotoUrl:</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={photoUrl}
                  onChange={(e) => setPhoto(e.target.value)}
                />
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <select className="select select-bordered w-full max-w-xs" value={gender} onChange={(e)=>setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="label">
                  <span className="label-text">Skills:</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <textarea
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full max-w-xs"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
            </div>
            <p className="text-red-700">{error}</p>
            <div className="card-actions justify-center m-7">
              <button
                //   onClick={handleLogin}
                className="btn btn-primary px-7 text-[1rem]"
                onClick={saveUser}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCards
        user={{ firstName, lastName, photoUrl, gender, age, skills, about }}
      />
      {toast && <div>
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully...</span>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default EditProfile;
