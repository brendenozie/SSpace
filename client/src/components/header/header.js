import './header.css';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

function Header() {

    const { user } = useContext(AuthContext);
    const { cart, menu, dispatch } = useContext(CartContext);


  return (
            //  Header Area Start 
            <header className={`header-area clearfix ${!menu ? "bp-xs-on" : ""} `}>
              {/* Close Icon  */}
              <div className="nav-close" onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                  <i className="fa fa-close" aria-hidden="true"></i>
              </div>
              {/* Logo  */}
              <div className="logo">
                  <Link to="/"><img src="/img/core-img/logo.png" alt=""/></Link>
              </div>
              {/* Amado Nav  */}
              <nav className="amado-nav  mb-100">
                  <ul>
                      <li className="home-nav"><Link to="/"><img src="/img/core-img/home.png" alt=""/>Home</Link></li>
                      <li><Link to="/shop" className="home-nav"><img src="/img/core-img/store.png" alt=""/>Shop</Link></li>
                      {/* <li><Link to="product-details.html" className="home-nav"><img src="/img/core-img/cart.png" alt=""/>Product</Link></li>
                      <li><Link to="cart.html" className="home-nav"><img src="/img/core-img/checkout.png" alt=""/>Cart</Link></li>
                      <li><Link to="checkout.html" className="home-nav"><img src="/img/core-img/cart.png" alt=""/>Checkout</Link></li> */}
                  
                             
              {/* Cart Menu  */}
                    <li className="home-nav" onClick={() => dispatch({ type: "TOGGLE_CART_HIDDEN" })} ><Link className="cart-nav"><img src="/img/core-img/cart.png" alt=""/> Cart <span>({cart.totalQuantity})</span></Link></li>
                    <li className="home-nav"><Link to="/checkout" className="fav-nav"><img src="/img/core-img/favorites.png" alt=""/> Checkout</Link></li>
                    {/* <li className="home-nav"><Link to="/favorite" className="fav-nav"><img src="/img/core-img/favorites.png" alt=""/> Favourite</Link></li> */}
                    <li className="home-nav"  onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}><Link  className="search-nav"><img src="/img/core-img/search.png" alt=""/> Search</Link></li>
                  
                    {/* Button Group  */}
                    {user && user.username ? (
                        <li className="home-nav"><Link to="/profile" className="fav-nav"><img src="/img/core-img/favorites.png" alt=""/> View Profile</Link></li>
                         ): (
                        <div className="amado-btn-group">
                             <li className="home-nav"><Link to="/login" className="fav-nav"><img src="/img/core-img/favorites.png" alt=""/> Login</Link></li>
                             <li className="home-nav"><Link to="/register" className="fav-nav"><img src="/img/core-img/favorites.png" alt=""/> Sign Up</Link></li>
                        </div>
                    )}
                </ul>
              {/* </div> */}
              </nav> 
              {/* Social Button  */}

              <div className="social-info d-flex justify-content-between">
                  <Link to="#"><i className="fa fa-pinterest" aria-hidden="true"></i></Link>
                  <Link to="#"><i className="fa fa-instagram" aria-hidden="true"></i></Link>
                  <Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                  <Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
              </div>
          </header>
                  // Header Area End
        );
};

export default Header;
