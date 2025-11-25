// import { fetchFromServer } from "@/app/actions/fetchFromServer";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
// import { useAccessToken } from "@/app/context/AccessTokenContext";
import AccountBunddles from "@/components/AccountBunddles";
import AccountCards from "@/components/AccountCards";
import AccountContribution from "@/components/AccountContribution";
import AccountEmailprefrence from "@/components/AccountEmailprefrence";
import AccountProfile from "@/components/AccountProfile";
import AccountSlider from "@/components/common/AccountSlider";
import Cart from "@/components/common/Cart";
import PaymentHistory from "@/components/common/PaymentHistory";
import Table from "@/components/common/Table";
import api from "@/utils/api";
import { cookies } from "next/headers";
import nookies from "nookies";
const page = async ({ params }: any) => {
  const type = params.type[0];
  const cookiesList = cookies();
  const gettoken: any = cookiesList.get("auth_token");
  const api2: any = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/cart/purchased-cart-listing`,
    method: "GET",
  };
  const data2 = await fetchFromServer(api2);
  console.log(data2, "data2accountpage");
  const data: any = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    method: "GET",
  };
  const posts = await fetchFromServer(data);

  return (
    <div className=" bg-lightbg flex justify-center items-center">
      <div className="w-full max-w-[70%] bg-white shadow-md rounded-lg account-sec-main">
        <h1 className="font-bold text-center text-md-start mb-6 account-main-head">
          Account
        </h1>
        <AccountSlider type={type} />
        {type === "profile" && (
          <AccountProfile data={posts} userInfo={gettoken?.value} />
        )}
        {/* {type === "cart" && <Cart />} */}
        {type === "cards" && <AccountCards data={data2} />}
        {/* {type==="cards" && <AccountCards />} */}
        {type === "bundles" && (
          <AccountBunddles data={posts} userInfo={gettoken?.value} />
        )}
        {type === "email-preferences" && (
          <AccountEmailprefrence data={posts} userInfo={gettoken?.value} />
        )}
        {/* {type === "payment-history" && <PaymentHistory />} */}
      </div>
    </div>
  );
};
export default page;
