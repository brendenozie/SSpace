import { useContext, useState } from "react";
import Button from "../components/Button";
import configs from "../configs.json";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Login page
const SignupPage = () => {
  const [username, setUsername] = useState<string >("");
  const [email, setEmail] = useState<string >("");
  const [phone, setPhone] = useState<string >("");
  const [password, setPassword] = useState<string>("");
  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
 });

  const { authDetails, setAuthDetails } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // performUserAction({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/register", {email:email,
                                                      password: password,
                                                      username: username,
                                                      phone: phone,
                                                      isAdmin:true,
                                                      favorites:[],
                                                      img: 'https://images.unsplash.com/photo-1533003505519-6a9b92ed4911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTE4MDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
                                                    });
      // performUserAction({ type: "LOGIN_SUCCESS", payload: res.data.details });
      setAuthDetails({user: res.data.details,
                      loading: false,
                      error: {},
                    })
      navigate("/")
    } catch (err) {
        // performUserAction({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="mx-auto max-w-[400px] px-5 py-5 mt-5 bg-glitch-bar rounded">
      {/* Login page heading */}
      <h2 className="font-bold text-2xl mt-2 text-white">
        Sign-Up to <span className="text-glitch-orange">{configs.sitename}</span>
      </h2>

      {/* Login form */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-4">
          <label htmlFor="username" className="text-white font-medium block">
            Username
          </label>
          <input
            type="text"
            title="username"
            id="username"
            className="px-2 py-2 bg-transparent text-white border border-gray-300 w-full outline-none"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="text-white font-medium block">
            Email
          </label>
          <input
            type="text"
            title="email"
            id="email"
            className="px-2 py-2 bg-transparent text-white border border-gray-300 w-full outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phone" className="text-white font-medium block">
            Phone
          </label>
          <input
            type="text"
            title="Phone"
            id="phone"
            className="px-2 py-2 bg-transparent text-white border border-gray-300 w-full outline-none"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
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
            <span>Signup</span>
          </Button>
        </div>
      </form>
      <hr className="w-full border border-t-transparent  border-b-gray-300 mt-5" />
      <div className="mt-2 flex text-white">
        Don't have an account{" "}
        <a href="login" className="ml-2 text-glitch-orange hover:underline">
          {" "}
          Login here
        </a>
      </div>
    </div>
  );
};

export default SignupPage;
