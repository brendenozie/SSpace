import { useContext } from "react";
import './searchwrapper.css';
import { CartContext } from "../../context/CartContext";

const Searchwrapper = () => {
    
  const { search,dispatch } = useContext(CartContext);

  return    <div>
                <div className="search-wrapper section-padding-100" style={{top : !search ? "0" : ""}}>
                    <div className="search-close"  onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}>
                        <i className="fa fa-close" aria-hidden="true"></i>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="search-content">
                                    <form action="#" method="get">
                                        <input type="search" name="search" id="search" placeholder="Type your keyword..."/>
                                        <button type="submit">
                                            <img src="img/core-img/search.png" alt=""/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
  };

export default Searchwrapper;