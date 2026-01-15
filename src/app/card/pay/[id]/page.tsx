import { fetchFromServer } from "@/app/actions/fetchFromServer";
import Checkout from "@/components/Checkout";
import StripeElement from "@/components/common/StripeElement";
import { Api } from "@/interfaces/interfaces";
import React from "react";

const page = async ({ searchParams, params }: any) => {
  const api2: Api = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/card/bundle-list`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data2 = await fetchFromServer(api2);

  return (
    <>
      {/* <StripeElement> */}
      <Checkout data={data2} />
      {/* </StripeElement> */}
    </>
  );
};

export default page;
