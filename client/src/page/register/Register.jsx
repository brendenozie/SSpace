import "./register.css";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CustomButton from "../../components/custom-button/custom-button.component";
import banner from "../../assets/img/gplay.png";

import { Link } from "react-router-dom";

const Register = () => {
    
    const [credentials, setCredentials] = useState({});

    const { loading, error, performUserAction } = useContext(AuthContext);

    const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
     });

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
        } else {
            setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        }
    };

  const handleClick = async (e) => {

        e.preventDefault();

        performUserAction({ type: "LOGIN_START" });
        
        try {
        const newUser = {
            ...credentials,
            isAdmin:false,
            favorites:[],
            img: 'https://images.unsplash.com/photo-1533003505519-6a9b92ed4911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTE4MDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
            };
        const res = await axiosInstance.post("/auth/register", newUser);
        performUserAction({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/")
        } catch (err) {
            performUserAction({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
  
  return  (
            // ##### Newsletter Area Start ##### 
            <section className="newsletter-area section-padding-100-0">
                  <div className="container">
                      <div className="row align-items-center justify-content-center {">
                          {/* Newsletter Text  */}
                          <div className="col-12 col-lg-5 col-xl-5">
                          <div className="checkout_details_area mt-50 clearfix">
                                  <div className="cart-title">
                                      <h2>Register</h2>
                                  </div>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" required onChange={handleChange} />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Email"  onChange={handleChange} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <input type="number" className="form-control" id="phone" name="phone" min="0" placeholder="Phone No" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="******" onChange={handleChange} />
                                    </div>
                                    <div className="col-12 cart-btn mb-3">
                                        <input type="submit" className="btn amado-btn w-100" value="Register" onClick={handleClick} />
                                    </div>
                                    <div className="col-12">
                                    <CustomButton isGoogleSignIn >
                                        <div className="container">
                                            <img src={banner} alt="" />
                                            <span className="btn-txt">Continue with Google</span>
                                        </div>
                                    </CustomButton>
                                    </div>
                                    <div className="col-12">
                                    <div className="custom-control custom-checkbox d-block">
                                            <Link className="custom-control-label" to="/login" >Login</Link>
                                        </div>
                                    </div>
                                </div>
                                  </div>
                          </div>
                      </div>
                  </div>
            </section>
            //##### Newsletter Area End #####
          );
};

export default Register;
