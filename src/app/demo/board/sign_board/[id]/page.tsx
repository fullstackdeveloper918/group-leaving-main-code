
import SignBoard from "@/components/SignBoard";
import React from "react";

const page = ({searchParams}:any) => {
console.log(searchParams.uuid,"params");

  return (
   <>
   <SignBoard searchParams={searchParams.uuid}/>
   </>
  );
};

export default page;
