
import SignBoard from "@/components/SignBoard";
import React from "react";

const page = ({searchParams}:any) => {
  return (
   <>
   <SignBoard searchParams={searchParams.uuid}/>
   </>
  );
};

export default page;
