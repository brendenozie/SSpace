import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CustomButton from "../../components/custom-button/custom-button.component";
import banner from "../../assets/img/gplay.png";

import { Link } from "react-router-dom";

// import { auth, signInWithGoogle } from "../../firebase/firebase.utils"; 

import "./login.css";

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
      });
    
      const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
     });

      const { loading, error, performUserAction } = useContext(AuthContext);
    
      const navigate = useNavigate()
    
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
          const res = await axiosInstance.post("/auth/login", credentials);
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
                          <div className="col-12 col-lg-5 col-xl-5 cart-summary">
                          <div className="checkout_details_area mt-50 clearfix">
                                  <div className="cart-title">
                                      <h2>Login</h2>
                                  </div>

                                      <div className="row">
                                          
                                          <div className="col-12 mb-3">
                                              <input type="email" className="form-control" id="email" name="email" placeholder="Email" required onChange={handleChange}/>
                                          </div>
                                          <div className="col-12 mb-3">
                                              <input type="password" className="form-control mb-3" id="password" name="password" placeholder="******" required onChange={handleChange}/>
                                          </div>
                                          <div className="col-12">
                                              <div className="custom-control custom-checkbox d-block mb-2">
                                                  <input type="checkbox" className="custom-control-input" id="customCheck2"/>
                                                  <label className="custom-control-label" for="customCheck2">Create an accout</label>
                                              </div>
                                          </div>
                                          <div className="col-12 cart-btn mb-3">
                                              <input type="submit" className="btn amado-btn w-100" value="Login" onClick={handleClick}/>
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
                                                    <Link className="custom-control-label" to="/register" >Register</Link>
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

export default Login;
