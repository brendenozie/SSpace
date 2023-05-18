import React,{useReducer, useContext} from "react";
import ProductImage from "./ProductImage";
import { Link, useNavigate } from "react-router-dom";
import { SaladContext } from '../../pages/ProductPage';
import axios from "axios";

interface Props {
    _id:string;
    pName:string;
    pPrice:string;
    pOfferPrice:string;
    pImage:[{publicId: string, url: string}];
    pIsActive:string;
    pDesc:string;
    pFeatured:string;
    pIsInStock:boolean;
  }

/**
 * Product item shows user created products infos and
 * allow to make product available/unabailable by clicking on the checkbox
 */
const Product: React.FC<Props> = ({ _id,pName, pPrice, pOfferPrice, pImage, pIsActive, pDesc, pFeatured,pIsInStock }) => {
  
    const { setProductList, productList } = useContext(SaladContext);

    var  navigate = useNavigate();

    async function deleteProduct() {
      await axios.delete(`/products/${_id}`)
                  .then(res => {
                          let myArray = productList.filter(function(obj) { return obj._id !== _id; });
                          setProductList(myArray);
                  });
    }; 

  return (
    <div className={"flex items-center w-full py-1"}>
        <div className={"w-full py-1 flex"} >
          <Link to={`/products/${_id}`}  className={"flex items-center w-full py-1"}>
            {/* Product order details */}
            <div className="flex items-center justify-between w-full">
              {/* Product preview thumbnail */}
              <ProductImage url={pImage[0].url} />
              <div className="ml-5 flex-1">
                <div className="text-white text-xl">{pName && pName}</div>
                <div className="text-gray-300">15 Units</div>
                <div className="text-glitch-orange text-lg font-bold">Ksh{pPrice}</div>

                {/* Prodcut status */}
                <div className="text-green-500 text-sm flex items-center">
                  {pIsInStock ? "In stock" : "Out of stock"}{" "}
                  {/* Toggle product available/unavailable checkbox */}
                  <input
                    type="checkbox"
                    title="Update product inStock"
                    className="ml-4"
                    checked={pIsInStock}
                  />
                </div>
              </div>
            </div>
          </Link>
          </div>
        {/* More options button */}
        <button className="text-white inline-block ml-5" onClick={() => {navigate(`/products/${_id}`);}}>
          <span className="material-icons-outlined text-lg">edit</span>
        </button>
        <button className="text-white inline-block ml-5"  onClick={deleteProduct}>
          <span className="material-icons-outlined text-lg">delete</span>
        </button>
     
    </div>
  );
};

export default Product;
