import React, { Suspense, useEffect, useState } from "react";
import Button from "../components/Button";
import ContentBox from "../components/contents/ContentBox";
import PageWrapper from "../components/PageWrapper";
import LoadingIndicator from "../components/LoadingIndicator";
import OrderedItemsPreview from "../components/products/OrderedItemsPreview";
import { useParams } from "react-router-dom";
import axios from "axios";


interface OrderedProductType {
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  user: {   _id: string,   email: string;}
  orderItems: [{
                  pName: string,
                  quantity: number,
                  pImage: [{url:string, publicId: string}],
                  pPrice: number,
                  totalItemCost: number,
                  _id: string
              }];
  paymentMethod: string;
  shippingAddress: {address: string, city: string, postalCode: string, country: string};
  shippingPrice: {deliveryType: string, deliveryFee: string};
  taxPrice: string;
  totalPrice: number;
  updatedAt: string;
  _id: string;
}

/**
 * Fetch order details by order id and
 * allow to accept/reject orders
 */
const OrderDetailsPage: React.FC = () => {
  const [orderedProductId, setOrderedProductId] = useState<number>(0);

  const { productId } = useParams();

  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
 });

  useEffect(() => {
    //   Get order id from location.pathname & convert to number
    setOrderedProductId(Number(window.location.pathname.split("/")[2]));
  }, []);

  const [orderedProductList, setOrderedProductList] = useState<OrderedProductType>();

  // Fetch ordered products
  useEffect(() => {
    axiosInstance.get(`/orders/${productId}`)
      .then((res) => res.data)
      .then(({ order }) => {
        setOrderedProductList(order);
      });
  }, []);

  return (
    <PageWrapper>
      <ContentBox name={`Order #${productId}`}>
        <div className="border-b border-b-glitch-box"></div>
        <div className="px-5 py-5">
          {/* Ordered products */}
          <div className="mt-4">
            <div className="flex items-center border-b border-b-glitch-box py-2 text-white">
              <span>OrderId</span> - <span>{orderedProductList?._id}</span>
            </div>
            <div className="flex items-center border-b border-b-glitch-box py-2 text-white">
              <span>Date</span> - <span>{orderedProductList?.createdAt}</span>
            </div>
            <div className="flex items-center border-b border-b-glitch-box font-medium py-2 text-white">
              <span>Total Quantity</span> - <span>{orderedProductList?.orderItems.length}</span>
            </div>
            <div className="flex items-center border-b border-b-glitch-box font-medium py-2 text-white">
              <span>Total Price</span> - <span>{orderedProductList?.totalPrice}</span>
            </div>
            <div className="flex items-center border-b border-b-glitch-box font-medium py-2 text-white">
              <span>Payment Status</span> - <span>{orderedProductList?._id ? "Paid" : "Pending Payment"}</span>
            </div>
            <div className="flex items-center border-b border-b-glitch-box font-medium py-2 text-white">
              <span>Delivery Status</span> - <span>{orderedProductList?.isDelivered ? "Delivered" : "Pending Delivery"}</span>
            </div>
          </div>

          <hr className="w-full border-b border-b-glitch-box my-5" />

          {/* Customer details */}
          <div className="mt-4 ">
            <div className="text-white flex items-center justify-between">
              <div className="font-medium">CUSTOMER DETAILS</div>
            </div>
            <div className="flex items-center justify-between border-b border-b-glitch-box py-2 text-white">
              <span>Name</span>
              <span>{orderedProductList?.user.email}</span>
            </div>
            <div className="flex items-center justify-between border-b border-b-glitch-box py-2 text-white">
              <span>Mobile</span>
              <div>
                <span>0113718731</span>
              </div>
            </div>
            <div className="flex items-center justify-between border-b border-b-glitch-box py-2 text-base text-white">
              <span>Address</span>
              <span>{orderedProductList?.shippingAddress.address}</span>
            </div>
            <div className="flex items-center justify-between border-b border-b-glitch-box py-2 text-base text-white">
              <span>City</span>
              <span>{orderedProductList?.shippingAddress.city}</span>
            </div>
            <div className="flex items-center justify-between border-b border-b-glitch-box py-2 text-base text-white">
              <span>Country</span>
              <span>{orderedProductList?.shippingAddress.country}</span>
            </div>
            <div className="flex items-center justify-between border-b border-b-glitch-box py-2 text-base text-white">
              <span>Payment</span>
              <span className="text-yellow-400 px-1">{orderedProductList?.shippingPrice.deliveryType} - {orderedProductList?.paymentMethod}</span>
            </div>
          </div>

          {/* Products list */}
          <div className="mt-5"></div>
            <Suspense fallback={<LoadingIndicator />}>
              <ul className="bg-transparent">
                {orderedProductList?.orderItems.map(
                  (
                    {
                      pName,
                      quantity,
                      pImage,
                      pPrice,
                      totalItemCost,
                      _id
                    },
                    i
                  ) => (
                    <li
                      className="block mt-4 pb-4 border-b border-b-glitch-box last:border-none"
                      key={i}
                    >
                      <OrderedItemsPreview
                        pName = {pName}
                        quantity={quantity}
                        pImage={pImage}
                        pPrice={pPrice}
                        totalItemCost={totalItemCost}
                        _id = {_id}
                        />
                    </li>
                  )
                )}
              </ul>
            </Suspense>

          {/* Order actions */}
          <div className="mt-5 flex">
            <div>
              <Button className="hover:bg-rose-500">
                <span className="material-icons text-lg mr-2 py-1">close</span>
                <span>Reject</span>
              </Button>
            </div>
            <div className="ml-3">
              <Button className="hover:bg-glitch-orange">
                <span className="material-icons text-lg mr-2 py-1">check</span>
                <span>Accept</span>
              </Button>
            </div>
          </div>

        </div>
      </ContentBox>
    </PageWrapper>
  );
};

export default OrderDetailsPage;
