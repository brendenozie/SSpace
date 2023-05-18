import React, {useEffect, useState, useCallback, useRef, useContext, Suspense} from 'react';
import './productscatagoriesarea.css';
import Product from'../product/product';
import { PaginationContext } from "../../context/PaginationContext";
import LoadingIndicator from "../LoadingIndicator.tsx";

const Masonry  = React.lazy(
  () => import('../masonry/masonry'));
  
const ProductsCategoryArea = () => {
  
  var {perPage, currentPage , pagesToShow,updateValue } = useContext(PaginationContext);
  
  const [products, setProducts] = useState([]);

  const [currntPage, setCurrentPage] = useState(currentPage);

  const [pageViewSize, setPageViewSize] = useState(perPage);

  const [pageCount, setPageCount] = useState(0);

  const [totalProductCount, setTotalProductCount] = useState(0);

  const mounted = useRef(true);

  const handleChange = (e) => {
    if(e.target.id === "viewProduct"){
        setPageViewSize(e.target.value);
    }
    // if (e.target.type === 'checkbox') {
        // setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    // } else {
        // setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // }
  };

  useEffect(() => {
    mounted.current = true;
    fetch(`/products?pageNumber=${currntPage}&pageViewSize=${pageViewSize}`)
    .then(async (res) => {
        if(mounted.current){

          let prds = await res.json();
          
          setProducts(prds.products);
          setCurrentPage(prds.page);
          setTotalProductCount(prds.count);
          setPageCount(prds.pages);
          
        }
      });
      return () => mounted.current = false;
  }, [currntPage, pageViewSize]);

  const settingColumns = useCallback(() => {
    if(window.innerWidth >= 1400) return 3
    if(window.innerWidth >= 800) return 3
    if(window.innerWidth >= 700) return 2
    if(window.innerWidth >= 600) return 1
    return 1
  }, []);


  const [column, setColumn] = useState(() => settingColumns());  


  useEffect(() => {
    window.addEventListener('resize', () => setColumn(() => settingColumns()));
    return window.removeEventListener('resize', () => setColumn(() => settingColumns()));
  }, [setColumn, settingColumns]);

  
  return    (
            // Product Catagories Area Start 
            <div className="products-catagories-area clearfix">
                <div className="amado-pro-catagory clearfix">
                <Suspense fallback={<LoadingIndicator />}>
                    <Masonry
                        dataArray={products}
                        columnCount={column}
                        ChildsElement={Product}
                        />
                </Suspense>
                </div>
            </div>
        );
  };

export default ProductsCategoryArea;