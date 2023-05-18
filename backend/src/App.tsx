import React, { Dispatch, SetStateAction, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/404Page";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailsPage from "./pages/CustomerDetailsPage";
import ManageOrderPage from "./pages/ManageOrderPage";
import PaymentPage from "./pages/PaymentPage";
import ProductPage from "./pages/ProductPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { PageListContext, PageType } from "./contexts/PageContext";
import { AuthContext, AuthType } from "./contexts/AuthContext";

/**
 * App routes controller
 */
const App: React.FC = () => {
  // Pagelist context for if any time we need to update form another child components
  // Also usable for dynamic sidebar menu. If menu comes form server
  //  { label: "Online payments", slug: "/online-payments", icon: "account_balance_wallet", },
  const [pageList, setPageList] = useState<PageType[]>([
                                            { label: "Dashboard", slug: "/", icon: "dashboard" },
                                            { label: "Customer list", slug: "/customer-list", icon: "people_alt" },
                                            { label: "Manage orders", slug: "/manage-orders", icon: "leaderboard" },
                                            { label: "Products", slug: "/products", icon: "shop_2" },
                                            // { label: "Settings", slug: "/settings", icon: "settings" },
                                            // { label: "Login", slug: "/login", icon: "login" },
                                          ]);

                                          
  
  const [authDetails,setAuthDetails] = useState<AuthType>({user: {username: "",
                                                                    email: "",
                                                                    img: "",
                                                                    phone: "",
                                                                    isAdmin: false,    
                                                                    favorites: [{ product: ""}],},
                                                           loading: false,
                                                           error: {},
                                                          });

  return (
    <PageListContext.Provider value={{ pageList, setPageList }}>
      <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
        <BrowserRouter>
          <Routes>
            {/* Customer lists */}
            <Route
              path="/customer-list"
              caseSensitive
              element={<CustomerListPage />}
            />

            {/* Manage orders */}
            <Route
              path="/manage-orders"
              caseSensitive
              element={<ManageOrderPage />}
            />

            {/* Online payments */}
            <Route
              path="/online-payments"
              caseSensitive
              element={<PaymentPage />}
            />

            {/* Order details */}
            <Route
              path="/order/:productId"
              caseSensitive
              element={<OrderDetailsPage />}
            />
            {/* Customer details */}
            <Route
              path="/customer/:customerId"
              caseSensitive
              element={<CustomerDetailsPage />}
            />

            {/* Products */}
            <Route path="/products" caseSensitive element={<ProductPage />} />

            {/* Product details */}
            <Route
              path="/productAdd" caseSensitive element={<ProductEditPage />}
            />
            
            {/* Product details */}
            <Route
              path="/products/:productId" caseSensitive element={<ProductEditPage />}
            />

            {/* Login page */}
            <Route path="/login" caseSensitive element={<LoginPage />} />

            
            {/* Signup page */}
            <Route path="/signup" caseSensitive element={<Signup />} />

            {/* Home page */}
            <Route path="/" element={authDetails.user.username? <DashboardPage /> : <LoginPage />} />

            {/* 404 page not found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        </AuthContext.Provider>
    </PageListContext.Provider>
  );
};

export default App;
