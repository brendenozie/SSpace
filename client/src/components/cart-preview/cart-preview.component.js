import React, { useState,useEffect, useRef } from 'react';
import "./cart-preview.styles.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

const listenForOutsideClick = (listening, setListening, menuRef, setIsOpen) => {
  return () => {    
    console.log(listening);
    if (listening) return;
    if (!menuRef.current) return;
    console.log("call 1");
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        if (menuRef.current==null || menuRef.current.contains(evt.target)) return;
        setIsOpen(false);
      });
    });
  }
}

const CartPreview = () => {
  
const { cart,dispatch } = useContext(CartContext);
const { user } = useContext(AuthContext);
  
const menuRef = useRef(null);
const [open, setOpen] = useState(false);
const [listening, setListening] = useState(false);

const handleExitClick = () => {
  dispatch({ type: "TOGGLE_CART_HIDDEN" })
};    


useEffect(listenForOutsideClick(
  listening,
  setListening,
  menuRef,
  setOpen,
));

  return (
    <div className="cart-preview" 
          role="button"
          ref={menuRef}>

      <div className="cart-preview__block--top">
        <div className="cart-title">Shopping Cart</div>
        <p className="btn--close fa fa-close" onClick={() => dispatch({ type: "TOGGLE_CART_HIDDEN" })}></p>
      </div>

      <div className="cart-items">
         {cart.items.length ? ( 
           cart.items.map((cartItem) => (
            <CartItem key={cartItem._id} item={cartItem} clearItem={() => dispatch({ type: "CLEAR_ITEM_FROM_CART", payload : cartItem })}/>
          ))
         ) : ( 
          <div className="empty-message">You have no items in your cart.</div>
        )} 
      </div>

      {cart.items.length ? ( 
        <div className="cart-preview__block--bottom">
          <p className="promo-text">
            Sign up for 10% off your first order and 5% off the second. Valid
            within five days of signup.
          </p>
          <CustomButton
            onClick={() => {
              user
                ? (window.location.href = "/checkout")
                : (window.location.href = "/login");
              dispatch({ type: "TOGGLE_CART_HIDDEN" });
            }}
          >
            CONTINUE TO CHECKOUT
          </CustomButton>
        </div>
      ) : null} 
    </div>
  );
};

export default CartPreview;
