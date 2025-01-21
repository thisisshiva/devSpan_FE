import { useDispatch, useSelector } from "react-redux";
import OnlineStatus from "../utils/onlineStatus";
import { Link, useNavigate,} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import {removeUser} from "../utils/userSlice"

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onlineStatus = OnlineStatus();

  const handleLogout = async () => {

    try{
      const res = await axios.post(BASE_URL+"/logout",{},{withCredentials: true})
      dispatch(removeUser())
      return navigate("/login")
    }
    catch(err){
      console.log(err.message);
    }
    
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1 ml-3">
        <Link to="/" className="btn btn-ghost text-xl">devSpan</Link>
      </div>
      {user && (
        <div className="flex-none gap-2 mx-5 ">
          <p className="px-1">Welcome! {user.firstName}</p>
          <div className="dropdown dropdown-end mr-5  ">
            <div className={`absolute top-0 right-0 w-3 h-3 rounded-md ${onlineStatus? 'bg-green-400': 'bg-slate-400'}`}></div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
