import React, { Suspense, useContext, useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ContentBox from "../components/contents/ContentBox";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";
import { SortListContext } from "../contexts/sortedOrderContext";
import axios from "axios";

const OrderedProductPreview = React.lazy(
  () => import("../components/products/OrderedProductPreview")
);

interface OrderedProductType {
  // date: string;
  // time: string;
  // price: number;
  // paymentStatus: string;
  // shipingStatus: string;
  // quantity: number;
  // productId: number;
  // image: string;

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
 * Manage order page
 */
const ManageOrderPage: React.FC = () => {
  const [orderedProductList, steOrderedProductList] = useState<
    OrderedProductType[]
  >([]);
  
  const[activeTab, setActiveTab] = useState("pending");

  function settingActiveTab(theTab : string){
    setActiveTab(theTab);
  }

  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
 });

  // Fetch ordered products
  useEffect(() => {
    axiosInstance.get(`/orders/statsorder?status=${activeTab.toLowerCase()}`)
      .then((res) => res.data)
      .then(({ order }) => {
        steOrderedProductList(order);
      });
  }, [activeTab]);

  return (
    <PageWrapper>
      <ContentBox name="Manage Orders" showSearch>
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
    </PageWrapper>
  );
};

export default ManageOrderPage;
