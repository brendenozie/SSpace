import axios from "axios";
import "./productdetail.css";
import {useEffect, useState, useContext} from 'react';
import { CartContext } from "../../context/CartContext";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {  

    const [ProductDetail, setProductDetail] =useState({});

    const { prdid } = useParams();

    const { cart,dispatch } = useContext(CartContext);

    useEffect(() => {
          async function fetchData() {
            // You can await here
                const res = (await axios.get("/products/find/"+prdid)).data;
            
                const data1 = res.data[0];
                const prd =cart.items.find( (cartItem) => cartItem._id === data1._id );
                setProductDetail(prd ? prd : data1);
          }
          fetchData();
      }, [cart.items, prdid]);

      const handleChange = (e) => {
        // if (e.target.type === 'checkbox') {
        //     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
        // } else {
        //     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        // }
      };

  return <>
            {/* <!-- Product Details Area Start --> */}
        <div className="single-product-area clearfix">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mt-50">
                                <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="#">{ProductDetail?.pCategory}</Link></li>
                                <li className="breadcrumb-item"><Link to="#">{ProductDetail?.pSubCat}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{ProductDetail?.pName}</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="single_product_thumb">
                            <div id="product_details_slider" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                {ProductDetail?.pImage?.map((itm, i) => (
                                    <li className={i===0?"active":""} data-target="#product_details_slider" 
                                    data-slide-to={i} style={{backgroundImage: `url(${itm?.url})`}}>
                                    </li>
                                ))}
                                </ol>
                                <div className="carousel-inner">
                                    {ProductDetail?.pImage?.map((itm, i) => (
                                        <div className={`carousel-item ${i===0?"active":""}`} >
                                            <Link className="gallery_img" to={itm?.url}>
                                                <img className="d-block w-100" src={itm?.url} alt={i} style={{ height:"568px", width:"400px !important", objectFit:"contain"}}/>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="single_product_desc">
                            {/* <!-- Product Meta Data --> */}
                            <div className="product-meta-data">
                                <div className="line"></div>
                                <p className="product-price">Ksh {ProductDetail?.pPrice}</p>
                                <Link to="product-details.html">
                                    <h6>{ProductDetail?.pName}</h6>
                                </Link>
                                {/* <!-- Ratings & Review --> */}
                                <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                                    <div className="ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </div>
                                    <div className="review">
                                        <Link to="#"></Link>
                                    </div>
                                </div>
                                {/* <!-- Avaiable --> */}
                                <p className="avaibility"><i className="fa fa-circle"></i> In Stock</p>
                            </div>

                            <div className="short_overview my-5">
                                <p>{ProductDetail?.pDesc}</p>
                            </div>

                            {/* <!-- Add to Cart Form --> */}
                            <div className="cart clearfix" >
                                <div className="cart-btn d-flex mb-50">
                                    <p>Qty</p>
                                    <div className="quantity">
                                        <span className="qty-minus" onClick={() => dispatch({type:"REMOVE_ITEM",payload: ProductDetail})}><i className="fa fa-caret-down" aria-hidden="true"></i></span>
                                            <input type="number" className="qty-text" id="qty" name="quantity" value={ProductDetail?.quantity ? ProductDetail.quantity : 0}  onChange={handleChange}/>
                                        <span className="qty-plus" onClick={() => dispatch({type:"ADD_ITEM",payload: ProductDetail})}><i className="fa fa-caret-up" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                                <button type="submit" name="addtocart" onClick={() => dispatch({ type: "ADD_ITEM", payload: ProductDetail })} className="btn amado-btn">Add to cart</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Product Details Area End --> */}
        </>
};

export default ProductDetail;
