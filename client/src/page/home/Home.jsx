import { useContext } from "react";
import ProductsCategoryArea from'../../components/productscatagoriesarea/productscatagoriesarea';
import "./home.css";
import { CartContext } from "../../context/CartContext";

const Home = () => {
  

  return  <>          
          <ProductsCategoryArea/>
        </>
};

export default Home;
