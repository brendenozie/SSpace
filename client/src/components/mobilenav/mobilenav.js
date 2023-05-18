import './mobilenav.css';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Mobilenav = () => {
    
    const {dispatch } = useContext(CartContext);
    
  return    (
    // Mobile Nav (max width 767px)
    <div className="mobile-nav">
        {/* Navbar Brand  */}
        <div className="amado-navbar-brand">
            <Link to="/"><img src="img/core-img/logo.png" alt=""/></Link>
        </div>
         {/* Navbar Toggler  */}
        <div className="amado-navbar-toggler" onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
        );
  };

export default Mobilenav;