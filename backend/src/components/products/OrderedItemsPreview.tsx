import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import LoadingIndicator from "../LoadingIndicator";
const ProductImage = React.lazy(() => import("./ProductImage"));

interface Props {
                  pName: string,
                  quantity: number,
                  pImage: [{url:string, publicId: string}],
                  pPrice: number,
                  totalItemCost: number,
                  _id: string
};

const OrderedProductPreview: React.FC<Props> = ({
                  pName,
                  quantity,
                  pImage,
                  pPrice,
                  totalItemCost,
                  _id
}) => {
  return (
    <Link to={`/products/${_id}`} className={"inline-block w-full py-1"}>
      {/* Product order details */}
      <div className="flex items-center justify-between w-full">
        {/* Product preview thumbnail */}
        <Suspense fallback={<LoadingIndicator />}>
          <ProductImage url={pImage[0]?.url} alt={pName} />
        </Suspense>

        <div className="ml-4 flex-1">
          {/* Product purchad date */}
          <div className="text-gray-200 text-sm">
            {pName} 
          </div>

          {/* Product id & quentity */}
          <div className="text-white text-xl">
            Quantity - {quantity && quantity} items
          </div>

          {/* Procut price */}
          <div className="text-glitch-orange font-semibold">
            {pPrice && pPrice} x {quantity && quantity} = Ksh {totalItemCost}
          </div>

          <div className="text-glitch-orange font-semibold text-sm flex items-center">
            <div className="flex items-center">
              <span className="material-icons text-lg">shopping_cart</span>
              <span className="ml-2">{}</span>
            </div>
            <div className="flex items-center ml-4">
              <span className="material-icons text-lg">local_shipping</span>
              <span className="ml-2">{}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Order action buttons */}
      {/* <div className="text-glitch-orange font-semibold mt-5 text-sm flex items-center">
        <div>
          <Button className="hover:bg-rose-500">
            <span className="material-icons text-lg">close</span>
            <span className="ml-2">Decline {"&"} Remove</span>
          </Button>
        </div>
        <div className="ml-3">
          <Button className="hover:bg-glitch-orange">
            <span className="material-icons text-lg">done</span>
            <span className="ml-2">Accept</span>
          </Button>
        </div>
      </div> */}
    </Link>
  );
};

export default OrderedProductPreview;
