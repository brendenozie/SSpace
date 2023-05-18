import React from "react";
import "./cart-item.styles.css";


const CartItem = ({ item, clearItem }) => {
  const { pImage, pPrice, pName, quantity, category } = item;
  return (
    <div className="cart-item">
      <img src={pImage} alt="item" />
      <div className="item-details">
        <div className="item-details__block">
          <div className="item-name">{pName}</div>
          <div className="item-price">Ksh {pPrice} </div>
        </div>
        <div className="item-category">{category}</div>
        <div className="item-details__block">
          <div className="item-quantity">{quantity} Piece(s)</div>
          <div className="btn-remove" onClick={() => clearItem(item)}>
            REMOVE
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   clearItem: (item) => dispatch(clearItemFromCart(item)),
// });
export default CartItem;
