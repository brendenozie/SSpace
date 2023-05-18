import { useContext, useState } from "react";
import Button from "../components/Button";
import configs from "../configs.json";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

// Login page
const LoginPage = () => {
  const [email, setEmail] = useState<string >("");
  const [password, setPassword] = useState<string>("");

  const { authDetails, setAuthDetails } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
 });
  const navigate = useNavigate()

  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // performUserAction({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", {email:email,password: password});
      // performUserAction({ type: "LOGIN_SUCCESS", payload: res.data.details });
      if(res.data.isAdmin){
              
              setAuthDetails({user: res.data.details,
                              loading: false,
                              error: {},
                            })
              navigate("/")
                  }else{
                    alert("you cannot Access this page since you are not an admin");
                  }
    } catch (err) {
        // performUserAction({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="mx-auto max-w-[400px] px-5 py-5 mt-5 bg-glitch-bar rounded">
      {/* Login page heading */}
      <h2 className="font-bold text-2xl mt-2 text-white">
        Login to <span className="text-glitch-orange">{configs.sitename}</span>
      </h2>

      {/* Login form */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-4">
          <label htmlFor="email" className="text-white font-medium block">
            Email
          </label>
          <input
            type="text"
            title="Email"
            id="email"
            className="px-2 py-2 bg-transparent text-white border border-gray-300 w-full outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="text-white font-medium block">
            Password
          </label>
          <input
            type="password"
            title="Password"
            id="password"
            className="px-2 py-2 bg-transparent text-white border border-gray-300 w-full outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div className="mt-4">
          <Button className="py-2 hover:bg-glitch-orange" onClick={handleClick}>
            <span>Login</span>
          </Button>
        </div>
      </form>
      <hr className="w-full border border-t-transparent  border-b-gray-300 mt-5" />
      <div className="mt-2 flex text-white">
        Don't have an account{" "}
        <a href="/signup" className="ml-2 text-glitch-orange hover:underline">
          {" "}
          Sign up here
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
