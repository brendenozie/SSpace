import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import Completion from "./page/completion/Completion";
import Register from "./page/register/Register";
import Checkout from "./page/checkout/Checkout";
import Profile from "./page/profile/Profile";
import Shop from "./page/shop/Shop";
import ProductDetail from "./page/productdetail/ProductDetail";
import Paymentdelivery from "./page/paymentdelivery/paymentdelivery";
import CartPreview from'./components/cart-preview/cart-preview.component';
import Modal from'./components/modal/added-to-cart.component';
import Maincontent from "./components/maincontent/maincontent";
import { CartContext } from "./context/CartContext";
//sample test another thing

function App() {
  
  const { hidden, added, dispatch } = useContext(CartContext);
  
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      dispatch({ type: "TOGGLE_ADD_MODAL_REMOVE" })
    }, 3000);
  }, [added,]);
  
  return (
    <BrowserRouter>
      <React.Fragment> 
          <Maincontent>
            <Routes>              
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/profile" element={<Profile/>}/> 
                <Route exact path="/checkout" element={<Checkout/>}/>         
                <Route exact path="/shop" element={<Shop/>}/>             
                <Route exact path="/productdetails/:prdid" element={<ProductDetail/>}/>     
                <Route exact path="/pde" element={<Paymentdelivery/>}/>     
                <Route exact path="/" element={<Home/>}/>          
                <Route exact path="/completion" element={<Completion/>}/>        
            </Routes>
          </Maincontent>           
          {hidden ? null : <CartPreview />}            
          {added ? <Modal/> : null}
      </React.Fragment>
    </BrowserRouter>
  );
  
}

export default App;
