import './product.css';
import { useContext, useState,memo, useMemo } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

function Product({value}) {

    
    const height = useMemo(() => 350 + Math.ceil(Math.random() * 250), [value]);

    // const height =     
    const {dispatch} = useContext(CartContext);

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "ADD_ITEM", payload: value });
    };    

  return (
            // Single Catagory
            <Link to={"/productdetails/"+value._id}>
                <div className="single-products-catagory clearfix" >
                    {/* <span>Buy</span> */}
                    {/* <span> */}
                    <ul className="social-icon">
                        <li className="social-icon-item" onClick={handleClick} >
                            <div className="social-icon-link fa fa-shopping-basket"> Buy</div>
                        </li>
                    </ul>
                    {/* </span> */}
                    <span href="#">
                        <img src={value.pImage[0].url} alt="" style={{ width: '100%', height: `${height}px`, borderRadius: '10px'}}/>
                        {/* Hover Content  */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From Ksh{value.pPrice}</p>
                            <h4>{value.pName}</h4>                        
                        </div>
                    </span>
                    
                </div>
            </Link>
        );
};

export default memo(Product);
