import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchReq = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const reqReview = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
    //   console.log(res);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchReq();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="text-center my-4 text-2xl font-bold">No Requests</h1>;

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-7">Requests</h1>
      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          age,
          gender,
          skills,
          photoUrl,
          about,
        } = request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center bg-base-300 m-10 p-6 rounded-lg max-w-2xl mx-auto"
          >
            <div>
              <img
                src={photoUrl}
                alt="userPhoto"
                className="w-24 rounded-full"
              />
            </div>
            <div className="text-left mx-7">
              <h2 className="text-xl font-bold">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + gender}</p>}
              <p>{skills}</p>
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reqReview("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reqReview("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
