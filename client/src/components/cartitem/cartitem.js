import './CartItem.css';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function CartItem() {

  return (
    <tr>
        <td class="cart_product_img">
            <a href="/"><img src="img/bg-img/cart1.jpg" alt="Product"/></a>
        </td>
        <td class="cart_product_desc">
            <h5>White Modern Chair</h5>
        </td>
        <td class="price">
            <span>$130</span>
        </td>
        <td class="qty">
            <div class="qty-btn d-flex">
                <p>Qty</p>
                <div class="quantity">
                    <span class="qty-minus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"><i class="fa fa-minus" aria-hidden="true"></i></span>
                    <input type="number" class="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value="1"/>
                    <span class="qty-plus" onclick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i class="fa fa-plus" aria-hidden="true"></i></span>
                </div>
            </div>
        </td>
    </tr>
        );
};

export default CartItem;
