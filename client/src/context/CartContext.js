import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  added: false,
  hidden: true,  
  menu: true,
  search: true,
  cart: JSON.parse(localStorage.getItem("cart")) || { items:[],
                                                      dte:{},
                                                      totalQuantity:0,
                                                      shippingAddress :{
                                                                          address: "",
                                                                          city: "",
                                                                          info: "",
                                                                          country: "",
                                                                        },
                                                      paymentMethod:"",
                                                      paymentResult:{
                                                                        id: "",
                                                                        status: "",
                                                                        update_time: "",
                                                                        email_address: "",
                                                                      },
                                                      taxPrice:0.00,
                                                      shippingPrice:{
                                                                      deliveryType: "at store",
                                                                      deliveryFee: 0.00,
                                                                    },
                                                      totalPrice:0.00,
                                                      isPaid:false,
                                                      paidAt:"",
                                                      isDelivered:false,
                                                      deliveredAt:"",
                                                      voucherId:"",
                                                      voucherAmount:"",
                                                      status:"pending",
                                                  },
  loading: false,
  error: null,
};

export const CartContext = createContext(INITIAL_STATE);

export const addItemToCart = (cart, cartItemToAdd) => {

  const existingCartItem = cart.items.find( (cartItem) => cartItem._id === cartItemToAdd._id );

  if (existingCartItem) {    
    return { ...cart, 
              items: cart.items.map((cartItem) =>  cartItem._id === cartItemToAdd._id ? { ...cartItem, quantity: cartItem.quantity + 1,totalItemCost: (parseFloat(cartItem.totalItemCost) + parseFloat(cartItemToAdd.pPrice)) }  : cartItem  ), 
                totalPrice: ( parseFloat(cart.totalPrice) + parseFloat(cartItemToAdd.pPrice) ),
                  totalQuantity: cart.totalQuantity + 1,};
  }

  return { ...cart, 
            items: [...cart.items, { ...cartItemToAdd, quantity: 1 , totalItemCost: cartItemToAdd.pPrice}],
              totalPrice: ( parseFloat(cart.totalPrice) + parseFloat(cartItemToAdd.pPrice)),
                totalQuantity: cart.totalQuantity + 1
        };
  
};

export const removeItemFromCart = (cart, cartItemToRemove) => {

  if(cartItemToRemove.quantity === undefined || cartItemToRemove.quantity <= 0){
    return cart;
  }

  if(cartItemToRemove.quantity <= 1 && cartItemToRemove.quantity > 0){
    return clearItemFromCart(cart, cartItemToRemove);
  }

  const existingCartItem = cart.items.find( (cartItem) => cartItem._id === cartItemToRemove._id  );

  if (existingCartItem === 1 && cartItemToRemove.quantity > 1) {
    return { ...cart, 
              items: cart.items.map((cartItem) =>  cartItem._id === cartItemToRemove._id   ? { ...cartItem, quantity: cartItem.quantity - 1, totalItemCost: (parseFloat(cartItem.totalItemCost) - parseFloat(cartItemToRemove.pPrice)) }  : cartItem), 
                totalPrice: ( parseFloat(cart.totalPrice) - parseFloat(cartItemToRemove.pPrice) ),
                  totalQuantity: cart.totalQuantity - 1
     };
  }

  return { ...cart, 
            items: cart.items.map((cartItem) => cartItem._id === cartItemToRemove._id ? { ...cartItem, quantity: cartItem.quantity - 1, totalItemCost: (parseFloat(cartItem.totalItemCost) - parseFloat(cartItemToRemove.pPrice)) }  : cartItem  ),
              totalPrice: ( parseFloat(cart.totalPrice) - parseFloat(cartItemToRemove.pPrice)) ,
              totalQuantity: cart.totalQuantity - 1,
          };
};

export const clearItemFromCart = (cart, cartItemToClear) => {

  return { ...cart, 
                  items: cart.items.filter( (cartItem) => cartItem._id !== cartItemToClear._id ),
                    totalPrice: ( parseFloat(cart.totalPrice) - (parseFloat(cartItemToClear.pPrice) * parseFloat(cartItemToClear.quantity))),
                    totalQuantity: cart.totalQuantity - cartItemToClear.quantity,
                }
};

export const clearAllItemsFromCart = () => {

  return { items:[],
              dte:{},
              totalQuantity:0,
              shippingAddress :{
                                  address: "",
                                  city: "",
                                  info: "",
                                  country: "",
                                },
              paymentMethod:"",
              paymentResult:{
                                id: "",
                                status: "",
                                update_time: "",
                                email_address: "",
                              },
              taxPrice:0.00,
              shippingPrice:{
                              deliveryType: "at store",
                              deliveryFee: 0.00,
                            },
              totalPrice:0.00,
              isPaid:false,
              paidAt:"",
              isDelivered:false,
              deliveredAt:"",
              voucherId:"",
              voucherAmount:"",
              status:"pending"
          };
};

export const removeShipping = (cart) => {

  if( parseFloat(cart.shippingPrice.deliveryFee) > 0.00) cart.totalPrice = parseFloat(cart.totalPrice) - cart.shippingPrice.deliveryFee;

  cart.shippingPrice = {deliveryType : "at store", deliveryFee : 0.00};

  return cart;
  
};

export const addShipping = (cart,type) => {

  if( parseFloat(cart.shippingPrice.deliveryFee) > 0.00) cart.totalPrice = parseFloat(cart.totalPrice) - cart.shippingPrice.deliveryFee;

  if( type === "express shipping"){
    cart.totalPrice = parseFloat(cart.totalPrice) + 1000.00;
    cart.shippingPrice = {deliveryType : "express shipping", deliveryFee : 1000.00};
  }

  if( type === "standard shipping"){
    cart.totalPrice = parseFloat(cart.totalPrice) + 600.00;
    cart.shippingPrice = {deliveryType : "standard shipping", deliveryFee : 600.00};
  }

  return cart;  
  
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_CART_HIDDEN":   return { ...state,  hidden: !state.hidden, };   
    case "TOGGLE_ADD_MODAL_REMOVE":   return { ...state,  added: false, };    
    case "TOGGLE_MENU":   return { ...state,  menu: !state.menu, };  
    case "TOGGLE_SEARCH":   return { ...state,  search: !state.search, };
    case "ADD_ITEM":      return { ...state, cart: addItemToCart(state.cart, action.payload), added: true,  };
    case "REMOVE_ITEM":   return { ...state, cart: removeItemFromCart(state.cart, action.payload),  };
    case "ADD_SHIPPING":   return { ...state, cart: addShipping(state.cart, action.payload),  };
    case "REMOVE_SHIPPING":   return { ...state, cart: removeShipping(state.cart), };
    case "CLEAR_ITEM_FROM_CART":  return { ...state, cart: clearItemFromCart(state.cart, action.payload),   };    
    case "CLEAR_ALL_ITEMS_FROM_CART":  return { ...state, cart: clearAllItemsFromCart(), };
    default:   return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart, state.cart.items]);

  return (
    <CartContext.Provider
      value={{
        added: state.added,
        hidden: state.hidden,
        search: state.search,
        menu: state.menu,
        cart: state.cart,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
