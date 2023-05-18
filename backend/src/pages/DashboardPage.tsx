import React, { Suspense, useContext, useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ContentBox from "../components/contents/ContentBox";
import DisplaySection from "../components/DisplaySection";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";
import Search from "../components/Search";
import LeadershipIcon from "../assets/images/leadership.svg";
import ShoppingCartIcon from "../assets/images/shopping-cart.svg";
import TotalSalesIcon from "../assets/images/sales.svg";
import StoreIcon from "../assets/images/store.svg";
import configs from "../configs.json";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const OrderedProductPreview = React.lazy(
  () => import("../components/products/OrderedProductPreview")
);

interface OrderedProductType {
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: [string];
  paymentMethod: string;
  shippingAddress: string;
  shippingPrice: {deliveryType: string, deliveryFee: string};
  taxPrice: string;
  totalPrice: number;
  updatedAt: string;
  user: string;
  _id: string;
}

/**
 * Dashboard page
 * Sows current store status & active products list by category
 */
const DashboardPage: React.FC = () => {

  const [orderedProductList, steOrderedProductList] = useState<OrderedProductType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
 });

  const { authDetails } = useContext(AuthContext);
  const[activeTab, setActiveTab] = useState("pending");

  function settingActiveTab(theTab : string){
    setActiveTab(theTab);
  }

  // Fetch ordered products
  useEffect(() => {
    axiosInstance.get(`/orders/statsorder?status=${activeTab.toLowerCase()}`)
      .then((res) => res.data)
      .then(({ order }) => {
        steOrderedProductList(order);
      });
  }, [activeTab]);

  // Fetch ordered products
  useEffect(() => {
    axiosInstance.get(`/orders/getcount`)
      .then((res) => res.data)
      .then(({data}) => {
        setTotalPrice(data[0].num);
      });
  }, []);

  // Fetch ordered products
  useEffect(() => {
    axiosInstance.get(`/orders/dailyaverage`)
      .then((res) => res.data)
      .then(({data}) => {
        setTotalOrderCount(data[0].quantity);
      });
  }, []);

  // Fetch ordered products
  useEffect(() => {
    axiosInstance.get(`/orders/usercount`)
      .then((res) => res.data)
      .then(({data}) => {
        setUserCount(data);
      });
  }, []);

  // Fetch ordered products
  useEffect(() => {
    axiosInstance.get(`/orders/productcount`)
      .then((res) => res.data)
      .then(({data}) => {
        setProductCount(data);
      });
  }, []);

  return (
    <PageWrapper>
      <div className="w-full">
        <div className="flex justify-between relative">
          <div>
            <h1 className="text-lg text-gray-100 font-bold leading-5">
              Hello {authDetails.user?authDetails.user.username:""}!
            </h1>
            <p className="text-gray-300 leading-5">
              Welcome back {authDetails.user?authDetails.user.username:""}, and great to meet you
            </p>
          </div>
          <div className="ml-1">
            <Search />
          </div>
        </div>

        {/* Store status */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 overflow-x-auto mt-10">
          {/* Toatal saled */}
          <DisplaySection
            displayText={"Ksh "+totalPrice}
            subText="Total Sales"
            icon={TotalSalesIcon}
          />

          {/* Toatal product orders */}
          <DisplaySection
            icon={ShoppingCartIcon}
            displayText={""+totalOrderCount}
            subText={"Product Orders"}
          />

          {/* Store views */}
          <DisplaySection
            icon={StoreIcon}
            displayText={""+userCount}
            subText={"User Count"}
          />

          {/* Product views */}
          <DisplaySection
            icon={LeadershipIcon}
            displayText={""+productCount}
            subText={"Product Count"}
          />
        </div>

        {/* Active orders */}
        <ContentBox name="Active Orders" showSearch>
          <>
            <div className="border-b border-b-glitch-box">
              <SortByTag
                tags={["Pending", "Approved", "Denied"]}
                defaultActiveIndex={activeTab} 
                onsetClick={settingActiveTab}
              />
            </div>

            {/* Products list */}
            <div className="mt-5"></div>
            <Suspense fallback={<LoadingIndicator />}>
              <ul className="px-5 bg-transparent">
                {orderedProductList.map(
                  (
                    {
                      createdAt,
                    orderItems,
                    totalPrice,
                    _id,
                    isPaid,
                    isDelivered,
                    shippingPrice
                    },
                    i
                  ) => (
                    <li
                      className="block mt-4 pb-4 border-b border-b-glitch-box last:border-none"
                      key={i}
                    >
                      <OrderedProductPreview
                        date={createdAt}
                        paymentStatus={isPaid ? "Paid" : "Pending Payment" }
                        price={totalPrice}
                        quantity={orderItems.length > 0 ? orderItems.length : 0}
                        productId={_id}
                        shipingStatus={isDelivered ? "Delivered" : "Delivery Pending" }
                        shippingPrice={shippingPrice}
                        image={"image"}
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
  );
};

export default DashboardPage;
