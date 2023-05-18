import "./shop.css";
import {useEffect, useState, useContext, useRef} from 'react';
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { PaginationContext } from "../../context/PaginationContext";
import  Pagination  from "../../components/Pagination/Pagination";
import axios from "axios";

const Shop = () => {    

    const {dispatch} = useContext(CartContext);
    
    var {perPage, currentPage , pagesToShow, updateValue } = useContext(PaginationContext);
    
    const [products, setProducts] = useState([]);

    const [isGrid, setIsGrid] = useState(true);

    const [pageViewSize, setPageViewSize] = useState(perPage);

    const [pageCount, setPageCount] = useState(0);

    const [totalProductCount, setTotalProductCount] = useState(0);

    const mounted = useRef(true);

    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_API_URL,
     });

    const handleChange = (e) => {
        if(e.target.id === "viewProduct"){
            setPageViewSize(e.target.value);
        }
      };

    useEffect(() => {
        mounted.current = true;
        axiosInstance.get(`products?pageNumber=${currentPage}&pageViewSize=${pageViewSize}`)
        .then(async (res) => {
            if(mounted.current){

              let prds = res.data;

              console.log(prds);
              
              setProducts(prds.products);
            //   setCurrentPge(prds.page);
              setTotalProductCount(prds.count);
              setPageCount(prds.pages);
              
            }
          });
          return () => mounted.current = false;
      }, [currentPage, pageViewSize]);

      useEffect(() => {
        setProducts(products);
      }, [isGrid, products]);

    

  return <>
            <div className="products-catagories-area mt-50">
                      <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                                    {/*  Total Products */}
                                    <div className="total-products">
                                        <p>Showing {((currentPage*pageViewSize)-pageViewSize)+1}-{(currentPage*pageViewSize)} 0f {totalProductCount}</p>
                                        <div className="view d-flex">
                                            <Link onClick={() => setIsGrid(true)} className={ isGrid ? "active": ""}><i className="fa fa-th-large" aria-hidden="true"></i></Link>
                                            <Link onClick={() => setIsGrid(false)} className={ isGrid ? "": "active"}><i className="fa fa-bars" aria-hidden="true"></i></Link>
                                        </div>
                                    </div>
                                    {/*  Sorting */}
                                    <div className="product-sorting d-flex">
                                        <div className="sort-by-date d-flex align-items-center mr-15">
                                            <p>Sort by</p>
                                            <form action="#" method="get">
                                                <select name="select" id="sortBydate">
                                                    <option value="value">Date</option>
                                                    <option value="value">Newest</option>
                                                    <option value="value">Popular</option>
                                                </select>
                                            </form>
                                        </div>
                                        <div className="view-product d-flex align-items-center">
                                            <p>View</p>
                                            <form action="#" method="get">
                                                <select name="select" id="viewProduct" onChange={handleChange}>
                                                    <option value="12">12</option>
                                                    <option value="24">24</option>
                                                    <option value="48">48</option>
                                                    <option value="96">96</option>
                                                </select>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {products.map((itm, i) => (
                                <>
                                    { isGrid ? (
                                        // {/*  Single Product Area */}
                                        <div className="col-12 col-sm-3 col-md-12 col-xl-3" key={i}>
                                            <div className="single-product-wrapper">
                                                  {/* /* Product Image */}
                                                <Link to={"/productdetails/"+itm._id}>
                                                    <div className="product-img">
                                                        <img src={itm.pImage[0]?.url} alt=""/>
                                                        {/*  Hover Thumb */}
                                                        <img className="hover-img" src={itm.pImage[1]?.url} alt=""/>
                                                    </div>
                                                </Link>

                                                {/*  Product Description */}
                                                <div className="product-description d-flex align-items-center justify-content-between">
                                                    {/*  Product Meta Data */}
                                                    <div className="product-meta-data">
                                                        <Link to={"/productdetails/"+itm._id}>
                                                            <div className="line"></div>
                                                            <p className="product-price">Ksh {itm.pPrice}</p>
                                                            <h6>{itm.pName}</h6>
                                                        </Link>
                                                    </div>
                                                    {/*  Ratings & Cart */}
                                                    <div className="ratings-cart text-right">
                                                        <div className="ratings">
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                            <i className="fa fa-star" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="cart">
                                                            <Link onClick={() => dispatch({ type: "ADD_ITEM", payload: itm })} data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt=""/></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        ): (
                                            // {/*  Single Product Area */}
                                        <div className="col-12 col-sm-12 col-md-12 col-xl-12" key={i}>
                                            <div className="single-product-wrapper">
                                                <div className="row">
                                                        {/* /* Product Image */}
                                                        <Link to={"/productdetails/"+itm._id} className="col-6 col-sm-3 col-md-3 col-xl-3">
                                                            <div className="grdproduct-img">
                                                                <img src={itm.pImage[0]?.url} alt=""/>
                                                                {/*  Hover Thumb */}
                                                                <img className="hover-img" src={itm.pImage[1]?.url} alt=""/>
                                                            </div>
                                                        </Link>

                                                        {/*  Product Description */}
                                                        <div className="col-6 col-sm-9 col-md-9 col-xl-9 product-description justify-content-between">
                                                            <div className="row">
                                                                {/*  Product Meta Data */}
                                                                <div className="product-meta-data col-12 col-sm-8 col-md-8 col-xl-8 d-flex justify-content-between">
                                                                    <Link to={"/productdetails/"+itm._id}>
                                                                        <div className="line"></div>
                                                                        <p className="product-price">Ksh {itm.pPrice}</p>
                                                                        <h5>{itm.pName}</h5>
                                                                        <h6>{itm.pDesc}</h6>
                                                                    </Link>
                                                                </div>
                                                                {/*  Ratings & Cart */}
                                                                <div className="ratings-cart align-items-center text-right col-12 col-sm-4 col-md-4 col-xl-4 d-flex justify-content-between">
                                                                    <div className="ratings">
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className="cart">
                                                                        <Link onClick={() => dispatch({ type: "ADD_ITEM", payload: itm })} data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt=""/></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                </>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {/*  Pagination */}
                                <nav aria-label="navigation">
                                    <Pagination
                                            totalItemsCount={totalProductCount}
                                            currentPage={currentPage}
                                            perPage={pageViewSize}
                                            pagesToShow={1}
                                            onGoPage={(n) => updateValue({type:"GO_PAGE",payload: n})}
                                            onPrevPage={() => updateValue({type:"PREV_PAGE"})}
                                            onNextPage={() => updateValue({type:"NEXT_PAGE"})}
                                        />
                                </nav>
                            </div>
                        </div>
                    </div>
            </div>
        </>
};

export default Shop;
