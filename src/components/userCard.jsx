import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCards = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender, skills } = user;
  const dispatch = useDispatch();

  const handleReq = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(removeUserFromFeed(res));
    } catch (err) {
      console.log(err.message);
    }
  };

  

  return (
    user && (
      <>
        <div className="card bg-base-300 w-96 shadow-xl">
          <figure>
            <img src={photoUrl} alt="userPhoto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{skills}</p>
            <p>{about}</p>
            <div className="card-actions justify-center my-4">
              <button
                className="btn btn-primary mx-1"
                onClick={() => handleReq("ignored", user._id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary mx-1"
                onClick={() => handleReq("interested", user._id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default UserCards;
