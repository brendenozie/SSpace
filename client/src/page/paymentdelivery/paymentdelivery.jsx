import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./paymentdelivery.css";

const formatPhoneNumber = (phoneNumber) => {
    if (/^(254)[17]\d{8}$/.test(phoneNumber)){
      return phoneNumber;
    }else if (/^(0)[17]\d{8}$/.test(phoneNumber)){
      return `254${phoneNumber.substring(1, phoneNumber.length)}`
    }else if (/^(\+254)[17]\d{8}$/.test(phoneNumber)){
      return `${phoneNumber.substring(1, phoneNumber.length)}`
    }else{
      return ''
    }
    
  }

const Paymentdelivery = () => {

    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
     });

    const { cart,dispatch } = useContext(CartContext);

    const { user } = useContext(AuthContext);
    
    const [visibleAddress, setVisibleAddress] = useState("");
    
    const [credentials, setCredentials] = useState({});


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
                status:cart.status,
            }

              if(visibleAddress === "mpesa"){
                
                order.paymentMethod = "mpesa";            
                
                order.shippingAddress = credentials;
                if(order.shippingAddress.city && order.shippingAddress.address && parseFloat(order.shippingPrice.deliveryFee) > 0.00){
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

              if(visibleAddress === "credit card"){
                order.paymentMethod = "Cash On Delivary";            
                
                order.shippingAddress = credentials;
                if(order.shippingAddress.city && order.shippingAddress.address && parseFloat(order.shippingPrice.deliveryFee) > 0.00){
                    const res = await axiosInstance.post("/orders", order);

                    if(res.data){
                        dispatch({ type: "credit card" });
                        window.location ="/completion";
                    }
                }else{
                    alert("FILL OUT ADDRESS DETAILS TO CONTINUE");
                }
              }

              if(visibleAddress === "paypal"){
                order.paymentMethod = "paypal";            
                
                order.shippingAddress = credentials;
                if(order.shippingAddress.city && order.shippingAddress.address && parseFloat(order.shippingPrice) > 0.00){
                    const res = await axiosInstance.post("/orders", order);

                    if(res.data){
                        dispatch({ type: "CLEAR_ALL_ITEMS_FROM_CART" });
                        window.location ="/completion";
                    }
                }else{
                    alert("FILL OUT ADDRESS DETAILS TO CONTINUE");
                }
              }

            } catch (err) {
              dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
            }
      };


  return  <>
            <div className="cart-table-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="checkout_details_area mt-50 clearfix">

                            <div className="cart-title">
                                <h2>Billing Details</h2>
                                <h5>Choose a payment Method Below</h5>
                            </div>

                            

                            <div className="row form-control mb-3">
                                    
                                    <div className="col-12 mt-50">
                                            <div className="custom-control custom-radio d-block mb-2">
                                                <input type="radio" className="custom-control-input" id="lipanampesa" name="pm" value="mpesa"  onChange={handleChange}/>
                                                <label className="custom-control-label" htmlFor="lipanampesa"><h5>LIPA NA MPESA</h5></label>
                                                <p>
                                                    Pay using your kenya mpesa mobile number
                                                    <img className="ml-15" src="img/core-img/mpesa.png" alt=""/>
                                                </p>                                                
                                            </div>
                                            <div className="row">    
                                                <div className="col-lg-12">                                     
                                                    <label className="" htmlFor="namecard">Enter Your Mpesa Number Below</label>
                                                    <input type="text" className="form-control mb-3" id="mpnumber" name="mpnumber" placeholder="+254 000 000 000"   onChange={handleChange}/>
                                                </div>
                                            </div>
                                        </div>

                                </div>

                            

                            <div className="row form-control mb-3">
                                    
                                    <div className="col-12 mt-50">
                                            <div className="custom-control custom-radio d-block mb-2">
                                                <input type="radio" className="custom-control-input" id="paypal" name="pm" value="paypal" onChange={handleChange}/>
                                                <label className="custom-control-label" htmlFor="paypal"><h5>Paypal</h5></label>
                                                <p>
                                                    You will be redirected to paypal website to complete your purchase
                                                    <img className="ml-15" src="img/core-img/paypal.png" alt=""/>
                                                </p>                                                
                                            </div>
                                        </div>

                                </div>

                                <div className="row form-control mb-3">
                                    
                                    <div className="col-12 mt-50">
                                            <div className="custom-control custom-radio d-block mb-2">
                                                <input type="radio" className="custom-control-input" id="ccard" value="credit card" name="pm"/>
                                                <label className="custom-control-label" htmlFor="ccard"><h5>Pay using credit card</h5></label>
                                                <p>
                                                    Safe money transfer using your bank account Visa, Maestro, Discover, American Express
                                                    <img className="ml-15" src="img/core-img/ccd.png" alt=""/>
                                                </p>
                                                
                                            </div>
                                            
                                        </div>

                                        <div className="col-12 mt-50">     
                                            <div className="row">    
                                                <div className="col-lg-12">                                     
                                                    <label className="" htmlFor="namecard">Card Number</label>
                                                    <input type="text" className="form-control mb-3" id="cardnumber" placeholder="Enter Card Number"   onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-lg-4 ">                                     
                                                    <label className="" htmlFor="namecard">Name On Card</label>
                                                    <input type="text" className="form-control mb-3" id="owner" placeholder="name on card"   onChange={handleChange}/>
                                                </div>
                                                <div className="col-lg-4 ">                                     
                                                    <label className="" htmlFor="expdate">Expiry Date</label>
                                                    <input type="text" className="form-control mb-3" id="expdate" placeholder="Expiry Date"   onChange={handleChange}/>
                                                </div>
                                                <div className="col-lg-4 ">                                     
                                                    <label className="" htmlFor="cvv">Cvv Code</label>
                                                    <input type="text" className="form-control mb-3" id="cvv" placeholder="cvv"   onChange={handleChange}/>
                                                </div>
                                            </div>
                                        </div>

                                </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Order Summary</h5>

                            <ul className="summary-table">
                                <>  
                                    {cart.items.length ? ( 
                                        cart.items.map((cartItem) => (
                                            <li><span>{cartItem.pName}</span><span>{cartItem.quantity}</span>X<span>{cartItem.pPrice}</span> <span>{cartItem.quantity * cartItem.pPrice}</span> </li>
                                        ))) : ( 
                                            <li className="empty-message">You have no items in your cart.</li>
                                    )}
                                </>

                            </ul>
                            

                            <h5>Payment Total</h5>

                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>{cart.totalQuantity}</span></li>
                                <li><span>delivery:</span> <span>Ksh {cart.shippingPrice.deliveryFee}</span></li>
                                <li><span>total:</span> <span>Ksh {cart.totalPrice}</span></li>
                            </ul>

                            <>
                                
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
                                                    <label className="" htmlFor="addr">Address</label>
                                                    <input type="text" className="form-control mb-3" id="address" placeholder="Address" onChange={handleChange}/>
                                                </div>
                                                <div className="row">                                     
                                                    <label className="" htmlFor="town">City</label>
                                                    <input type="text" className="form-control mb-3" id="city" placeholder="Town" onChange={handleChange}/>
                                                </div>
                                                <div className="row">                                     
                                                    <label className="" htmlFor="town">Country</label>
                                                    <input type="text" className="form-control mb-3" id="country" placeholder="Country" onChange={handleChange}/>
                                                </div>
                                                <div className="row">                                     
                                                    <label className="" htmlFor="cvv">Additional Information</label>
                                                    <input type="text" className="form-control mb-3" id="info" placeholder="info" onChange={handleChange}/>
                                                </div>
                                            </div>

                                        </div>
                              </>

                            <section className="newsletter-area ">
                                    <div className="newsletter-form ">
                                        <form action="#" method="post">
                                            <input type="email" name="email" className="nl-email" placeholder="Enter Voucher"   onChange={handleChange}/>
                                            {/* <input type="submit" value="Subscribe"/> */}
                                        </form>
                                    </div>
                            </section>

                            <div className="cart-btn mt-50">
                                <Link onClick={handleSubmit} className="btn amado-btn w-100">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
};

export default Paymentdelivery;

