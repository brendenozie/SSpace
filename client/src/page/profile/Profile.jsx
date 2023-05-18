import "./profile.css";
import { Link,useLocation } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { PaginationContext } from "../../context/PaginationContext";

const Profile = () => {

    const { cart,dispatch } = useContext(CartContext);
    
    const [regionView, setRegionView] = useState();
    
    var {perPage, currentPage , pagesToShow,updateValue } = useContext(PaginationContext);

    const [orders, setOrders] = useState([]);

    const [currentPge, setCurrentPge] = useState(1);

    const [pageViewSize, setPageViewSize] = useState(perPage);

    const [credentials, setCredentials] = useState({});

    const { loading, error, user ,performUserAction} = useContext(AuthContext);

    const [pageCount, setPageCount] = useState(0);
    
    const [totalProductCount, setTotalProductCount] = useState(0);

    const mounted = useRef(true);

    const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
     });

    useEffect(() => {
        mounted.current = true;
        axiosInstance.get(`/orders/myorders?pageNumber=${currentPge}&pageViewSize=${pageViewSize}&user=${user._id}`)
        .then(async (res) => {
            if(mounted.current){

              let prds = await res.data;
              
              setOrders(prds.orders);
              setCurrentPge(prds.page);
              setTotalProductCount(prds.count);
              setPageCount(prds.pages);
              
            }
          });
          return () => mounted.current = false;
      }, [regionView, currentPge, pageViewSize, user._id]);

    const handleRegionChange = (e,region)=> {
        setRegionView(region);
    }

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
        } else {
            setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        }
    };

  const handleClick = async (e) => {

        e.preventDefault();

        dispatch({ type: "LOGIN_START" });
        
        try {
        const newUser = {
            ...credentials,
            isAdmin:true,
            favorites:[],
            img: 'https://images.unsplash.com/photo-1533003505519-6a9b92ed4911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTE4MDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
            };
        const res = await axiosInstance.post("/auth/register", newUser);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/")
        } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    const SelectedTab = () => {
        switch(regionView){
            case 'A':
                return ( <>
                        <div className="checkout_details_area mt-50 clearfix">
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
                                            <input type="submit" className="btn amado-btn w-100" value="UPDATE DETAILS" onClick={handleClick} />
                                        </div>
                                    </div>
                                </div>
                        </>);
            case 'B':
                return ( <>
                            <div className="checkout_details_area clearfix">
                                            <div className="cart-title">
                                                <h2>Checkout</h2>
                                            </div>
                                                    
                                            <div className="cart-table clearfix">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>Date</th>
                                                            <th>Total Price</th>
                                                            <th>status</th>
                                                            <th>Payment Method</th>
                                                            <th>Delivery Status</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    {orders.length ? ( 
                                                            orders.map((orderItem) => (
                                                                <tr>
                                                                    <td className="cart_product_desc">
                                                                        
                                                                    </td>
                                                                    <td className="price">
                                                                        <span>{orderItem.createdAt}</span>
                                                                    </td>
                                                                    <td className="price">
                                                                        <span>{orderItem.totalPrice}</span>
                                                                    </td>
                                                                    <td className="price">
                                                                        <span>{orderItem.isPaid? "Paid" : "Payment Pending"}</span>
                                                                    </td>
                                                                    <td className="price">
                                                                        <span>{orderItem.paymentMethod}</span>
                                                                    </td>
                                                                    <td className="price">
                                                                        <span>{orderItem.isDelivered? "Delivered" : "Delivery Pending"}</span>
                                                                    </td>
                                                                    <td className="price">
                                                                        <span>Action</span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                            ) : ( 
                                                                <div className="empty-message">You have no orders yet.</div>
                                                            )}

                                                    </tbody>
                                                </table>
                                            </div>
                                            </div>
                            </>);
            case 'C':
                return ( <>
                    <div className="checkout_details_area mt-50 clearfix">
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
                                        <input type="submit" className="btn amado-btn w-100" value="UPDATE DETAILS" onClick={handleClick} />
                                    </div>
                                </div>
                            </div>
                    </>);
            default:
                return <div></div>;
        }
    }

  return  <>
             <div className="shop_sidebar_area">
                  {/* <!-- ##### Single Widget ##### --> */}
                  <div className="widget catagory mb-50">
                      {/* <!-- Widget Title --> */}
                      <h6 className="widget-title mb-30">My Profile</h6>

                      {/* <!--  Catagories  --> */}
                      <div className="catagories-menu">
                          <ul>
                            <Link onClick={() => {setRegionView("A")}}><li>Edit Details</li></Link>
                            <Link onClick={() => {setRegionView("B")}}><li>My Orders</li></Link>
                              {/* <li><Link onClick={handleRegionChange("favorites")}>Favorites</Link></li> */}
                            <Link onClick={() => { performUserAction({ type: "LOGOUT",}); window.location = "/"; }}><li>Logout</li></Link>
                          </ul>
                      </div>
                  </div>
              </div>

              {/* // ##### Newsletter Area Start #####  */}
            <div className="amado_product_area section-padding-100-0">
                  <div className="container-fluid">
                      <div className="row align-items-center justify-content-center {">
                          {/* Newsletter Text  */}
                          <div className="col-12 col-lg-12 col-xl-12">                              
                            {SelectedTab()}
                          </div>
                      </div>
                  </div>
            </div>

            
            {/* //##### Newsletter Area End ##### */}
        </>
};

export default Profile;
