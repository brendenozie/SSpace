import React, { Suspense, useEffect, useState, useReducer, createContext, SetStateAction, Dispatch } from "react";
import ContentBox from "../components/contents/ContentBox";
import LoadingIndicator from "../components/LoadingIndicator";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";
import configs from "../configs.json";
import axios from "axios";

const Product = React.lazy(() => import("../components/products/Product"));

export interface ProductListContextType {
  productList: ProductType[];
  setProductList: Dispatch<SetStateAction<ProductType[]>>;
}

type ProductType = {
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

const defaultProductListContext: ProductListContextType = {
  productList: [],
  setProductList: () => [],
};

export const SaladContext= createContext<ProductListContextType>(defaultProductListContext);

function reducer(state: any, item: any) {
  const index = state.indexOf(item._id, 0);
  if (index > -1) {
    state.splice(index, 1);
  }
  return state;
}

/**
 * Product page shows all user created posts
 * Users can make product available on unavailable by clicking on chackbox
 */
const ProductPage: React.FC = () => {

  // const [salad, setSalad] = useReducer(reducer, []);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
 });

  // Fetch products from server
  useEffect(() => {
    axiosInstance.get(`/products?pageNumber=1&pageViewSize=96`)
      .then(async (res) => {
          const prds = await res.data;
          setProductList(prds.products);
          });
      }, []);

  return (
    <SaladContext.Provider value={{productList, setProductList}}>
      <PageWrapper>
        <div className="w-full">
          <div>
            <h1 className="text-lg text-gray-100 font-bold leading-5">
              Your Products
            </h1>
            <p className="text-gray-300 leading-5">
              This page contains the list of products currently being sold.
            </p>
          </div>

          <ContentBox name="Active Products" showSearch showButton onClick={() => {window.location.href="/productAdd"}}>
            <>
              <div className="border-b border-b-glitch-box">
                {/* <SortByTag tags={["Products", "Categories"]} /> */}
              </div>

              {/* Products list */}
              <div className="mt-5"></div>
              <Suspense fallback={<LoadingIndicator />}>
                <ul className="px-5 bg-transparent">
                  {productList &&
                    productList.map((item: { _id: string; pName: string; pPrice: string; pOfferPrice: string; pImage: [{publicId: string, url: string}]; pIsActive: string; pDesc: string; pFeatured: string; pIsInStock: boolean; }, i: React.Key | null | undefined) => (
                        <li
                          className="block mt-4 pb-4 border-b border-b-glitch-box last:border-none"
                          key={i}
                        >
                          <Product
                            _id={item._id}
                            pName={item.pName}
                            pPrice={item.pPrice}
                            pOfferPrice={item.pOfferPrice} 
                            pImage={item.pImage}
                            pIsActive={item.pIsActive}
                            pDesc={item.pDesc}
                            pFeatured={item.pFeatured}
                            pIsInStock={item.pIsInStock}
                          />
                        </li>
                      )
                    )}
                </ul>
              </Suspense>
            </>
          </ContentBox>
        </div>
      </PageWrapper>
    </SaladContext.Provider>
  );
};

export default ProductPage;
