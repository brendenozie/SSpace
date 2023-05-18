import { Link } from "react-router-dom";


import "./completion.css";

const Completion = () => {
      
  return  (
            //  ##### Newsletter Area Start ##### 
            <div className="products-catagories-area completion" id="completion">
                {/* header-start */}
                <div className="container">
                    <figure className="logo animated fadeInDown delay-07s">
                        <Link to="/"><img src="/img/core-img/logo.png" alt=""/></Link>	
                    </figure>	
                    <h1 className="animated fadeInDown delay-07s">Thank you for visiting Savannah Space</h1>
                    <h2 className="animated fadeInDown delay-07s">PLease, Come again</h2>
                    <ul className="we-create animated fadeInUp delay-1s">
                        <li>Built in Kenya.</li>
                    </ul>
                        <Link className="link animated fadeInUp delay-1s servicelink" to="/">Continue Shopping</Link>
                </div>
            </div>
            
          );
};

export default Completion;
