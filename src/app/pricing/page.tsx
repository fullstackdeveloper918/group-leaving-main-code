import React from "react";

import AllCardPricing from "@/components/AllCardPricing";
import { Api } from "@/interfaces/interfaces";
import { fetchFromServer } from "../actions/fetchFromServer";

const page = async() => {

  const api: Api = {
    url: `https://dating.goaideme.com/card/pricing-listing`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data = await fetchFromServer(api);

console.log(data,'check');


  const api2: Api = {
    url: `https://dating.goaideme.com/card/bundle-list`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data2 = await fetchFromServer(api2);
  console.log(data2,"ksdfghkdfgh");
  
  return (
    <>
    <AllCardPricing data={data} data2={data2}/>
    </>
  );
};

export default page;
