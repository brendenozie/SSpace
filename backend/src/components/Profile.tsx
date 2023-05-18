import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PageListContext } from "../contexts/PageContext";
import configs from "../configs.json";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [name, setName] = useState({});
  const [slug, setSlug] = useState("");
  
  const { authDetails,setAuthDetails } = useContext(AuthContext);
  const { pageList } = useContext(PageListContext);
  
  const navigate = useNavigate()

  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // performUserAction({ type: "LOGIN_START" });
    try {
      // performUserAction({ type: "LOGIN_SUCCESS", payload: res.data.details });
      // if(res.data.isAdmin){
              localStorage.removeItem("backuser")
              navigate("/login")
                  // }else{
                  //   alert("you cannot Access this page since you are not an admin");
                  // // }
    } catch (err) {
        // performUserAction({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  useEffect(() => {
    const profilePage = pageList[pageList.length - 1];
    setName(authDetails.user?authDetails.user.username:"");
    setSlug(profilePage.slug);
  }, [pageList]);

  return (
    <div>
      <NavLink
        to={slug}
        className={({ isActive }) =>
          `flex relative items-center py-2 mt-5 font-medium ${
            isActive ? "text-glitch-orange" : "text-gray-400"
          }`
        }
      >
        <span className="material-icons-outlined mr-7">
          <img src={`${authDetails.user? authDetails.user.img:""}`}
            alt={`${authDetails.user? authDetails.user.img:""}`}
            className="w-6 h-6 rounded"
          />
        </span>{" "}
        {authDetails.user?authDetails.user.username:""}
      </NavLink>
      <NavLink onClick={handleClick}
        to={'#'}
        className={({ isActive }) =>
          `flex relative items-center py-2 mt-5 font-medium ${
            isActive ? "text-glitch-orange" : "text-gray-400"
          }`
        }
      >
        <span className="material-icons-outlined mr-7">logout</span> Log out
      </NavLink>
    </div>
  );
};

export default Profile;
