import { useLocation } from 'react-router-dom';
import './maincontent.css';
import Mobilenav from'../mobilenav/mobilenav';
import Searchwrapper from'../searchwrapper/searchwrapper';
import Header from'../header/header';
import Footer from'../footer/footer';

const Maincontent = ({children}) => {
   
  const { pathname } = useLocation();

  return  (
              <>
                {/* // Main Content Wrapper Start #####  */}
                  {pathname !== "/login" &&
                      pathname !== "/register" ? (
                        <>
                          <div className="main-content-wrapper d-flex clearfix">
                                  <Searchwrapper/>
                                  <Mobilenav />
                                  <Header />
                                  {children}
                          </div>
                        </>
                      ) : children}
                             
                       
                   {pathname !== "/login" &&
                      pathname !== "/register" ? (
                        <Footer />
                      ) : null}
              </>
          );
  };

export default Maincontent;