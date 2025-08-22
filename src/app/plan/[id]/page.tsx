import { fetchFromServer } from "@/app/actions/fetchFromServer";
import PlanBunddlePage from "@/components/PlanBunddlePage";
import RazorPay from "@/components/RazorPay";
import { Api } from "@/interfaces/interfaces";
import React from "react";

const page = async({params}:any) => {

  console.log(params.id,"chhchc");
  const api2: Api = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/card/single-bundle-detail/${params.id}`,
    method: "GET",
    // body: { key: 'value' }
    // comment only
  };

  const data2 = await fetchFromServer(api2);
  console.log(data2,"checkid");
  
  return (
<>
<PlanBunddlePage data2={data2}/>
</>
  );
};

export default page;
