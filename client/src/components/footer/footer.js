import './footer.css';

const Footer = () =>{
        return (
                // Footer Area Start
                <footer className="footer_area clearfix">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Single Widget Area */}
                            <div className="col-12 col-lg-3">
                                <div className="single_widget_area">
                                    {/* Logo */}
                                    <div className="footer-logo mr-50">
                                        <a href="/">
                                            <img src="/img/core-img/llogo.png" alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* Single Widget Area */}
                            <div className="col-12 col-lg-9">
                                <div className="single_widget_area">
                                    {/* Footer Menu */}
                                    <div className="footer_menu">
                                        <nav className="navbar navbar-expand-lg justify-content-end">
                                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#footerNavContent" aria-controls="footerNavContent" aria-expanded="false" aria-label="Toggle navigation" 
                                            style={{color : '#fbb710'}}><i className="fa fa-bars"></i></button>
                                            <div className="collapse navbar-collapse" id="footerNavContent">
                                                <ul className="navbar-nav ml-auto">
                                                    <li className="nav-item active">
                                                        <a className="nav-link" href="/">Home</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="/shop">Shop</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="/checkout">Checkout</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            // Footer Area End
        );
      };

export default Footer;
