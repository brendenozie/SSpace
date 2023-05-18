import { useContext, useState } from "react";
import axios from "axios";
import "./checkout.css";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    
    const { cart,dispatch } = useContext(CartContext);

    const { user } = useContext(AuthContext);
    
    const [visibleAddress, setVisibleAddress] = useState("");
    
    const [credentials, setCredentials] = useState({});

    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
     });

    const handleChange = (e) => {

        if (e.target.type === 'radio') {

            if( e.target.name === 'pm'){

                dispatch({type:"REMOVE_SHIPPING"});

                if(e.target.checked) {
                    setVisibleAddress(e.target.value);
                }else{
                    setVisibleAddress("");
                }
            }

            if( e.target.name === 'shipping'){

                if(e.target.checked) {
                    dispatch({type:"ADD_SHIPPING",payload: e.target.value});
                }
            }
                // setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.checked }));            
        } else {
            setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        }

      };

      const handleSubmit = async () => {        
          try {
            const order ={
                user : user._id,
                orderItems: cart.items,
                dte: Date.now().toLocaleString(),
                totalQuantity : cart.totalQuantity,
                shippingAddress : cart.shippingAddress,
                paymentMethod : cart.paymentMethod,
                paymentResult : cart.paymentResult,
                taxPrice: cart.taxPrice,
                shippingPrice : cart.shippingPrice,
                totalPrice : cart.totalPrice,
                isPaid : cart.isPaid,
                paidAt : cart.paidAt,
                isDelivered : cart.isDelivered,
                deliveredAt : cart.deliveredAt,
                voucherId : cart.voucherId,
                voucherAmount : cart.voucherAmount,
                status : cart.status,
            }

              if(visibleAddress === "cod"){
                
                order.paymentMethod = "Cash On Delivary";            
                
                order.shippingAddress = credentials;
                if(order.shippingAddress.city && order.shippingAddress.address){
                    const res = await axiosInstance.post("/orders", order);

                    if(res.data){
                        dispatch({ type: "CLEAR_ALL_ITEMS_FROM_CART" });
                        window.location ="/completion";
                    }
                }else{
                    alert("FILL OUT ADDRESS DETAILS TO CONTINUE");
                }
                // dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                //   navigate("/pde")
              }

              if(visibleAddress === "astore"){

                order.paymentMethod = "Cash At Store";
                                                                
                const res = await axiosInstance.post("/orders", order);
                if(res.data){
                    dispatch({ type: "CLEAR_ALL_ITEMS_FROM_CART" });
                    window.location ="/completion";
                }
              }

              if(visibleAddress === "paypal"){
                window.location ="/pde";
              }

            } catch (err) {
                window.location = "/login";
            //   dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
            }
      };

  return  <>
            <div className="cart-table-area mt-50">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-12 col-lg-8">
                          <div className="checkout_details_area clearfix">

                                <div className="cart-title">
                                    <h2>Checkout</h2>
                                </div>
                                        
                                <div className="cart-table clearfix">
                                    <table className="table table-responsive">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {cart.items.length ? ( 
                                                cart.items.map((cartItem) => (
                                                    <tr>
                                                        <td className="cart_product_img">
                                                            <Link to={"/product-details/"+cartItem._id}><img src={cartItem.pImage[0].url} alt="Product"/></Link>
                                                        </td>
                                                        <td className="cart_product_desc">
                                                            <h5>{cartItem.pName}</h5>
                                                        </td>
                                                        <td className="price">
                                                            <span>{cartItem.pPrice}</span>
                                                        </td>
                                                        <td className="qty">
                                                            <div className="qty-btn d-flex">
                                                                <p>Qty</p>
                                                                <div className="quantity">
                                                                    <span className="qty-minus"><i className="fa fa-minus" aria-hidden="true"  onClick={() => dispatch({type:"REMOVE_ITEM",payload: cartItem})}></i></span> 
                                                                        <input type="number" className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value={cartItem.quantity}  onChange={handleChange}/>
                                                                    <span className="qty-plus" ><i className="fa fa-plus" aria-hidden="true" onClick={() => dispatch({type:"ADD_ITEM",payload: cartItem})}></i></span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                                ) : ( 
                                                    <div className="empty-message">You have no items in your cart.</div>
                                                )}
                                            
                                        </tbody>
                                    </table>
                                </div>
                          </div>
                      </div>
                      <div className="col-12 col-lg-4">
                          <div className="cart-summary">
                              <h5>Cart Total</h5>
                              <ul className="summary-table">
                                  <li><span>subtotal:</span> <span>{cart.totalQuantity}</span></li>
                                  <li><span>delivery:</span> <span>Ksh {cart.shippingPrice.deliveryFee}</span></li>
                                  <li><span>total:</span> <span>Ksh {cart.totalPrice}</span></li>
                              </ul>

                              <div className="payment-method">
                                  {/* Pick Up At Store  */}
                                  <div className="custom-control custom-radio mr-sm-2">
                                      <input type="radio" className="custom-control-input" name="pm" value="astore" id="astore" onChange={handleChange} />
                                      <label className="custom-control-label" htmlFor="astore">Pick up at store</label>
                                  </div>
                                  {/* Cash on delivery  */}
                                  <div className="custom-control custom-radio mr-sm-2">
                                      <input type="radio" className="custom-control-input" name="pm" value="cod" id="cod" onChange={handleChange}/>
                                      <label className="custom-control-label" htmlFor="cod">Cash on Delivery</label>
                                  </div>
                                  {/* Paypal  */}
                                  <div className="custom-control custom-radio mr-sm-2">
                                      <input type="radio" className="custom-control-input" name="pm" value="paypal" id="paypal" onChange={handleChange}/>
                                      <label className="custom-control-label" htmlFor="paypal">
                                        Mpesa / Paypal / Credit Card <img className="ml-15" src="img/core-img/paypal.png" alt=""/>
                                      </label>
                                  </div>
                              </div>
                              <>
                                { visibleAddress === "cod" ? (
                                    <div className="summary-table form-control mb-5">

                                            <h5 className="mb-5">Delivary Method</h5>

                                            <div className="col-12 mb-3">
                                                    <div className="custom-control custom-radio d-block mb-5">
                                                        <input type="radio" className="custom-control-input" id="standard" name="shipping" value="standard shipping" onChange={handleChange}/>
                                                        <label className="custom-control-label" htmlFor="standard"><h5>Standard Shipping</h5></label>
                                                        <p>4-5 working days (untracked) </p>
                                                        <h6>Ksh 600 </h6>                                                
                                                    </div>
                                                    <div className="custom-control custom-radio d-block mb-5">
                                                        <input type="radio" className="custom-control-input" id="express" name="shipping" value="express shipping" onChange={handleChange}/>
                                                        <label className="custom-control-label" htmlFor="express"><h5>Express Shipping</h5></label>
                                                        <p>1 - 2 working days (Tracked) </p>
                                                        <h6>Ksh 1000 </h6>
                                                        
                                                    </div>
                                                </div>

                                            <h5 className="mb-3">Address Details</h5>

                                            <div className="col-lg-12">
                                                <div className="row">                                     
                                                    <label className="" for="addr">Address</label>
                                                    <input type="text" className="form-control mb-3" id="address" placeholder="Address" onChange={handleChange}/>
                                                </div>
                                                <div className="row">                                     
                                                    <label className="" for="town">City</label>
                                                    <input type="text" className="form-control mb-3" id="city" placeholder="Town" onChange={handleChange}/>
                                                </div>
                                                <div className="row">                                     
                                                    <label className="" for="town">Country</label>
                                                    <input type="text" className="form-control mb-3" id="country" placeholder="Country" onChange={handleChange}/>
                                                </div>
                                                <div className="row">                                     
                                                    <label className="" for="cvv">Additional Information</label>
                                                    <input type="text" className="form-control mb-3" id="info" placeholder="info" onChange={handleChange}/>
                                                </div>
                                            </div>

                                        </div>
                                    ) : ("") }
                              </>

                                {/* <section className="newsletter-area ">
                                        <div className="newsletter-form ">
                                            <form action="#" method="post">
                                                <input type="email" name="email" className="nl-email" placeholder="Enter Voucher"/>
                                                <input type="submit" value="Subscribe"/> 
                                            </form>
                                        </div>
                                </section> */}

                              <div className="cart-btn mt-100">
                                  <Link onClick={handleSubmit} className="btn amado-btn w-100">Checkout</Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </>
};

export default Checkout;
