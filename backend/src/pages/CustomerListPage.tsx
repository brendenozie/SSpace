import React, { Suspense, useEffect, useState } from "react";
import ContentBox from "../components/contents/ContentBox";
import LoadingIndicator from "../components/LoadingIndicator";
import PageWrapper from "../components/PageWrapper";
import configs from "../configs.json";
import axios from "axios";
const Customer = React.lazy(() => import("../components/Customer"));

interface CustomerType {
    _id: string,
		orderItems: number,
		user: {
			username: string,
			email : string,
			img : string,
			phone : string,
			isAdmin: boolean,
		}
}

const CustomerListPage: React.FC = () => {
  const [customerList, setCustomerList] = useState<CustomerType[]>([]);
  const axiosInstance = axios.create({
                                       baseURL : process.env.REACT_APP_API_URL,
                                    });

  // Fetch all customers and set to customerList
  useEffect(() => {
    axiosInstance.get(`/users`)
      .then(async (res) => {setCustomerList(await res.data); console.log(res);});
  }, []);

  return (
    <PageWrapper>
      <ContentBox name="Customer List" showSearch>
        <div className="w-full border-b border-b-glitch-box" />
        <Suspense fallback={<LoadingIndicator />}>
          {/* Customer list orderCount */}
          <ul className="px-5 pb-5">
            {customerList.map(({ user,orderItems }, i) => (
              <li className="block mt-5" key={i}>
                <Customer name={user.username} orderCount={orderItems} />
              </li>
            ))}
          </ul>
        </Suspense>
      </ContentBox>
    </PageWrapper>
  );
};

export default CustomerListPage;
