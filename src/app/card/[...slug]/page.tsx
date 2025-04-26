import { fetchFromServer } from '@/app/actions/fetchFromServer'
import CardCollection from '@/components/CardCollection'
import { colldectionCard } from '@/utils/cybersifyApi'
import React from 'react'
import { Api } from "@/interfaces/interfaces";
  const page = async({params}:any) => {
 console.log(params,"params");
 const api: Api = {
  url: `https://dating.goaideme.com/card/collection-listing`,
  method: "GET",
  // body: { key: 'value' }
  // comment only
};

const data = await fetchFromServer(api);
console.log(data.data, "sdasdfgdfg");
    return (
      <div>
        <CardCollection params={params} />  
        </div>
    )
  }
  
  export default page